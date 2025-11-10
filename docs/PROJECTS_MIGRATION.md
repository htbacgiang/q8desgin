# Dự án Q8 Design - Migration Database

## Tổng quan

Hệ thống đã được cập nhật để lưu trữ projects vào database (MongoDB) thay vì file JSON.

## Những thay đổi chính

### 1. Dashboard Updates
- **File**: `pages/dashboard/q8-projects.jsx`
- **Thay đổi**: 
  - Chuyển từ `/api/projects-json` sang `/api/projects`
  - Sử dụng MongoDB API thay vì JSON file operations
  - Cập nhật data structure để phù hợp với MongoDB response

### 2. API Endpoints
Database API đã có sẵn tại:
- `GET /api/projects` - Lấy danh sách projects từ database
- `POST /api/projects/add` - Thêm project mới vào database
- `PUT /api/projects/update` - Cập nhật project
- `DELETE /api/projects/delete?id={id}` - Xóa project

### 3. Migration Script
- **File**: `scripts/migrate-projects-to-db.js`
- **Mục đích**: Chuyển dữ liệu từ `data/projects.json` sang MongoDB
- **Chạy**: `npm run migrate-projects`

## Cách sử dụng

### 1. Chạy Migration (Khuyến nghị cho lần đầu)
```bash
# Đảm bảo MONGODB_URI được set trong .env.local
npm run migrate-projects
```

Script sẽ:
- Đọc dữ liệu từ `data/projects.json`
- Kiểm tra xem database đã có projects chưa
- Nếu chưa có, sẽ insert tất cả projects vào database
- Nếu đã có, sẽ bỏ qua migration để tránh duplicate

### 2. Sử dụng Dashboard
1. Truy cập `/dashboard/q8-projects`
2. Các chức năng:
   - **Xem danh sách**: Tự động load từ database
   - **Thêm mới**: Sử dụng tab "Thêm dự án mới"
   - **Chỉnh sửa**: Click "Chỉnh sửa" trên từng project
   - **Xóa**: Click "Xóa" trên từng project
   - **Thống kê**: Tab "Thống kê" để xem các metrics

## Cấu trúc dữ liệu

### Database Model (models/Project.js)
Project schema bao gồm:
- Basic info: title, subtitle, category, location, area, type, year
- Metadata: client, style, budget, duration, completion
- Images: image, mainImage, gallery[]
- Features: description, tags[], features[]
- Status: has3D, model3D, featured, status, slug
- Analytics: views, likes
- SEO: seoTitle, seoDescription, seoKeywords[]
- Timestamps: createdAt, updatedAt

### API Response Format
```json
{
  "success": true,
  "data": {
    "projects": [...],
    "pagination": {
      "current": 1,
      "total": 3,
      "count": 25,
      "limit": 10
    },
    "categories": [...]
  }
}
```

## Lưu ý quan trọng

1. **Backup**: Luôn backup database trước khi chạy migration
2. **Environment**: Đảm bảo `MONGODB_URI` được set đúng trong `.env.local`
3. **First Run**: Chạy migration lần đầu có thể mất vài giây
4. **Existing Data**: Nếu database đã có projects, migration sẽ bỏ qua
5. **JSON File**: File `data/projects.json` vẫn được giữ lại làm backup

## Troubleshooting

### Lỗi: "MONGODB_URI is not defined"
- Kiểm tra `.env.local` có tồn tại không
- Đảm bảo `MONGODB_URI` được set trong file
- Hoặc export environment variable trực tiếp

### Lỗi: "Database already contains projects"
- Đây là behavior bình thường để tránh duplicate
- Nếu muốn force migration, clear collection trước trong MongoDB

### Không thấy projects trong dashboard
- Kiểm tra console logs trong browser DevTools
- Kiểm tra Network tab xem API response
- Đảm bảo projects có `status: 'active'`

## Tương thích ngược

- File `data/projects.json` vẫn có sẵn và có thể dùng làm backup
- API endpoint `/api/projects-json` vẫn hoạt động nhưng không được khuyến khích
- Các trang frontend khác vẫn hoạt động bình thường

## Next Steps

1. Chạy migration: `npm run migrate-projects`
2. Kiểm tra dashboard: Vào `/dashboard/q8-projects`
3. Thêm/sửa/xóa projects trực tiếp qua dashboard
4. Xóa file JSON cũ (tùy chọn) nếu đã chắc chắn dữ liệu đã trong database

