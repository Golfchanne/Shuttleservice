// ใส่ Bot Token และ Chat ID ที่นี่
const BOT_TOKEN = "7989781918:AAEvVAOitRjpK-F1eLAtFrPv53nI7x_mjBA";
const CHAT_ID = "8047952744";

// ฟังก์ชันส่งข้อความไปยัง Telegram
function sendToTelegram(message) {
  const telegramURL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  fetch(telegramURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        alert("ส่งข้อความไปยัง Telegram สำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการส่งข้อความไปยัง Telegram");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("ไม่สามารถเชื่อมต่อกับ Telegram ได้");
    });
}

// ส่งข้อความเมื่อผู้ใช้กดปุ่มจองรถ
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const payment = document.getElementById('payment').value;

  if (!name || !phone || !pickup || !dropoff || !date || !time || !payment) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  // เตรียมข้อความสำหรับส่ง
  const message = `
🚖 การจองรถใหม่:
- ชื่อ: ${name}
- เบอร์โทรศัพท์: ${phone}
- จุดไปรับ: ${pickup}
- จุดไปส่ง: ${dropoff}
- วันที่: ${date}
- เวลา: ${time}
- ช่องทางการชำระเงิน: ${payment}
  `;

  // ส่งข้อความไปยัง Telegram
  sendToTelegram(message);
});

// ไม่ให้หน้าจอซูม
document.addEventListener('focusin', function(e) {
    // ป้องกันการซูมเมื่อ focus บน input หรือ textarea
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
      document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  });
  
  document.addEventListener('focusout', function(e) {
    // คืนค่าการตั้งค่าเมื่อ focus ออกจาก input หรือ textarea
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1');
  });
  
