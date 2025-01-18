const botToken = '7989781918:AAEvVAOitRjpK-F1eLAtFrPv53nI7x_mjBA';
const chatId = '8047952744';

document.getElementById('payment-method').addEventListener('change', function () {
  const paymentInfo = document.getElementById('payment-info');
  const bankInfo = document.getElementById('bank-info');
  const qrInfo = document.getElementById('qr-info');
  const qrCode = document.getElementById('qr-code');

  paymentInfo.classList.remove('hidden');
  bankInfo.classList.add('hidden');
  qrInfo.classList.add('hidden');
  qrCode.classList.add('hidden');

  if (this.value === 'bank') {
    bankInfo.classList.remove('hidden');
  } else if (this.value === 'qr') {
    qrInfo.classList.remove('hidden');
    qrCode.classList.remove('hidden');
  } else if (this.value === 'cod') {
    paymentInfo.classList.add('hidden');
  }
});

function sendToTelegram(data) {
  const message = `
ชื่อ: ${data.name}
เบอร์โทร: ${data.phone}
จุดไปรับ: ${data.pickup}
จุดไปส่ง: ${data.dropoff}
วันที่: ${data.date}
เวลา: ${data.time}
การชำระเงิน: ${data.payment}
  `;
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });
}

document.getElementById('call-car').addEventListener('click', function () {
  const form = document.getElementById('booking-form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  sendToTelegram(data);
  alert('การเรียกรถสำเร็จ!');
});

document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  sendToTelegram(data);
  alert('การจองรถสำเร็จ!');
});
