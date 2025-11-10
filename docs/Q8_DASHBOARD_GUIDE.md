# Hướng dẫn sử dụng Q8 Design Dashboard

## 📋 Tổng quan

Dashboard quản lý dự án Q8 Design giúp bạn quản lý tất cả các dự án thiết kế nội thất một cách dễ dàng và hiệu quả.

## 🚀 Truy cập Dashboard

Truy cập dashboard tại: **http://localhost:3000/dashboard/q8-projects**

## 📦 Các tính năng chính

### 1. **Danh sách dự án** 📋

Trang này hiển thị tất cả các dự án với:
- **Tìm kiếm**: Tìm kiếm theo tên hoặc địa điểm dự án
- **Lọc**: Lọc theo danh mục (Biệt thự, Căn hộ, Nhà phố, Thương mại)
- **Hiển thị**: Xem thông tin chi tiết của từng dự án
- **Thao tác**: 
  - 👁️ **Xem**: Xem dự án trên trang chính
  - ✏️ **Sửa**: Chỉnh sửa thông tin dự án (đang phát triển)
  - 🗑️ **Xóa**: Xóa dự án

### 2. **Thêm dự án mới** ➕

Form thêm dự án mới bao gồm các trường:

#### Thông tin cơ bản:
- **Tiêu đề** (bắt buộc): Ví dụ "Dự án Biệt thự FLC Sầm Sơn"
- **Phụ đề** (bắt buộc): Ví dụ "Biệt thự nghỉ dưỡng cao cấp"
- **Danh mục** (bắt buộc): Villa/Apartment/Townhouse/Commercial
- **Vị trí** (bắt buộc): Ví dụ "FLC Sầm Sơn, Thanh Hóa"
- **Diện tích** (bắt buộc): Ví dụ "350m²"
- **Loại dự án** (bắt buộc): Ví dụ "Thiết kế và Thi công trọn gói"
- **Năm** (bắt buộc): Ví dụ "2024"
- **Khách hàng** (bắt buộc): Ví dụ "Gia đình anh H."
- **Phong cách** (bắt buộc): Ví dụ "Hiện đại nghỉ dưỡng"
- **Ngân sách** (bắt buộc): Ví dụ "3.5 - 4.2 tỷ VNĐ"
- **Thời gian thực hiện** (bắt buộc): Ví dụ "6 tháng"
- **Tình trạng** (bắt buộc): Đang thi công/Hoàn thành/Thiết kế

#### Hình ảnh:
- **Ảnh đại diện** (bắt buộc): Có 2 cách chọn ảnh
  - **Upload ảnh mới**: Click "Upload ảnh mới" → Chọn file từ máy tính
  - **Chọn từ thư viện**: Click nút "Thư viện" → Chọn ảnh đã upload trước đó
  - Hỗ trợ: JPG, PNG, WEBP (tối đa 5MB)
  - Ảnh sẽ tự động được upload lên Cloudinary
  - Ảnh đại diện cũng sẽ được dùng làm ảnh chính (mainImage)
  - Có thể xóa và chọn lại ảnh khác

- **Gallery** (bắt buộc): Có 2 cách thêm ảnh
  - **Upload ảnh mới**: Click "Upload ảnh mới" → Chọn nhiều file (Ctrl/Cmd + Click)
  - **Chọn từ thư viện**: Click "Chọn từ thư viện" → Chọn nhiều ảnh từ thư viện
  - Xem preview grid tất cả ảnh đã chọn
  - Có thể xóa từng ảnh hoặc xóa tất cả
  - Thứ tự ảnh sẽ được giữ nguyên khi hiển thị
  - Số thứ tự hiển thị ở góc dưới mỗi ảnh

#### Nội dung:
- **Mô tả ngắn** (bắt buộc): Mô tả ngắn gọn về dự án
- **Tổng quan** (bắt buộc): Mô tả chi tiết về dự án
- **Điểm nổi bật** (bắt buộc): Mỗi dòng một điểm nổi bật
  ```
  Thiết kế tối ưu view biển 180 độ
  Không gian mở kết nối với thiên nhiên
  Hệ thống ánh sáng thông minh
  ```
- **Tags** (bắt buộc): Các tag phân cách bằng dấu phẩy
  ```
  Hiện đại, Nghỉ dưỡng, View biển
  ```
- **Tính năng** (tùy chọn): Định dạng JSON
  ```json
  [
    {
      "icon": "🏖️",
      "title": "View biển trực diện",
      "desc": "Tận hưởng view biển tuyệt đẹp từ mọi góc nhìn"
    },
    {
      "icon": "🌅",
      "title": "Ánh sáng tự nhiên",
      "desc": "Thiết kế tối ưu ánh sáng và thông gió"
    }
  ]
  ```

#### Mô hình 3D:
- **Có mô hình 3D**: Checkbox để đánh dấu dự án có mô hình 3D
- **Link mô hình 3D**: Link embed từ Sketchfab hoặc các nền tảng tương tự
- **Dự án nổi bật**: Checkbox để đánh dấu dự án nổi bật (hiển thị trên trang chủ)

### 3. **Thống kê** 📊

Trang thống kê hiển thị:
- Số lượng dự án theo danh mục (Biệt thự, Căn hộ, Nhà phố, Thương mại)
- Số lượng dự án nổi bật
- Số lượng dự án có mô hình 3D
- Trạng thái dự án (Hoàn thành, Đang thi công, Thiết kế)

## 🖼️ Thư viện ảnh (Image Library)

Tính năng mới cho phép bạn chọn lại ảnh đã upload trước đó:

### Tính năng:
- 📚 Xem tất cả ảnh đã upload vào hệ thống
- 🔍 Tìm kiếm ảnh theo URL hoặc alt text
- ✅ Chọn 1 ảnh (cho ảnh đại diện) hoặc nhiều ảnh (cho gallery)
- 👁️ Preview full-size ảnh
- 🎯 Highlight ảnh đã chọn
- 📊 Hiển thị số lượng ảnh đã chọn

### Cách sử dụng:
1. Click nút **"Thư viện"** (màu xanh lá)
2. Xem danh sách ảnh trong modal
3. Sử dụng search box để tìm ảnh nếu cần
4. Click vào ảnh để chọn (có thể chọn nhiều ảnh cho gallery)
5. Ảnh được chọn sẽ có viền xanh và icon checkmark
6. Click **"Chọn [N] ảnh"** để xác nhận

### Lợi ích:
- ♻️ Tái sử dụng ảnh đã upload, tiết kiệm băng thông
- ⚡ Nhanh hơn việc upload lại ảnh
- 🎨 Đồng bộ ảnh giữa các dự án
- 💾 Quản lý tập trung các ảnh

## 💡 Tips sử dụng

1. **Upload ảnh trực tiếp**: 
   - ✅ Không cần upload thủ công lên server
   - ✅ Ảnh tự động được upload lên Cloudinary
   - ✅ URL ảnh tự động được lưu vào dự án
   - ✅ Có thể upload nhiều ảnh gallery cùng lúc
   - 📚 Ảnh đã upload sẽ được lưu vào thư viện để dùng lại

2. **Chất lượng ảnh**:
   - Khuyến nghị: Resolution tối thiểu 1920x1080px
   - Format tốt nhất: WEBP hoặc JPG (đã nén)
   - Kích thước tối đa: 5MB/ảnh
   - Tỷ lệ khung hình: 16:9 hoặc 4:3

3. **Slug tự động**: Slug sẽ được tự động tạo từ tiêu đề dự án
   - "Dự án Biệt thự FLC Sầm Sơn" → "biet-thu-flc-sam-son"

4. **Định dạng JSON cho Features**: Đảm bảo format đúng với các icon emoji:
   ```json
   [
     {"icon": "🏖️", "title": "Tiêu đề", "desc": "Mô tả"}
   ]
   ```

5. **Gallery Order**: Thứ tự ảnh trong gallery:
   - Ảnh đầu tiên sẽ hiển thị đầu tiên
   - Có thể sắp xếp lại trước khi upload
   - Hoặc xóa và upload lại theo thứ tự mong muốn

6. **Backup dữ liệu**: File dữ liệu gốc được lưu tại:
   ```
   /data/projects.js
   ```

## 🔧 API Endpoints

Dashboard sử dụng các API sau:

### Quản lý dự án:
- **POST** `/api/projects/add` - Thêm dự án mới
- **PUT** `/api/projects/update` - Cập nhật dự án
- **DELETE** `/api/projects/delete?id={id}` - Xóa dự án

### Upload ảnh:
- **POST** `/api/image` - Upload một ảnh
- **POST** `/api/image?multiple=true` - Upload nhiều ảnh cùng lúc
- **GET** `/api/image` - Lấy danh sách ảnh đã upload

## 📝 Cấu trúc dữ liệu Project

```javascript
{
  id: 1,                                    // Auto-generated
  title: "Dự án Biệt thự FLC Sầm Sơn",    // Required
  subtitle: "Biệt thự nghỉ dưỡng cao cấp", // Required
  category: "villa",                        // Required: villa|apartment|townhouse|commercial
  location: "FLC Sầm Sơn, Thanh Hóa",      // Required
  area: "350m²",                           // Required
  type: "Thiết kế và Thi công trọn gói",   // Required
  year: "2024",                            // Required
  client: "Gia đình anh H.",               // Required
  style: "Hiện đại nghỉ dưỡng",            // Required
  budget: "3.5 - 4.2 tỷ VNĐ",              // Required
  duration: "6 tháng",                     // Required
  completion: "Hoàn thành",                // Required: Đang thi công|Hoàn thành|Thiết kế
  image: "/du-an/van-quan/1.jpg",          // Required
  mainImage: "/du-an/van-quan/1.jpg",      // Required
  gallery: [                                // Required (array)
    "/du-an/van-quan/1.jpg",
    "/du-an/van-quan/2.jpg"
  ],
  description: "Mô tả ngắn...",            // Required
  tags: ["Hiện đại", "Nghỉ dưỡng"],       // Required (array)
  has3D: true,                             // Optional (boolean)
  model3D: "https://sketchfab.com/...",    // Optional
  featured: true,                          // Optional (boolean)
  slug: "biet-thu-flc-sam-son",           // Auto-generated
  overview: "Tổng quan chi tiết...",       // Required
  highlights: [                             // Required (array)
    "Điểm nổi bật 1",
    "Điểm nổi bật 2"
  ],
  features: [                               // Optional (array)
    {
      icon: "🏖️",
      title: "View biển trực diện",
      desc: "Tận hưởng view biển tuyệt đẹp"
    }
  ]
}
```

## 📝 Ví dụ thêm dự án:

### Bước 1: Chọn ảnh đại diện
**Cách 1 - Upload ảnh mới:**
1. Click nút "Upload ảnh mới"
2. Chọn file từ máy tính
3. Đợi upload hoàn tất

**Cách 2 - Chọn từ thư viện:**
1. Click nút "Thư viện" (màu xanh)
2. Tìm và chọn ảnh trong thư viện
3. Click "Chọn ảnh"

### Bước 2: Thêm ảnh vào gallery
**Cách 1 - Upload ảnh mới:**
1. Click "Upload ảnh mới"
2. Chọn nhiều file (Ctrl+Click)
3. Đợi upload hoàn tất

**Cách 2 - Chọn từ thư viện:**
1. Click "Chọn từ thư viện"
2. Tìm kiếm và chọn nhiều ảnh
3. Click "Chọn [N] ảnh"

### Bước 3: Điền thông tin
**Features** (JSON format):
```json
[
  {"icon": "🏖️", "title": "View biển trực diện", "desc": "Tận hưởng view biển tuyệt đẹp"},
  {"icon": "🌅", "title": "Ánh sáng tự nhiên", "desc": "Thiết kế tối ưu ánh sáng"}
]
```

**Highlights** (mỗi dòng một điểm):
```
Thiết kế tối ưu view biển 180 độ
Không gian mở kết nối với thiên nhiên
Hệ thống ánh sáng thông minh
```

**Tags** (phân cách bằng dấu phẩy):
```
Hiện đại, Nghỉ dưỡng, View biển
```

## ⚠️ Lưu ý quan trọng

1. **Backup trước khi thao tác**: Nên backup file `/data/projects.js` trước khi thêm/sửa/xóa
2. **Upload ảnh trước**: Đảm bảo đã upload ảnh đại diện và gallery trước khi submit
3. **Chất lượng ảnh**: Ảnh nên có resolution tốt (1920x1080px trở lên)
4. **Test trước**: Test xem dự án hiển thị đúng trên trang chính trước khi publish
5. **Quyền truy cập**: Dashboard này chưa có authentication, nên chỉ sử dụng trong môi trường dev

## 🎨 Customization

Nếu muốn thay đổi giao diện hoặc thêm tính năng:

1. **Form thêm dự án**: Edit file `/components/q8design/AddProjectForm.jsx`
2. **Danh sách dự án**: Edit file `/components/q8design/ProjectsListDashboard.jsx`
3. **Dashboard page**: Edit file `/pages/dashboard/q8-projects.jsx`
4. **API endpoints**: Edit files trong `/pages/api/projects/`

## 🐛 Troubleshooting

### Lỗi khi upload ảnh
- **"Upload thất bại"**: Kiểm tra kết nối internet
- **File quá lớn**: Giảm kích thước file xuống dưới 5MB
- **Format không hỗ trợ**: Chỉ dùng JPG, PNG, WEBP
- **Chưa đăng nhập**: Cần đăng nhập để upload ảnh lên Cloudinary

### Lỗi khi thêm dự án
- **"Vui lòng upload ảnh đại diện"**: Phải upload ảnh trước
- **"Vui lòng upload ít nhất 1 ảnh vào gallery"**: Gallery không được rỗng
- Kiểm tra format JSON của trường Features
- Xem console log để biết lỗi cụ thể

### Ảnh không hiển thị trên trang web
- Đợi vài giây để Cloudinary xử lý ảnh
- Kiểm tra URL ảnh có truy cập được không
- Clear cache trình duyệt (Ctrl+F5)
- Kiểm tra Cloudinary có hoạt động không

### Slug bị trùng
- Slug được tự động generate từ title
- Nếu bị trùng, hãy thay đổi title một chút

### Upload chậm
- Kiểm tra tốc độ internet
- Upload từng ảnh thay vì nhiều ảnh cùng lúc
- Nén ảnh trước khi upload
- Đợi upload ảnh đại diện xong mới upload gallery

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Console log của browser (F12)
2. Terminal log của Next.js server
3. File `/data/projects.js` có bị lỗi format không

---

**Phiên bản**: 2.1.0 - Thư viện ảnh  
**Cập nhật lần cuối**: 2025-10-06

### Changelog v2.1.0:
- 🆕 Thêm ImageLibraryModal - Thư viện ảnh tập trung
- 🔍 Tìm kiếm ảnh trong thư viện
- ♻️ Chọn lại ảnh đã upload (single/multiple select)
- 🎨 UI/UX cải tiến với highlight và checkmark
- 📊 Hiển thị số lượng ảnh đã chọn
- 💚 Nút "Thư viện" màu xanh lá dễ nhận biết

### Changelog v2.0.0:
- ✨ Thêm component ImageUploader cho ảnh đại diện
- ✨ Thêm component GalleryUploader cho nhiều ảnh
- ✨ Tích hợp API Cloudinary upload
- ✨ Preview ảnh real-time
- ✨ Validation upload đầy đủ
- 🔧 Bỏ input URL thủ công
- 📝 Cập nhật documentation đầy đủ

