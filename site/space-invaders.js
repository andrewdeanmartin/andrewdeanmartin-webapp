/**
 * DEPLOY TO PRODUCTION — Space Invaders
 * 
 * Hidden easter egg triggered by the Konami Code:
 * ↑ ↑ ↓ ↓ ← → ← → B A
 * 
 * Vanilla JS + Canvas. No dependencies.
 * Built by Andrew Martin.
 */
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // KONAMI CODE DETECTION
  // ═══════════════════════════════════════════════════════════

  const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiIndex = 0;
  let gameInstance = null;

  document.addEventListener('keydown', function (e) {
    if (gameInstance) return;
    if (e.key === KONAMI[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI.length) {
        konamiIndex = 0;
        launch();
      }
    } else {
      konamiIndex = (e.key === KONAMI[0]) ? 1 : 0;
    }
  });

  function launch() {
    if (gameInstance) return;
    gameInstance = new Game();
    gameInstance.start();
  }

  // Expose a global for mobile activation (optional hook from site)
  window.__deployToProduction = launch;

  // ═══════════════════════════════════════════════════════════
  // CONSTANTS
  // ═══════════════════════════════════════════════════════════

  var GW = 800;  // Virtual game width
  var GH = 600;  // Virtual game height

  var COLORS = {
    bg:         '#080c1f',
    player:     '#4f8ff5',
    playerGlow: '#64ffda',
    bullet:     '#64ffda',
    enemyBullet:'#ff6b6b',
    text:       '#e0e4f0',
    textDim:    '#3a4070',
    textMid:    '#6a70a0',
    hud:        '#64ffda',
    rows:       ['#ff6b6b', '#ff9f43', '#feca57', '#48dbfb', '#c084fc'],
    boss:       '#ff4757',
    bossBarBg:  '#1a0e15',
    mystery:    '#c084fc',
    particles:  ['#ff6b6b', '#ffd93d', '#64ffda', '#4f8ff5', '#c084fc', '#ff8c42', '#ffffff'],
  };

  var PLAYER_SPEED = 5;
  var PLAYER_WIDTH = 36;
  var PLAYER_HEIGHT = 28;
  var BULLET_SPEED = 7;
  var ENEMY_BULLET_SPEED = 3.5;
  var MAX_PLAYER_BULLETS = 3;

  var WAVE_DEFS = [
    {
      name: 'WAVE 1',
      subtitle: 'CLEAR THE BACKLOG',
      rows: ['SCOPE CREEP', 'TECH DEBT', 'LEGACY CODE', 'BAD DOCS', 'STALE DATA'],
      cols: 7,
      baseSpeed: 0.35,
      fireChance: 0.001,
      pointValues: [50, 40, 30, 20, 10],
    },
    {
      name: 'WAVE 2',
      subtitle: 'ENTERPRISE BLOCKERS',
      rows: ['REORG', 'COMPLIANCE', 'BUDGET CUT', 'VENDOR LOCK', 'NO ACCESS'],
      cols: 7,
      baseSpeed: 0.45,
      fireChance: 0.0018,
      pointValues: [80, 70, 60, 50, 40],
    },
  ];

  var BOSS_DEF = {
    name: 'BOSS',
    subtitle: 'PILOT PURGATORY',
    hp: 45,
    width: 220,
    height: 50,
    speed: 1.8,
    points: 2000,
  };

  // ═══════════════════════════════════════════════════════════
  // SOUND ENGINE (Web Audio API — no files needed)
  // ═══════════════════════════════════════════════════════════

  function Sound() {
    this.ctx = null;
  }

  Sound.prototype.init = function () {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.ctx = null;
    }
  };

  Sound.prototype.tone = function (freq, dur, type, vol, freqEnd) {
    if (!this.ctx) return;
    var t = this.ctx.currentTime;
    var o = this.ctx.createOscillator();
    var g = this.ctx.createGain();
    o.connect(g);
    g.connect(this.ctx.destination);
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (freqEnd) o.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    g.gain.setValueAtTime(vol || 0.07, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.start(t);
    o.stop(t + dur);
  };

  Sound.prototype.shoot    = function () { this.tone(880, 0.07, 'square', 0.05, 440); };
  Sound.prototype.hit      = function () { this.tone(600, 0.12, 'square', 0.07, 80); };
  Sound.prototype.playerHit= function () { this.tone(200, 0.3, 'sawtooth', 0.1, 40); };
  Sound.prototype.bossHit  = function () { this.tone(300, 0.08, 'triangle', 0.08, 150); };
  Sound.prototype.mysteryHit= function () { this.tone(1200, 0.15, 'sine', 0.04, 600); };
  Sound.prototype.waveStart = function () { this.tone(440, 0.12, 'square', 0.05, 880); };
  Sound.prototype.gameOver = function () { this.tone(440, 0.6, 'sawtooth', 0.08, 30); };

  Sound.prototype.victory = function () {
    if (!this.ctx) return;
    var self = this;
    var notes = [523, 659, 784, 1047, 1319];
    notes.forEach(function (f, i) {
      setTimeout(function () { self.tone(f, 0.22, 'square', 0.06); }, i * 110);
    });
  };

  // ═══════════════════════════════════════════════════════════
  // PARTICLE
  // ═══════════════════════════════════════════════════════════

  function Particle(x, y, color) {
    var angle = Math.random() * Math.PI * 2;
    var speed = 1 + Math.random() * 3;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = 0.015 + Math.random() * 0.025;
    this.size = 2 + Math.random() * 3;
    this.color = color || COLORS.particles[Math.floor(Math.random() * COLORS.particles.length)];
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.03; // gravity
    this.life -= this.decay;
  };

  Particle.prototype.draw = function (ctx) {
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    ctx.globalAlpha = 1;
  };

  // ═══════════════════════════════════════════════════════════
  // STAR FIELD
  // ═══════════════════════════════════════════════════════════

  function Star() {
    this.reset(true);
  }

  Star.prototype.reset = function (initial) {
    this.x = Math.random() * GW;
    this.y = initial ? Math.random() * GH : -2;
    this.speed = 0.2 + Math.random() * 0.6;
    this.size = Math.random() < 0.3 ? 2 : 1;
    this.alpha = 0.3 + Math.random() * 0.5;
  };

  Star.prototype.update = function () {
    this.y += this.speed;
    if (this.y > GH + 2) this.reset(false);
  };

  Star.prototype.draw = function (ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  };

  // ═══════════════════════════════════════════════════════════
  // BULLET
  // ═══════════════════════════════════════════════════════════

  function Bullet(x, y, dy, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.w = 3;
    this.h = 10;
    this.color = color || COLORS.bullet;
    this.alive = true;
  }

  Bullet.prototype.update = function () {
    this.y += this.dy;
    if (this.y < -10 || this.y > GH + 10) this.alive = false;
  };

  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.fillRect(this.x - this.w / 2, this.y, this.w, this.h);
    ctx.shadowBlur = 0;
  };

  // ═══════════════════════════════════════════════════════════
  // ENEMY (tag/badge style)
  // ═══════════════════════════════════════════════════════════

  function Enemy(label, row, col, color, points) {
    this.label = label;
    this.row = row;
    this.col = col;
    this.color = color;
    this.points = points;
    this.alive = true;
    this.flash = 0;

    // Dimensions based on label length
    this.w = 88;
    this.h = 26;
    this.x = 0;
    this.y = 0;
  }

  Enemy.prototype.draw = function (ctx) {
    if (!this.alive) return;

    var x = this.x;
    var y = this.y;
    var w = this.w;
    var h = this.h;
    var r = 4; // border radius

    // Background pill
    ctx.fillStyle = this.flash > 0 ? '#ffffff' : this.color;
    ctx.globalAlpha = this.flash > 0 ? 0.9 : 0.15;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();

    // Border
    ctx.globalAlpha = this.flash > 0 ? 1 : 0.7;
    ctx.strokeStyle = this.flash > 0 ? '#ffffff' : this.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Label text
    ctx.fillStyle = this.flash > 0 ? '#000000' : this.color;
    ctx.font = '500 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, x + w / 2, y + h / 2 + 1);

    if (this.flash > 0) this.flash--;
  };

  // ═══════════════════════════════════════════════════════════
  // ENEMY GRID
  // ═══════════════════════════════════════════════════════════

  function EnemyGrid(waveDef) {
    this.enemies = [];
    this.direction = 1; // 1 = right, -1 = left
    this.speed = waveDef.baseSpeed;
    this.baseSpeed = waveDef.baseSpeed;
    this.fireChance = waveDef.fireChance;
    this.dropAmount = 14;
    this.bullets = [];
    this.totalCount = 0;

    var gapX = 10;
    var gapY = 10;
    var cols = waveDef.cols;
    var rows = waveDef.rows.length;
    var gridW = cols * 88 + (cols - 1) * gapX;
    var startX = (GW - gridW) / 2;
    var startY = 70;

    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var enemy = new Enemy(
          waveDef.rows[r],
          r, c,
          COLORS.rows[r % COLORS.rows.length],
          waveDef.pointValues[r]
        );
        enemy.x = startX + c * (88 + gapX);
        enemy.y = startY + r * (26 + gapY);
        this.enemies.push(enemy);
        this.totalCount++;
      }
    }
  }

  EnemyGrid.prototype.aliveCount = function () {
    var count = 0;
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].alive) count++;
    }
    return count;
  };

  EnemyGrid.prototype.update = function () {
    var alive = this.aliveCount();
    if (alive === 0) return;

    // Speed increases as enemies are destroyed
    var ratio = 1 - (alive / this.totalCount);
    this.speed = this.baseSpeed + ratio * 2.5;

    // Find grid bounds
    var minX = GW, maxX = 0, maxY = 0;
    for (var i = 0; i < this.enemies.length; i++) {
      var e = this.enemies[i];
      if (!e.alive) continue;
      if (e.x < minX) minX = e.x;
      if (e.x + e.w > maxX) maxX = e.x + e.w;
      if (e.y + e.h > maxY) maxY = e.y + e.h;
    }

    // Hit edge — drop and reverse
    var hitEdge = false;
    if (maxX >= GW - 10 && this.direction > 0) hitEdge = true;
    if (minX <= 10 && this.direction < 0) hitEdge = true;

    if (hitEdge) {
      this.direction *= -1;
      for (var j = 0; j < this.enemies.length; j++) {
        if (this.enemies[j].alive) this.enemies[j].y += this.dropAmount;
      }
    }

    // Move enemies
    for (var k = 0; k < this.enemies.length; k++) {
      if (this.enemies[k].alive) {
        this.enemies[k].x += this.speed * this.direction;
      }
    }

    // Random enemy fire
    for (var m = 0; m < this.enemies.length; m++) {
      var en = this.enemies[m];
      if (en.alive && Math.random() < this.fireChance) {
        this.bullets.push(new Bullet(
          en.x + en.w / 2, en.y + en.h,
          ENEMY_BULLET_SPEED, COLORS.enemyBullet
        ));
      }
    }

    // Update bullets
    for (var b = this.bullets.length - 1; b >= 0; b--) {
      this.bullets[b].update();
      if (!this.bullets[b].alive) this.bullets.splice(b, 1);
    }

    // Check if enemies reached player zone
    return maxY > GH - 80;
  };

  EnemyGrid.prototype.draw = function (ctx) {
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].draw(ctx);
    }
    for (var b = 0; b < this.bullets.length; b++) {
      this.bullets[b].draw(ctx);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // BOSS
  // ═══════════════════════════════════════════════════════════

  function Boss(def) {
    this.label = def.subtitle;
    this.x = GW / 2 - def.width / 2;
    this.y = -def.height - 10;
    this.targetY = 60;
    this.w = def.width;
    this.h = def.height;
    this.hp = def.hp;
    this.maxHp = def.hp;
    this.speed = def.speed;
    this.direction = 1;
    this.points = def.points;
    this.alive = true;
    this.entered = false;
    this.flash = 0;
    this.bullets = [];
    this.fireTimer = 0;
    this.phase = 0; // boss attack phase
    this.time = 0;
  }

  Boss.prototype.update = function () {
    if (!this.alive) return;

    this.time++;

    // Entry animation
    if (!this.entered) {
      this.y += 1;
      if (this.y >= this.targetY) {
        this.y = this.targetY;
        this.entered = true;
      }
      return;
    }

    // Movement pattern: sinusoidal
    this.x = (GW - this.w) / 2 + Math.sin(this.time * 0.02) * (GW / 2 - this.w / 2 - 20);

    // Firing patterns
    this.fireTimer++;

    // Phase changes based on HP
    if (this.hp < this.maxHp * 0.3) {
      this.phase = 2; // desperate
    } else if (this.hp < this.maxHp * 0.6) {
      this.phase = 1; // aggressive
    }

    var fireRate = [70, 45, 25][this.phase];
    if (this.fireTimer >= fireRate) {
      this.fireTimer = 0;
      this.fire();
    }

    // Update bullets
    for (var b = this.bullets.length - 1; b >= 0; b--) {
      this.bullets[b].update();
      if (!this.bullets[b].alive) this.bullets.splice(b, 1);
    }
  };

  Boss.prototype.fire = function () {
    var cx = this.x + this.w / 2;
    var bottom = this.y + this.h;

    if (this.phase === 0) {
      // Single shot
      this.bullets.push(new Bullet(cx, bottom, ENEMY_BULLET_SPEED, COLORS.boss));
    } else if (this.phase === 1) {
      // Spread shot
      this.bullets.push(new Bullet(cx - 20, bottom, ENEMY_BULLET_SPEED, COLORS.boss));
      this.bullets.push(new Bullet(cx, bottom, ENEMY_BULLET_SPEED, COLORS.boss));
      this.bullets.push(new Bullet(cx + 20, bottom, ENEMY_BULLET_SPEED, COLORS.boss));
    } else {
      // Rapid spread
      for (var i = -2; i <= 2; i++) {
        this.bullets.push(new Bullet(cx + i * 18, bottom, ENEMY_BULLET_SPEED * 1.2, COLORS.boss));
      }
    }
  };

  Boss.prototype.draw = function (ctx) {
    if (!this.alive) return;

    var x = this.x;
    var y = this.y;
    var w = this.w;
    var h = this.h;
    var r = 6;

    // Glow
    ctx.shadowColor = this.flash > 0 ? '#ffffff' : COLORS.boss;
    ctx.shadowBlur = this.flash > 0 ? 20 : 12;

    // Background
    ctx.fillStyle = this.flash > 0 ? '#ffffff' : COLORS.boss;
    ctx.globalAlpha = this.flash > 0 ? 0.8 : 0.2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();

    // Border
    ctx.globalAlpha = 1;
    ctx.strokeStyle = this.flash > 0 ? '#ffffff' : COLORS.boss;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = this.flash > 0 ? '#000000' : COLORS.boss;
    ctx.font = 'bold 16px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, x + w / 2, y + h / 2 + 1);

    // Health bar
    var barW = w - 20;
    var barH = 5;
    var barX = x + 10;
    var barY = y + h + 8;
    var hpRatio = this.hp / this.maxHp;

    ctx.fillStyle = COLORS.bossBarBg;
    ctx.fillRect(barX, barY, barW, barH);

    var barColor = hpRatio > 0.5 ? COLORS.boss : (hpRatio > 0.25 ? '#ff9f43' : '#ff4757');
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barW * hpRatio, barH);

    if (this.flash > 0) this.flash--;

    // Draw bullets
    for (var b = 0; b < this.bullets.length; b++) {
      this.bullets[b].draw(ctx);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // MYSTERY SHIP
  // ═══════════════════════════════════════════════════════════

  function MysteryShip() {
    this.active = false;
    this.x = 0;
    this.y = 30;
    this.w = 100;
    this.h = 22;
    this.speed = 0;
    this.label = 'QUICK WIN';
    this.points = 150;
    this.timer = 0;
    this.spawnInterval = 800 + Math.floor(Math.random() * 600);
  }

  MysteryShip.prototype.update = function () {
    if (this.active) {
      this.x += this.speed;
      if (this.x > GW + 20 || this.x + this.w < -20) {
        this.active = false;
      }
    } else {
      this.timer++;
      if (this.timer >= this.spawnInterval) {
        this.timer = 0;
        this.spawnInterval = 800 + Math.floor(Math.random() * 600);
        this.active = true;
        if (Math.random() > 0.5) {
          this.x = -this.w;
          this.speed = 1.5;
        } else {
          this.x = GW;
          this.speed = -1.5;
        }
      }
    }
  };

  MysteryShip.prototype.draw = function (ctx) {
    if (!this.active) return;
    var x = this.x, y = this.y, w = this.w, h = this.h;

    ctx.globalAlpha = 0.8;
    ctx.strokeStyle = COLORS.mystery;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);

    ctx.fillStyle = COLORS.mystery;
    ctx.font = '500 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, x + w / 2, y + h / 2 + 1);
    ctx.globalAlpha = 1;
  };

  // ═══════════════════════════════════════════════════════════
  // GAME
  // ═══════════════════════════════════════════════════════════

  function Game() {
    this.overlay = null;
    this.canvas = null;
    this.ctx = null;
    this.scale = 1;
    this.offsetX = 0;
    this.offsetY = 0;
    this.running = false;
    this.animFrame = null;

    // State: 'title', 'waveIntro', 'playing', 'bossIntro', 'boss', 'gameover', 'victory'
    this.state = 'title';
    this.stateTimer = 0;

    // Game objects
    this.stars = [];
    this.particles = [];
    this.playerBullets = [];
    this.player = { x: GW / 2, y: GH - 60, lives: 3, invuln: 0 };
    this.enemyGrid = null;
    this.boss = null;
    this.mystery = new MysteryShip();
    this.score = 0;
    this.wave = 0;
    this.highScore = parseInt(localStorage.getItem('dtp_highscore') || '0', 10);

    // Input
    this.keys = {};
    this.touch = { active: false, x: 0 };

    // Screen shake
    this.shake = 0;

    // Sound
    this.sound = new Sound();

    // Create stars
    for (var i = 0; i < 80; i++) {
      this.stars.push(new Star());
    }
  }

  Game.prototype.start = function () {
    this.createDOM();
    this.sound.init();
    this.bindInput();
    this.resize();
    this.running = true;
    this.state = 'title';
    var self = this;
    window.addEventListener('resize', function () { self.resize(); });
    this.loop();
  };

  Game.prototype.createDOM = function () {
    // Overlay
    this.overlay = document.createElement('div');
    this.overlay.id = 'dtp-overlay';
    this.overlay.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;' +
      'background:' + COLORS.bg + ';display:flex;align-items:center;justify-content:center;' +
      'opacity:0;transition:opacity 0.3s ease;';

    // Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = 'display:block;image-rendering:pixelated;';
    this.overlay.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    document.body.appendChild(this.overlay);
    document.body.style.overflow = 'hidden';

    // Fade in
    var ov = this.overlay;
    requestAnimationFrame(function () { ov.style.opacity = '1'; });
  };

  Game.prototype.destroy = function () {
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.style.opacity = '0';
      var ov = this.overlay;
      setTimeout(function () {
        if (ov.parentNode) ov.parentNode.removeChild(ov);
      }, 300);
    }
    document.body.style.overflow = '';
    gameInstance = null;
  };

  Game.prototype.resize = function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var scaleX = w / GW;
    var scaleY = h / GH;
    this.scale = Math.min(scaleX, scaleY);

    this.canvas.width = Math.floor(GW * this.scale);
    this.canvas.height = Math.floor(GH * this.scale);

    this.offsetX = (w - this.canvas.width) / 2;
    this.offsetY = (h - this.canvas.height) / 2;
    this.canvas.style.marginLeft = this.offsetX + 'px';
    this.canvas.style.marginTop = this.offsetY + 'px';
  };

  // ─── Input ────────────────────────────────────────────────

  Game.prototype.bindInput = function () {
    var self = this;

    this._onKeyDown = function (e) {
      self.keys[e.key] = true;

      if (e.key === 'Escape') {
        self.destroy();
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (self.state === 'title') {
          self.startWave(0);
        } else if (self.state === 'gameover' || self.state === 'victory') {
          self.restart();
        }
      }
    };

    this._onKeyUp = function (e) {
      self.keys[e.key] = false;
    };

    this._onTouchStart = function (e) {
      e.preventDefault();
      if (self.state === 'title') {
        self.startWave(0);
        return;
      }
      if (self.state === 'gameover' || self.state === 'victory') {
        self.restart();
        return;
      }
      var t = e.touches[0];
      self.touch.active = true;
      self.touch.x = (t.clientX - self.offsetX) / self.scale;
    };

    this._onTouchMove = function (e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        self.touch.x = (e.touches[0].clientX - self.offsetX) / self.scale;
      }
    };

    this._onTouchEnd = function (e) {
      e.preventDefault();
      self.touch.active = false;
    };

    document.addEventListener('keydown', this._onKeyDown);
    document.addEventListener('keyup', this._onKeyUp);
    this.canvas.addEventListener('touchstart', this._onTouchStart, { passive: false });
    this.canvas.addEventListener('touchmove', this._onTouchMove, { passive: false });
    this.canvas.addEventListener('touchend', this._onTouchEnd, { passive: false });
  };

  // ─── State Transitions ────────────────────────────────────

  Game.prototype.startWave = function (idx) {
    this.wave = idx;
    this.state = 'waveIntro';
    this.stateTimer = 120;
    this.sound.waveStart();
  };

  Game.prototype.startBoss = function () {
    this.state = 'bossIntro';
    this.stateTimer = 150;
    this.boss = new Boss(BOSS_DEF);
    this.sound.waveStart();
  };

  Game.prototype.restart = function () {
    this.score = 0;
    this.wave = 0;
    this.player.lives = 3;
    this.player.x = GW / 2;
    this.player.invuln = 0;
    this.playerBullets = [];
    this.particles = [];
    this.enemyGrid = null;
    this.boss = null;
    this.mystery = new MysteryShip();
    this.startWave(0);
  };

  // ─── Main Loop ────────────────────────────────────────────

  Game.prototype.loop = function () {
    if (!this.running) return;
    this.update();
    this.render();
    var self = this;
    this.animFrame = requestAnimationFrame(function () { self.loop(); });
  };

  // ─── Update ───────────────────────────────────────────────

  Game.prototype.update = function () {
    // Stars always update
    for (var s = 0; s < this.stars.length; s++) {
      this.stars[s].update();
    }

    // Particles always update
    for (var p = this.particles.length - 1; p >= 0; p--) {
      this.particles[p].update();
      if (this.particles[p].life <= 0) this.particles.splice(p, 1);
    }

    // Shake decay
    if (this.shake > 0) this.shake *= 0.85;
    if (this.shake < 0.5) this.shake = 0;

    // State timer
    if (this.stateTimer > 0) {
      this.stateTimer--;
      if (this.stateTimer === 0) {
        if (this.state === 'waveIntro') {
          this.enemyGrid = new EnemyGrid(WAVE_DEFS[this.wave]);
          this.state = 'playing';
          this.playerBullets = [];
        } else if (this.state === 'bossIntro') {
          this.state = 'boss';
          this.playerBullets = [];
        }
      }
      return;
    }

    if (this.state === 'playing') {
      this.updatePlaying();
    } else if (this.state === 'boss') {
      this.updateBoss();
    }
  };

  Game.prototype.updatePlayer = function () {
    var p = this.player;

    // Movement
    var moving = false;
    if (this.keys['ArrowLeft'] || this.keys['a']) {
      p.x -= PLAYER_SPEED;
      moving = true;
    }
    if (this.keys['ArrowRight'] || this.keys['d']) {
      p.x += PLAYER_SPEED;
      moving = true;
    }

    // Touch controls: move toward touch x, auto-fire
    if (this.touch.active) {
      var targetX = this.touch.x;
      var diff = targetX - p.x;
      if (Math.abs(diff) > 4) {
        p.x += Math.sign(diff) * Math.min(PLAYER_SPEED, Math.abs(diff));
      }
      // Auto-fire on touch
      this.playerShoot();
    }

    // Clamp
    if (p.x < PLAYER_WIDTH / 2 + 5) p.x = PLAYER_WIDTH / 2 + 5;
    if (p.x > GW - PLAYER_WIDTH / 2 - 5) p.x = GW - PLAYER_WIDTH / 2 - 5;

    // Shooting (keyboard)
    if (this.keys[' '] || this.keys['ArrowUp']) {
      this.playerShoot();
    }

    // Invulnerability decay
    if (p.invuln > 0) p.invuln--;

    // Update player bullets
    for (var b = this.playerBullets.length - 1; b >= 0; b--) {
      this.playerBullets[b].update();
      if (!this.playerBullets[b].alive) this.playerBullets.splice(b, 1);
    }
  };

  Game.prototype.playerShoot = function () {
    if (this.playerBullets.length >= MAX_PLAYER_BULLETS) return;
    // Throttle: check last bullet distance
    for (var i = 0; i < this.playerBullets.length; i++) {
      if (this.player.y - this.playerBullets[i].y < 30) return;
    }
    this.playerBullets.push(new Bullet(
      this.player.x, this.player.y - PLAYER_HEIGHT / 2,
      -BULLET_SPEED, COLORS.bullet
    ));
    this.sound.shoot();
  };

  Game.prototype.updatePlaying = function () {
    this.updatePlayer();
    this.mystery.update();

    // Enemy grid
    if (this.enemyGrid) {
      var reachedBottom = this.enemyGrid.update();
      if (reachedBottom) {
        this.gameOver();
        return;
      }
    }

    // Collisions: player bullets vs enemies
    this.checkPlayerBulletEnemyCollisions();

    // Collisions: player bullets vs mystery ship
    this.checkPlayerBulletMysteryCollisions();

    // Collisions: enemy bullets vs player
    this.checkEnemyBulletPlayerCollisions(this.enemyGrid ? this.enemyGrid.bullets : []);

    // Wave complete?
    if (this.enemyGrid && this.enemyGrid.aliveCount() === 0) {
      if (this.wave + 1 < WAVE_DEFS.length) {
        this.startWave(this.wave + 1);
      } else {
        this.startBoss();
      }
    }
  };

  Game.prototype.updateBoss = function () {
    this.updatePlayer();

    if (this.boss) {
      this.boss.update();

      // Collisions: player bullets vs boss
      for (var b = this.playerBullets.length - 1; b >= 0; b--) {
        var bul = this.playerBullets[b];
        if (this.hitTest(bul.x - bul.w / 2, bul.y, bul.w, bul.h,
                         this.boss.x, this.boss.y, this.boss.w, this.boss.h)) {
          this.playerBullets.splice(b, 1);
          this.boss.hp--;
          this.boss.flash = 4;
          this.sound.bossHit();
          this.score += 10;
          this.spawnParticles(bul.x, bul.y, 3, COLORS.boss);

          if (this.boss.hp <= 0) {
            this.boss.alive = false;
            this.score += this.boss.points;
            this.spawnParticles(
              this.boss.x + this.boss.w / 2,
              this.boss.y + this.boss.h / 2,
              40, COLORS.boss
            );
            this.shake = 15;
            this.victory();
            return;
          }
        }
      }

      // Collisions: boss bullets vs player
      this.checkEnemyBulletPlayerCollisions(this.boss.bullets);
    }
  };

  // ─── Collision Helpers ────────────────────────────────────

  Game.prototype.hitTest = function (ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  };

  Game.prototype.checkPlayerBulletEnemyCollisions = function () {
    if (!this.enemyGrid) return;
    for (var b = this.playerBullets.length - 1; b >= 0; b--) {
      var bul = this.playerBullets[b];
      for (var e = 0; e < this.enemyGrid.enemies.length; e++) {
        var en = this.enemyGrid.enemies[e];
        if (!en.alive) continue;
        if (this.hitTest(bul.x - bul.w / 2, bul.y, bul.w, bul.h,
                         en.x, en.y, en.w, en.h)) {
          bul.alive = false;
          this.playerBullets.splice(b, 1);
          en.alive = false;
          this.score += en.points;
          this.sound.hit();
          this.spawnParticles(en.x + en.w / 2, en.y + en.h / 2, 8, en.color);
          break;
        }
      }
    }
  };

  Game.prototype.checkPlayerBulletMysteryCollisions = function () {
    if (!this.mystery.active) return;
    for (var b = this.playerBullets.length - 1; b >= 0; b--) {
      var bul = this.playerBullets[b];
      if (this.hitTest(bul.x - bul.w / 2, bul.y, bul.w, bul.h,
                       this.mystery.x, this.mystery.y, this.mystery.w, this.mystery.h)) {
        bul.alive = false;
        this.playerBullets.splice(b, 1);
        this.mystery.active = false;
        this.score += this.mystery.points;
        this.sound.mysteryHit();
        this.spawnParticles(
          this.mystery.x + this.mystery.w / 2,
          this.mystery.y + this.mystery.h / 2,
          12, COLORS.mystery
        );
        break;
      }
    }
  };

  Game.prototype.checkEnemyBulletPlayerCollisions = function (bullets) {
    if (this.player.invuln > 0) return;
    var p = this.player;
    var px = p.x - PLAYER_WIDTH / 2;
    var py = p.y - PLAYER_HEIGHT / 2;

    for (var b = bullets.length - 1; b >= 0; b--) {
      var bul = bullets[b];
      if (this.hitTest(bul.x - bul.w / 2, bul.y, bul.w, bul.h,
                       px, py, PLAYER_WIDTH, PLAYER_HEIGHT)) {
        bullets.splice(b, 1);
        this.playerHit();
        return;
      }
    }
  };

  Game.prototype.playerHit = function () {
    this.player.lives--;
    this.player.invuln = 120;
    this.shake = 10;
    this.sound.playerHit();
    this.spawnParticles(this.player.x, this.player.y, 20);

    if (this.player.lives <= 0) {
      this.gameOver();
    }
  };

  Game.prototype.gameOver = function () {
    this.state = 'gameover';
    this.sound.gameOver();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dtp_highscore', String(this.highScore));
    }
  };

  Game.prototype.victory = function () {
    this.state = 'victory';
    this.sound.victory();
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dtp_highscore', String(this.highScore));
    }
  };

  Game.prototype.spawnParticles = function (x, y, count, color) {
    for (var i = 0; i < count; i++) {
      this.particles.push(new Particle(x, y, color));
    }
  };

  // ─── Render ───────────────────────────────────────────────

  Game.prototype.render = function () {
    var ctx = this.ctx;
    var s = this.scale;

    ctx.save();
    ctx.scale(s, s);

    // Screen shake offset
    var shakeX = 0, shakeY = 0;
    if (this.shake > 0) {
      shakeX = (Math.random() - 0.5) * this.shake * 2;
      shakeY = (Math.random() - 0.5) * this.shake * 2;
      ctx.translate(shakeX, shakeY);
    }

    // Clear
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(-10, -10, GW + 20, GH + 20);

    // Stars
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].draw(ctx);
    }

    // Particles
    for (var p = 0; p < this.particles.length; p++) {
      this.particles[p].draw(ctx);
    }

    switch (this.state) {
      case 'title':
        this.renderTitle(ctx);
        break;
      case 'waveIntro':
        this.renderWaveIntro(ctx);
        break;
      case 'playing':
        this.renderPlaying(ctx);
        break;
      case 'bossIntro':
        this.renderBossIntro(ctx);
        break;
      case 'boss':
        this.renderBossState(ctx);
        break;
      case 'gameover':
        this.renderGameOver(ctx);
        break;
      case 'victory':
        this.renderVictory(ctx);
        break;
    }

    ctx.restore();
  };

  // ─── Draw Helpers ─────────────────────────────────────────

  Game.prototype.drawPlayer = function (ctx) {
    var p = this.player;
    if (p.invuln > 0 && Math.floor(p.invuln / 4) % 2 === 0) return; // blink

    var x = p.x;
    var y = p.y;
    var hw = PLAYER_WIDTH / 2;
    var hh = PLAYER_HEIGHT / 2;

    // Ship body (triangle)
    ctx.fillStyle = COLORS.player;
    ctx.shadowColor = COLORS.playerGlow;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(x, y - hh);          // top
    ctx.lineTo(x + hw, y + hh);     // bottom right
    ctx.lineTo(x + hw * 0.3, y + hh * 0.5); // inner right
    ctx.lineTo(x - hw * 0.3, y + hh * 0.5); // inner left
    ctx.lineTo(x - hw, y + hh);     // bottom left
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // Engine glow
    ctx.fillStyle = COLORS.playerGlow;
    ctx.globalAlpha = 0.5 + Math.random() * 0.3;
    ctx.beginPath();
    ctx.moveTo(x - 4, y + hh * 0.5);
    ctx.lineTo(x + 4, y + hh * 0.5);
    ctx.lineTo(x, y + hh + 5 + Math.random() * 4);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    // Label
    ctx.fillStyle = COLORS.playerGlow;
    ctx.font = '500 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PROTOTYPE', x, y + hh + 18);
  };

  Game.prototype.drawHUD = function (ctx) {
    // Score
    ctx.fillStyle = COLORS.hud;
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE ' + String(this.score).padStart(6, '0'), 15, 20);

    // High Score
    ctx.fillStyle = COLORS.textDim;
    ctx.textAlign = 'center';
    ctx.fillText('HIGH ' + String(this.highScore).padStart(6, '0'), GW / 2, 20);

    // Lives
    ctx.fillStyle = COLORS.hud;
    ctx.textAlign = 'right';
    var livesStr = '';
    for (var i = 0; i < this.player.lives; i++) livesStr += '▲ ';
    ctx.fillText(livesStr.trim(), GW - 15, 20);

    // Wave indicator
    ctx.fillStyle = COLORS.textDim;
    ctx.font = '400 10px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    var waveLabel = this.state === 'boss' ? 'BOSS' : 'WAVE ' + (this.wave + 1);
    ctx.fillText(waveLabel, GW - 15, 36);
  };

  // ─── State Renders ────────────────────────────────────────

  Game.prototype.renderTitle = function (ctx) {
    var cy = GH / 2;

    // Title
    ctx.fillStyle = COLORS.hud;
    ctx.font = 'bold 14px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('★  DEPLOY TO PRODUCTION  ★', GW / 2, cy - 80);

    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 36px "JetBrains Mono", monospace';
    ctx.fillText('SPACE', GW / 2, cy - 35);
    ctx.fillText('INVADERS', GW / 2, cy + 10);

    // Blinking prompt
    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillStyle = COLORS.hud;
      ctx.font = '500 14px "JetBrains Mono", monospace';
      ctx.fillText('PRESS ENTER TO START', GW / 2, cy + 65);
    }

    // Controls
    ctx.fillStyle = COLORS.textDim;
    ctx.font = '400 11px "JetBrains Mono", monospace';
    ctx.fillText('← → MOVE    SPACE FIRE    ESC QUIT', GW / 2, cy + 105);

    // Touch hint
    ctx.fillText('TOUCH: DRAG TO MOVE, AUTO-FIRE', GW / 2, cy + 125);

    // Mission briefing
    ctx.fillStyle = COLORS.textMid;
    ctx.font = '400 10px "JetBrains Mono", monospace';
    ctx.fillText('MISSION: DESTROY THE ENTERPRISE BLOCKERS', GW / 2, cy + 165);
    ctx.fillText('BEFORE THEY REACH PRODUCTION', GW / 2, cy + 180);

    // High score
    if (this.highScore > 0) {
      ctx.fillStyle = COLORS.textDim;
      ctx.fillText('HIGH SCORE: ' + this.highScore, GW / 2, cy + 210);
    }
  };

  Game.prototype.renderWaveIntro = function (ctx) {
    var def = WAVE_DEFS[this.wave];
    var cy = GH / 2;
    var alpha = Math.min(1, (120 - this.stateTimer) / 20);

    ctx.globalAlpha = alpha;
    ctx.fillStyle = COLORS.hud;
    ctx.font = 'bold 28px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(def.name, GW / 2, cy - 15);

    ctx.fillStyle = COLORS.text;
    ctx.font = '500 16px "JetBrains Mono", monospace';
    ctx.fillText(def.subtitle, GW / 2, cy + 20);
    ctx.globalAlpha = 1;
  };

  Game.prototype.renderPlaying = function (ctx) {
    if (this.enemyGrid) this.enemyGrid.draw(ctx);
    this.mystery.draw(ctx);
    for (var b = 0; b < this.playerBullets.length; b++) {
      this.playerBullets[b].draw(ctx);
    }
    this.drawPlayer(ctx);
    this.drawHUD(ctx);
  };

  Game.prototype.renderBossIntro = function (ctx) {
    var cy = GH / 2;
    var pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;

    ctx.globalAlpha = pulse;
    ctx.fillStyle = COLORS.boss;
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚠  WARNING  ⚠', GW / 2, cy - 30);

    ctx.globalAlpha = 1;
    ctx.fillStyle = COLORS.text;
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText('BOSS APPROACHING', GW / 2, cy + 5);

    ctx.fillStyle = COLORS.boss;
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.fillText(BOSS_DEF.subtitle, GW / 2, cy + 45);

    // Draw HUD
    this.drawHUD(ctx);
  };

  Game.prototype.renderBossState = function (ctx) {
    if (this.boss) this.boss.draw(ctx);
    for (var b = 0; b < this.playerBullets.length; b++) {
      this.playerBullets[b].draw(ctx);
    }
    this.drawPlayer(ctx);
    this.drawHUD(ctx);
  };

  Game.prototype.renderGameOver = function (ctx) {
    var cy = GH / 2;

    ctx.fillStyle = COLORS.boss;
    ctx.font = 'bold 32px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DEPLOYMENT FAILED', GW / 2, cy - 50);

    ctx.fillStyle = COLORS.text;
    ctx.font = '500 16px "JetBrains Mono", monospace';
    ctx.fillText('SCORE: ' + this.score, GW / 2, cy);

    if (this.score >= this.highScore && this.score > 0) {
      ctx.fillStyle = COLORS.hud;
      ctx.font = '500 12px "JetBrains Mono", monospace';
      ctx.fillText('★ NEW HIGH SCORE ★', GW / 2, cy + 25);
    }

    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillStyle = COLORS.textMid;
      ctx.font = '500 13px "JetBrains Mono", monospace';
      ctx.fillText('ENTER TO RETRY  ·  ESC TO QUIT', GW / 2, cy + 65);
    }
  };

  Game.prototype.renderVictory = function (ctx) {
    var cy = GH / 2;
    var t = Date.now() * 0.002;

    // Rainbow-ish title
    ctx.fillStyle = COLORS.hud;
    ctx.font = 'bold 24px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('★  DEPLOYED TO PRODUCTION  ★', GW / 2, cy - 70);

    ctx.fillStyle = COLORS.text;
    ctx.font = '500 16px "JetBrains Mono", monospace';
    ctx.fillText('FINAL SCORE: ' + this.score, GW / 2, cy - 30);

    if (this.score >= this.highScore && this.score > 0) {
      ctx.fillStyle = COLORS.hud;
      ctx.font = '500 12px "JetBrains Mono", monospace';
      ctx.fillText('★ NEW HIGH SCORE ★', GW / 2, cy - 8);
    }

    // Status report
    ctx.fillStyle = COLORS.textMid;
    ctx.font = '400 12px "JetBrains Mono", monospace';
    ctx.fillText('GOVERNANCE: MAINTAINED', GW / 2, cy + 30);
    ctx.fillText('TECH DEBT: ELIMINATED', GW / 2, cy + 50);
    ctx.fillText('SCOPE CREEP: DEFEATED', GW / 2, cy + 70);
    ctx.fillText('PILOT PURGATORY: ESCAPED', GW / 2, cy + 90);

    if (Math.floor(Date.now() / 500) % 2 === 0) {
      ctx.fillStyle = COLORS.textMid;
      ctx.font = '500 13px "JetBrains Mono", monospace';
      ctx.fillText('ENTER TO PLAY AGAIN  ·  ESC TO QUIT', GW / 2, cy + 130);
    }
  };

  // ═══════════════════════════════════════════════════════════
  // CONSOLE HINT
  // ═══════════════════════════════════════════════════════════

  console.log(
    '%c↑ ↑ ↓ ↓ ← → ← → B A %c— try it.',
    'color: #64ffda; font-family: monospace; font-size: 12px;',
    'color: #3a4070; font-family: monospace; font-size: 12px;'
  );

})();
