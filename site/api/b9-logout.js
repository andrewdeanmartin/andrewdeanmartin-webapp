function secureCookieSuffix() {
  return process.env.VERCEL_ENV === 'development' ? '' : '; Secure';
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }
  res.setHeader(
    'Set-Cookie',
    `adm_b9=; Path=/b9; HttpOnly; SameSite=Lax; Max-Age=0${secureCookieSuffix()}`
  );
  res.status(200).json({ ok: true });
}
