function onScanSuccess(decodedText, decodedResult) {
  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      qrCode: decodedText
    })
  }).then(() => {
    window.location.href = '../';
  });
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);