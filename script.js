document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // 防止表單默認提交

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 向 Google Apps Script 發送 POST 請求
    fetch(
      'https://script.google.com/macros/s/AKfycbyLStjniuEdYJpviTJZyhxZ1LPWOitICyT9ajHFGBFOObuoJytDYIgsjJuGY3svx6ho/exec',
      {
        // 替換為你的 Apps Script URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.message); // 登入成功
        } else {
          alert(data.message); // 登入失敗
        }
      })
      .catch((error) => {
        console.error('錯誤:', error);
      });

    // 在這裡可以添加進一步的驗證或登入邏輯
  });
