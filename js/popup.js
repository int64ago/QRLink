const QR_URL = 'https://qr.302.at/chart?chs=150x150&cht=qr&choe=UTF-8&chl=';

const setQRCode = url => {
  document.querySelector('img').setAttribute('src', `${QR_URL}${url}`)
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  setQRCode(tabs[0].url);
});