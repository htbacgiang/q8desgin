// Q8 Design Projects Data
// Centralized data for all projects used across ProjectsSection, ProjectsPage, and ProjectDetailPage

const projects = [
  {
    id: 1,
    title: "Dự án Biệt thự FLC Sầm Sơn",
    subtitle: "Biệt thự nghỉ dưỡng cao cấp",
    category: "villa",
    location: "FLC Sầm Sơn, Thanh Hóa",
    area: "350m²",
    type: "Thiết kế và Thi công trọn gói",
    year: 2024,
    client: "Gia đình anh H.",
    style: "Hiện đại nghỉ dưỡng",
    budget: "3.5 - 4.2 tỷ VNĐ",
    duration: "6 tháng",
    completion: "Hoàn thành",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    mainImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&h=200&fit=crop"
    ],
    description: "Biệt thự nghỉ dưỡng cao cấp với phong cách hiện đại, tận dụng tối đa view biển và ánh sáng tự nhiên.",
    tags: [
      "Hiện đại",
      "Nghỉ dưỡng",
      "View biển"
    ],
    has3D: true,
    model3D: "https://sketchfab.com/models/2e85bf66e2dd4d48b683d6843e040a2b/embed?autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1",
    featured: true,
    slug: "biet-thu-flc-sam-son",
    overview: "Dự án biệt thự FLC Sầm Sơn là một công trình nghỉ dưỡng cao cấp, được thiết kế với phong cách hiện đại tối giản, tập trung vào việc tận dụng tối đa view biển tuyệt đẹp và ánh sáng tự nhiên.",
    features: [
      {
        icon: "🏖️",
        title: "View biển trực diện",
        desc: "Tận hưởng view biển tuyệt đẹp từ mọi góc nhìn"
      },
      {
        icon: "🌅",
        title: "Ánh sáng tự nhiên",
        desc: "Thiết kế tối ưu ánh sáng và thông gió"
      },
      {
        icon: "🏊‍♂️",
        title: "Hồ bơi riêng",
        desc: "Hồ bơi infinity với view ra biển"
      },
      {
        icon: "🌿",
        title: "Vườn nhiệt đới",
        desc: "Khu vườn nhiệt đới với thực vật bản địa"
      }
    ]
  },
  {
    id: 2,
    title: "Căn hộ Penthouse The K-Park",
    subtitle: "Nâng tầm không gian sống hiện đại",
    category: "apartment",
    location: "The K-Park, Hà Nội",
    area: "120m²",
    type: "Thiết kế và Thi công nội thất trọn gói",
    year: 2024,
    client: "Gia đình anh T.",
    style: "Hiện đại tối giản",
    budget: "1.8 - 2.2 tỷ VNĐ",
    duration: "4 tháng",
    completion: "Hoàn thành",
    image: "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729126/q8desgin/eazz9o2tozqdm5gwvmrk.jpg",
    mainImage: "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729126/q8desgin/eazz9o2tozqdm5gwvmrk.jpg",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=200&h=200&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=200&h=200&fit=crop"
    ],
    description: "Căn hộ penthouse với thiết kế tối giản, sang trọng, tận dụng tối đa không gian và ánh sáng.",
    tags: [
      "Tối giản",
      "Sang trọng",
      "Penthouse"
    ],
    has3D: true,
    model3D: "https://sketchfab.com/models/2e85bf66e2dd4d48b683d6843e040a2b/embed?autostart=1&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1",
    featured: true,
    slug: "can-ho-penthouse-the-k-park",
    overview: "Căn hộ penthouse tại The K-Park được thiết kế theo phong cách hiện đại tối giản, tập trung vào việc tối ưu hóa không gian sống và tạo ra một môi trường sống sang trọng, tiện nghi.",
    features: [
      {
        icon: "🏢",
        title: "View thành phố",
        desc: "Tầm nhìn panorama ra toàn thành phố"
      },
      {
        icon: "💡",
        title: "Hệ thống thông minh",
        desc: "Smart home với điều khiển tự động"
      },
      {
        icon: "🛋️",
        title: "Nội thất cao cấp",
        desc: "Nội thất nhập khẩu từ châu Âu"
      },
      {
        icon: "🌟",
        title: "Không gian mở",
        desc: "Thiết kế mở kết nối các khu vực"
      }
    ]
  },
  {
    id: 3,
    title: "Nhà phố liền kề Times City",
    subtitle: "Tối ưu không gian sống gia đình",
    category: "townhouse",
    location: "Times City, Hà Nội",
    area: "80m²",
    type: "Cải tạo và Thiết kế nội thất",
    year: 2023,
    client: "Gia đình chị M.",
    style: "Hiện đại ấm cúng",
    budget: "800 triệu - 1 tỷ VNĐ",
    duration: "4 tháng",
    completion: "Hoàn thành",
    image: "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729127/q8desgin/wgscklpcz4zkzxsvlyyv.jpg",
    mainImage: "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729127/q8desgin/wgscklpcz4zkzxsvlyyv.jpg",
    gallery: [
      "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729121/q8desgin/edjry4lxpskes36hfviu.jpg",
      "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729123/q8desgin/swk8aeej2re9mwknesqj.jpg",
      "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729124/q8desgin/rig6wecpudfoxsjiqgkr.jpg",
      "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729126/q8desgin/eazz9o2tozqdm5gwvmrk.jpg",
      "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729127/q8desgin/wgscklpcz4zkzxsvlyyv.jpg"
    ],
    description: "Cải tạo nhà phố liền kề với thiết kế thông minh, tối ưu hóa từng m² để tạo không gian sống tiện nghi.",
    tags: [
      "Cải tạo",
      "Tối ưu",
      "Gia đình"
    ],
    has3D: false,
    featured: true,
    slug: "nha-pho-lin-k-times-city",
    overview: "Dự án cải tạo nhà phố liền kề tại Times City tập trung vào việc tối ưu hóa không gian sống cho gia đình trẻ, tạo ra một môi trường sống hiện đại nhưng vẫn giữ được sự ấm cúng.",
    features: [
      {
        icon: "🏡",
        title: "Không gian đa năng",
        desc: "Mỗi góc nhà đều được tận dụng hiệu quả"
      },
      {
        icon: "👨‍👩‍👧‍👦",
        title: "Thân thiện gia đình",
        desc: "Thiết kế an toàn cho trẻ em"
      },
      {
        icon: "💾",
        title: "Lưu trữ thông minh",
        desc: "Hệ thống tủ âm tường tiết kiệm diện tích"
      },
      {
        icon: "🌞",
        title: "Ánh sáng tự nhiên",
        desc: "Tối ưu hóa ánh sáng và thông gió"
      }
    ]
  },
  {
    id: 4,
    title: "Biệt thự Vinhomes Riverside",
    subtitle: "Sang trọng bên dòng sông Hồng",
    category: "villa",
    location: "Vinhomes Riverside, Hà Nội",
    area: "280m²",
    type: "Thiết kế nội thất cao cấp",
    year: 2024,
    client: "Gia đình anh K.",
    style: "Tân cổ điển",
    budget: "2.8 - 3.2 tỷ VNĐ",
    duration: "5 tháng",
    completion: "Đang thi công",
    image: "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729123/q8desgin/swk8aeej2re9mwknesqj.jpg",
    mainImage: "https://res.cloudinary.com/dwo0cghmc/image/upload/v1759729123/q8desgin/swk8aeej2re9mwknesqj.jpg",
    gallery: [
      "/images/q8design/project-villa-2.jpg",
      "/images/q8design/project-villa-3.jpg"
    ],
    description: "Biệt thự cao cấp với phong cách tân cổ điển, kết hợp giữa nét đẹp truyền thống và hiện đại.",
    tags: [
      "Tân cổ điển",
      "Cao cấp",
      "View sông"
    ],
    has3D: true,
    featured: true,
    slug: "biet-thu-vinhomes-riverside",
    overview: "Biệt thự Vinhomes Riverside được thiết kế theo phong cách tân cổ điển, kết hợp hài hòa giữa nét đẹp truyền thống và sự tiện nghi hiện đại, tạo nên một không gian sống đẳng cấp.",
    features: [
      {
        icon: "🏛️",
        title: "Tân cổ điển",
        desc: "Thiết kế kết hợp truyền thống và hiện đại"
      },
      {
        icon: "🌊",
        title: "View sông",
        desc: "Tầm nhìn tuyệt đẹp ra sông Hồng"
      },
      {
        icon: "💎",
        title: "Vật liệu cao cấp",
        desc: "Đá marble, gỗ tự nhiên nhập khẩu"
      },
      {
        icon: "🎨",
        title: "Nội thất bespoke",
        desc: "Nội thất được thiết kế riêng theo yêu cầu"
      }
    ]
  }
];

// Utility functions
const createSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    // Chuyển đổi ký tự tiếng Việt thành không dấu
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
    .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
    .replace(/[ìíịỉĩ]/g, 'i')
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
    .replace(/[ùúụủũưừứựửữ]/g, 'u')
    .replace(/[ỳýỵỷỹ]/g, 'y')
    .replace(/đ/g, 'd')
    // Loại bỏ ký tự đặc biệt, chỉ giữ chữ cái, số, khoảng trắng và dấu gạch ngang
    .replace(/[^a-z0-9\s-]/g, '')
    // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/\s+/g, '-')
    // Loại bỏ dấu gạch ngang trùng lặp
    .replace(/-+/g, '-')
    // Loại bỏ dấu gạch ngang ở đầu và cuối
    .replace(/^-|-$/g, '');
};

const getProjectById = (id) => {
  return projects.find(project => project.id === parseInt(id));
};

const getProjectBySlug = (slug) => {
  return projects.find(project => project.slug === slug);
};

const getProjectsByCategory = (category) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

const searchProjects = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(term) ||
    project.location.toLowerCase().includes(term) ||
    project.tags.some(tag => tag.toLowerCase().includes(term)) ||
    project.description.toLowerCase().includes(term)
  );
};

// Function to count projects by category
const getProjectCountByCategory = (categoryId) => {
  if (categoryId === "all") {
    return projects.length;
  }
  return projects.filter(project => project.category === categoryId).length;
};

// Dynamic filter categories with real counts
const filterCategories = [
  { id: "all", name: "Công trình thực tế", count: 0, color: "gray" },
  { id: "villa", name: "Biệt thự - vila", count: 0, color: "blue" },
  { id: "townhouse", name: "Nhà phố", count: 0, color: "purple" },
  { id: "apartment", name: "Căn hộ", count: 0, color: "green" },
  { id: "commercial", name: "Văn phòng", count: 0, color: "orange" }
].map(category => ({
  ...category,
  count: getProjectCountByCategory(category.id)
}));

// Export for CommonJS
module.exports = {
  projects,
  createSlug,
  getProjectById,
  getProjectBySlug,
  getProjectsByCategory,
  getFeaturedProjects,
  searchProjects,
  filterCategories
};
