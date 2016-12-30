const QR_URL = 'https://qr.302.at/chart?chs=150x150&cht=qr&choe=UTF-8&chl=';

const imgEle = document.querySelector('img');
const inputEle = document.querySelector('input');
const settingEle = document.querySelector('#setting');
const localEle = document.querySelector('#local');

const getLocalIP = () => localStorage.getItem('qr_url.locale') || '';
const setLocalIP = (ip) => {
  localStorage.setItem('qr_url.locale', ip);
};

const setQRCode = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let url = tabs[0].url;
    const reg = /(^https?:\/\/)(localhost|127\.0\.0\.1)/;
    const localIP = getLocalIP();
    if (reg.test(url)) {
      settingEle.style.display = 'block';
      if (/^https?:\/\/localhost/.test(url)) {
        localEle.innerText = 'localhost';
      }
      if (localIP) {
        url = url.replace(reg, `$1${localIP}`);
      }
    }
    imgEle.setAttribute('src', `${QR_URL}${url}`)
  });
}

inputEle.value = getLocalIP();

inputEle.onchange = (event) => {
  const val = event.target.value;
  setLocalIP(val);
  setQRCode();
}

setQRCode();