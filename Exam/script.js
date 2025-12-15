const cutBtn = document.getElementById('cutBtn');
cutBtn.onclick = function () {
  const divs = document.querySelectorAll('div');
  divs.forEach(function (div) {
    let text = div.dataset.originalText;
    if (!text) {
      text = div.textContent;
      div.dataset.originalText = text;
    }
    if ([...text].length > 10) {
      div.textContent = [...text].slice(0, 10).join('') + '...';
    }
  });
};
