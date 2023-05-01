# A1-Restaurant List

![](https://i.imgur.com/hoSWpwW.png)
![](https://i.imgur.com/WOvjjWG.jpg)

## 一、介紹

此專案收藏了一些美食餐廳，可供使用者查閱餐廳資訊。

## 二、功能列表：

- 使用者可以點選 Register 按鈕註冊，以收藏自己的口袋餐廳清單

- 使用者註冊後可以點選 Login 登入，以閱覽自己的餐廳頁面

- 使用者可以透過 Facebook Login 直接登入

- 若欲登出，請點選右上角 Logout

### 登入後

- 畫面右下角 + 號可以新增餐廳

- 輸入餐廳名稱或餐廳種類關鍵字，即可搜尋餐廳

- 點選餐廳或 detail，可以進入詳細的餐廳資訊頁面

- 點選 delete 可以刪除餐廳

- 點選 edit 可以編輯餐廳資料

## 三、如何使用？

1. 需安裝 node.js 及 npm
2. 將專案 clone 到本地
3. 在本地開始之後，透過終端機進入資料夾，輸入：
   `npm install`
4. 安裝完畢後，繼續輸入：
   `npm run start`
5. 若看見此行訊息則代表順利運行：
   `Listening on http://localhost:3000`
6. 打開瀏覽器進入以下網址：
   `http://localhost:3000`
7. 若欲暫停使用，請回到終端機並操作：
   `ctrl + c`

## 四、開發環境：

- Node.js 18.15.0
- Express 4.18.2
- Express-Handlebars 7.0.2
- Bootstrap 5.1.3
- Font-awesome 5.8.1
- dotenv 16.0.3
- mongoose 5.9.7
- bcryptjs 2.4.3
- connect-flash 0.1.1
- express-session 1.17.1
- method-override 3.0.0
- passport 0.4.1
- passport-facebook 3.0.0
- passport-local 1.0.0
