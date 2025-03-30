document.addEventListener('DOMContentLoaded', () => {
  const html5QrCode = new Html5Qrcode('reader');
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    document.getElementById('success').style.display = 'block';
    document.getElementById('reader').style.display = 'none';
    setTimeout(() => {
      location.href = '/';
    }, 2000);
  };
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };
  html5QrCode.start({ facingMode: 'environment' }, config, qrCodeSuccessCallback);
});
