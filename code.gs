function doPost(e) {
    const username = e.parameter.username;
    const password = e.parameter.password;

    // 這裡可以替換為你自己的驗證邏輯
    const validUsername = "testUser";
    const validPassword = "testPass";

    if (username === validUsername && password === validPassword) {
        return ContentService.createTextOutput(JSON.stringify({ success: true, message: "登入成功" }))
            .setMimeType(ContentService.MimeType.JSON);
    } else {
        return ContentService.createTextOutput(JSON.stringify({ success: false, message: "用戶名或密碼錯誤" }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}