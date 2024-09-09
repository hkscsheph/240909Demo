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
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&ip=${encodeURIComponent(getUserIP())}`
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

  function getUserIP() {
    // 這裡可以使用一個公共 API 來獲取 IP，這只是一個示範
    return "0.0.0.0"; // 伺服器端無法直接獲取用戶 IP
}