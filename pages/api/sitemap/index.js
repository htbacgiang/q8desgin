// Sitemap chính - chứa trực tiếp danh sách các trang
import db from '../../../utils/db';
import Post from '../../../models/Post.ts';
import Product from '../../../models/Product';
import Course from '../../../models/Course';

// Danh sách các trang tĩnh
const staticPages = [
  // Trang chủ - ưu tiên cao nhất
  { url: '/', changefreq: 'daily', priority: '1.0' },
  
  // Các trang chính của website
  { url: '/gioi-thieu', changefreq: 'monthly', priority: '0.8' },
  { url: '/lien-he', changefreq: 'monthly', priority: '0.7' },
  { url: '/bai-viet', changefreq: 'daily', priority: '0.9' },
  
  // Trang dịch vụ và dự án - quan trọng cho business
  { url: '/dich-vu', changefreq: 'weekly', priority: '0.9' },
  { url: '/du-an', changefreq: 'weekly', priority: '0.9' },
  
  // Trang tư vấn và liên hệ
  { url: '/tu-van', changefreq: 'weekly', priority: '0.8' },
  { url: '/dat-lich-tu-van', changefreq: 'weekly', priority: '0.7' },
  { url: '/tuyen-dung', changefreq: 'monthly', priority: '0.6' },
  
  // Trang đăng ký/đăng nhập
  { url: '/dang-ky', changefreq: 'monthly', priority: '0.6' },
  { url: '/dang-nhap', changefreq: 'monthly', priority: '0.6' },
  
  // Các trang chính sách và pháp lý
  { url: '/chinh-sach-bao-mat', changefreq: 'yearly', priority: '0.3' },
  { url: '/bao-mat', changefreq: 'yearly', priority: '0.3' },
  { url: '/dieu-khoan-su-dung', changefreq: 'yearly', priority: '0.3' },
  
  // Trang auth
  { url: '/auth/quen-mat-khau', changefreq: 'monthly', priority: '0.4' },
  { url: '/auth/dat-lai-mat-khau', changefreq: 'monthly', priority: '0.4' },
  
  // Trang cài đặt và quản lý
  { url: '/cai-dat', changefreq: 'monthly', priority: '0.5' },
  { url: '/unsubscribe', changefreq: 'yearly', priority: '0.2' },
  
  // Trang 404 và activate
  { url: '/activate', changefreq: 'yearly', priority: '0.1' },
  
  // Trang dashboard public (nếu có)
  { url: '/dashboard', changefreq: 'monthly', priority: '0.5' },
  
  // Trang sản phẩm chính
  { url: '/san-pham', changefreq: 'weekly', priority: '0.8' },
  
  // Trang khóa học chính
  { url: '/khoa-hoc', changefreq: 'weekly', priority: '0.8' },
];

// Danh sách các slug dịch vụ tĩnh
const servicesSlugs = [
  'thiet-ke-kien-truc-noi-that',
  'thi-cong-xay-dung',
  'cam-ket-chat-luong',
  'bao-hanh-bao-tri',
  'thiet-ke-web',
  'thiet-ke-logo',
  'marketing-online',
  'seo-website',
  'quang-cao-google',
  'quang-cao-facebook',
  'content-marketing',
  'social-media-marketing',
  'thiet-ke-graphic',
  'thiet-ke-banner',
  'thiet-ke-catalog',
  'thiet-ke-name-card',
  'thiet-ke-brochure',
  'thiet-ke-poster',
  'thiet-ke-menu',
  'thiet-ke-billboard'
];

// Hàm encode URL an toàn
const encodeUrl = (url) => {
  return url.replace(/&/g, '&amp;')
           .replace(/</g, '&lt;')
           .replace(/>/g, '&gt;')
           .replace(/"/g, '&quot;')
           .replace(/'/g, '&#39;');
};

// Hàm tạo nội dung sitemap
const generateSitemap = (posts, products = [], courses = [], projects = []) => {
  const baseUrl = 'https://q8design.vn';

  // Tạo XML cho các trang tĩnh
  const staticPagesXml = staticPages
    .map((page) => `
    <url>
      <loc>${encodeUrl(baseUrl + page.url)}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
    `)
    .join('');

  // Tạo XML cho các slug dịch vụ tĩnh
  const serviceUrls = servicesSlugs
    .map((slug) => `
    <url>
      <loc>${encodeUrl(baseUrl + '/dich-vu/' + encodeURIComponent(slug))}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    `)
    .join('');

  // Tạo XML cho các bài viết động
  const postUrls = posts
    .map((post) => `
    <url>
      <loc>${encodeUrl(baseUrl + '/bai-viet/' + encodeURIComponent(post.slug))}</loc>
      <lastmod>${new Date(post.updatedAt || post.createdAt).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
    `)
    .join('');

  // Tạo XML cho các sản phẩm động
  const productUrls = products
    .map((product) => `
    <url>
      <loc>${encodeUrl(baseUrl + '/san-pham/' + encodeURIComponent(product.slug))}</loc>
      <lastmod>${new Date(product.updatedAt || product.createdAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
    `)
    .join('');

  // Tạo XML cho các dự án động
  const projectUrls = projects
    .map((project) => `
    <url>
      <loc>${encodeUrl(baseUrl + '/du-an/' + encodeURIComponent(project.slug))}</loc>
      <lastmod>${project.lastmod}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
    `)
    .join('');

  // Tạo XML cho các khóa học động
  const courseUrls = courses
    .map((course) => `
    <url>
      <loc>${encodeUrl(baseUrl + '/khoa-hoc/' + encodeURIComponent(course.slug))}</loc>
      <lastmod>${new Date(course.updatedAt || course.createdAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>
    `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${staticPagesXml}
  ${serviceUrls}
  ${projectUrls}
  ${postUrls}
  ${productUrls}
  ${courseUrls}
</urlset>`;
};

// Hàm lấy dữ liệu bài viết
const getPostsForSitemap = async () => {
  try {
    await db.connectDb();
    const posts = await Post.find({}, 'slug updatedAt createdAt isDraft').lean();
    console.log(`Found ${posts.length} total posts in database`);
    
    // Hiển thị tất cả bài viết (cả draft và published)
    // Nếu muốn chỉ hiển thị published, thay đổi dòng dưới thành:
    // const allPosts = posts.filter(post => !post.isDraft);
    const allPosts = posts; // Hiển thị tất cả bài viết
    console.log(`Found ${allPosts.length} posts for sitemap (including drafts)`);
    
    return allPosts || [];
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    return [];
  }
};

// Hàm lấy dữ liệu sản phẩm
const getProductsForSitemap = async () => {
  try {
    await db.connectDb();
    const products = await Product.find({}, 'slug updatedAt createdAt status').lean();
    console.log(`Found ${products.length} total products in database`);
    
    const activeProducts = products.filter(product => 
      product.status === 'active' || 
      product.status === 'published' || 
      !product.status
    );
    console.log(`Found ${activeProducts.length} active products for sitemap`);
    
    return activeProducts || [];
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    return [];
  }
};

// Hàm lấy dữ liệu khóa học
const getCoursesForSitemap = async () => {
  try {
    await db.connectDb();
    const courses = await Course.find({}, 'slug updatedAt createdAt isActive status').lean();
    console.log(`Found ${courses.length} total courses in database`);
    
    const activeCourses = courses.filter(course => 
      course.isActive === true || 
      course.status === 'active' || 
      course.status === 'published' ||
      !course.isActive && !course.status
    );
    console.log(`Found ${activeCourses.length} active courses for sitemap`);
    
    return activeCourses || [];
  } catch (error) {
    console.error('Lỗi khi lấy khóa học:', error);
    return [];
  }
};

// Hàm lấy các slug dự án từ data tĩnh
const getProjectSlugsForSitemap = () => {
  try {
    const projectSlugs = [
      "biet-thu-flc-sam-son",
      "anh-minh-the-k-park", 
      "nha-pho-anh-chung-thanh-tri",
      "chi-van-tay-ho",
      "thang-long-number-1",
      "nha-pho-anh-dat-ung-hoa",
      "anh-do-gia-lam",
      "chi-ha-cc-newskyline-van-quan",
      "chi-linh-vin-smart-city",
      "thiet-ke-nha-pho-anh-loi-linh-dam",
      "thiet-ke-nha-pho-chi-bich",
      "nha-pho-3-tang-hien-dai",
      "biet-thu-sang-trong",
      "can-ho-chung-cu-cao-cap",
      "nha-hang-khach-san",
      "van-phong-cong-ty",
      "showroom-trien-lam",
      "nha-xuong-san-xuat",
      "biet-thu-venice",
      "nha-pho-4-tang-sang-trong",
      "can-ho-penthouse",
      "nha-hang-sushi",
      "khach-san-5-sao",
      "van-phong-startup",
      "showroom-o-to",
      "nha-xuong-cong-nghiep",
      "biet-thu-phap",
      "nha-pho-co-dien",
      "can-ho-studio",
      "nha-hang-bbq"
    ];
    
    return projectSlugs.map(slug => ({
      slug,
      lastmod: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Lỗi khi lấy slug dự án:', error);
    return [];
  }
};

// Handler chính cho sitemap chính
const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  try {
    const [posts, products, courses, projects] = await Promise.all([
      getPostsForSitemap(),
      getProductsForSitemap(),
      getCoursesForSitemap(),
      Promise.resolve(getProjectSlugsForSitemap())
    ]);

    console.log(`Main Sitemap generated: ${staticPages.length} static pages, ${posts.length} posts, ${products.length} products, ${courses.length} courses, ${projects.length} projects`);

    const sitemap = generateSitemap(posts, products, courses, projects);

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Lỗi khi tạo sitemap chính:', error);
    res.status(500).end('Lỗi máy chủ khi tạo sitemap chính');
  }
};

export default handler;
