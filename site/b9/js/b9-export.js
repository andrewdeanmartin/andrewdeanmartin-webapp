(function () {
  'use strict';

  function downloadText(filename, text, mime) {
    var blob = new Blob([text], { type: mime || 'text/plain' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  window.B9Export = {
    downloadFacilitationPack: function () {
      return B9Api.getFacilitationPackMarkdown().then(function (md) {
        downloadText('b9-facilitation-pack.md', md, 'text/markdown');
      });
    },

    downloadFacilitationPackJson: function () {
      return B9Api.getFacilitationPack().then(function (pack) {
        downloadText('b9-facilitation-pack.json', JSON.stringify(pack, null, 2), 'application/json');
      });
    },
  };
})();
