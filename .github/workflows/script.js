const token = "7989781918:AAEvVAOitRjpK-F1eLAtFrPv53nI7x_mjBA"; // ใส่ Token ของ Telegram Bot
const chatId = "8047952744"; // ใส่ Chat ID ของคุณ

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

document.getElementById('call-car').addEventListener('click', function () {
  sendTelegramMessage('เรียกรถเข้ารับสำเร็จ');
});

document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();
  sendTelegramMessage('การจองรถสำเร็จ!');
});

function sendTelegramMessage(message) {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const pickup = document.getElementById('pickup-location').value;
  const dropoff = document.getElementById('dropoff-location').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const payment = document.getElementById('payment-method').value;

  const text = `
  🚗 บริการรถรับ-ส่ง 🚗
  ชื่อ: ${name}
  เบอร์โทร: ${phone}
  จุดไปรับ: ${pickup}
  จุดไปส่ง: ${dropoff}
  วันที่: ${date}
  เวลา: ${time}
  ช่องทางชำระเงิน: ${payment}
  สถานะ: ${message}
  `;

  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      alert('ส่งข้อมูลไปยัง Telegram สำเร็จ!');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
    });
}
