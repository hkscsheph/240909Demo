function doPost(e) {
    const username = e.parameter.username;
    const password = e.parameter.password;
    const hashedPassword = sha256(password); // 將輸入的密碼哈希化

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const loginAttemptsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('LoginAttempts');
    const data = sheet.getDataRange().getValues();

    let loginResult = "失敗";

    for (let i = 1; i < data.length; i++) { // 從 1 開始以跳過標題
        const row = data[i];
        if (row[0] === username && row[1] === hashedPassword) {
            loginResult = "成功";
            break;
        }
    }

    // 記錄登入嘗試
    const timestamp = new Date();
    const ipAddress = e.parameter.ip || "未知"; // 如果有提供 IP 地址，這裡會記錄
    loginAttemptsSheet.appendRow([timestamp, username, loginResult, hashedPassword]);

    return ContentService.createTextOutput(JSON.stringify({ success: loginResult === "成功", message: loginResult === "成功" ? "登入成功" : "用戶名或密碼錯誤" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function sha256(message) {
    const hash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, message);
    return hash.map(byte => (byte + 256) % 256)
               .map(byte => ('0' + byte.toString(16)).slice(-2))
               .join('');
}

function registerUser(username, password) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const hashedPassword = sha256(password);
    sheet.appendRow([username, hashedPassword]);
}