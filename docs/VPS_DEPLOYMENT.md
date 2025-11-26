# Hướng dẫn Triển khai trên VPS

## Lỗi "Must supply api_key" khi tạo bài viết

### Nguyên nhân
Lỗi này xảy ra khi các biến môi trường Cloudinary chưa được cấu hình trên VPS.

### Giải pháp

#### Cách 1: Sử dụng file .env (Khuyến nghị)

1. **Tạo file `.env` hoặc `.env.local` trong thư mục dự án trên VPS:**
   ```bash
   cd /path/to/your/project
   nano .env
   ```

2. **Thêm các biến môi trường Cloudinary:**
   ```env
   CLOUD_NAME=your-cloud-name
   CLOUD_API_KEY=your-api-key
   CLOUD_API_SECRET=your-api-secret
   CLOUDINARY_FOLDER=q8desgin
   ```

3. **Lưu file và restart PM2:**
   ```bash
   pm2 restart all
   # hoặc
   pm2 restart btacademy-web
   ```

#### Cách 2: Cấu hình trong ecosystem.config.js

1. **Mở file `ecosystem.config.js`:**
   ```bash
   nano ecosystem.config.js
   ```

2. **Thêm các biến môi trường vào section `env` của app:**
   ```javascript
   env: {
     NODE_ENV: 'production',
     PORT: 3000,
     CLOUD_NAME: 'your-cloud-name',
     CLOUD_API_KEY: 'your-api-key',
     CLOUD_API_SECRET: 'your-api-secret',
     CLOUDINARY_FOLDER: 'q8desgin',
   }
   ```

3. **Restart PM2:**
   ```bash
   pm2 restart all
   ```

#### Cách 3: Export biến môi trường trực tiếp (Tạm thời)

```bash
export CLOUD_NAME=your-cloud-name
export CLOUD_API_KEY=your-api-key
export CLOUD_API_SECRET=your-api-secret
export CLOUDINARY_FOLDER=q8desgin
pm2 restart all
```

**Lưu ý:** Cách này chỉ có hiệu lực trong session hiện tại. Sau khi đăng xuất SSH, các biến sẽ mất.

### Kiểm tra cấu hình

Sau khi cấu hình, kiểm tra logs để đảm bảo không còn lỗi:

```bash
pm2 logs btacademy-web
```

Nếu thấy log:
```
⚠️  Cloudinary configuration missing!
```

Thì có nghĩa là các biến môi trường chưa được load đúng cách.

### Lấy thông tin Cloudinary

1. Đăng nhập vào [Cloudinary Console](https://cloudinary.com/console)
2. Vào Dashboard
3. Copy các giá trị:
   - **Cloud name**: Tên cloud của bạn
   - **API Key**: Trong phần "Account Details"
   - **API Secret**: Trong phần "Account Details" (click để hiện)

### Troubleshooting

#### Vấn đề: PM2 không load biến môi trường từ .env

**Giải pháp:** Sử dụng `pm2-dotenv` hoặc cấu hình trực tiếp trong `ecosystem.config.js`

```bash
npm install pm2-dotenv
```

Sau đó trong `ecosystem.config.js`:
```javascript
require('dotenv').config();
```

#### Vấn đề: Vẫn báo lỗi sau khi cấu hình

1. Kiểm tra xem file .env có đúng định dạng không (không có khoảng trắng thừa, không có quotes)
2. Đảm bảo đã restart PM2 sau khi thay đổi
3. Kiểm tra logs chi tiết: `pm2 logs btacademy-web --lines 50`
4. Xác nhận các biến đã được load: Thêm log tạm thời trong code để kiểm tra

### Các biến môi trường bắt buộc khác

Ngoài Cloudinary, đảm bảo các biến sau cũng được cấu hình:

- `MONGODB_URI`: Connection string MongoDB
- `NEXTAUTH_SECRET`: Secret key cho NextAuth
- `NEXTAUTH_URL`: URL của website (ví dụ: https://yourdomain.com)
- `EMAIL_USER`: Email để gửi mail
- `EMAIL_PASS`: Password email (App Password nếu dùng Gmail)

Xem file `env-template.txt` để biết đầy đủ các biến cần thiết.

