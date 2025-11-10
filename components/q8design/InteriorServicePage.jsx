import Image from "next/image";
import Link from "next/link";
import { 
  FaCouch, 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaHome,
  FaBuilding,
  FaStore,
  FaBriefcase,
  FaCoffee
} from "react-icons/fa";

export default function InteriorServicePage() {
  const serviceDetails = [
    {
      icon: FaHome,
      title: "Thiết kế nội thất nhà phố",
      description: "Tối ưu hóa không gian sống cho nhà phố 3-5 tầng, kết hợp công năng và thẩm mỹ hiện đại.",
      features: [
        "Tối ưu không gian theo chiều dọc",
        "Phòng khách, bếp, phòng ngủ đầy đủ",
        "Nội thất gỗ công nghiệp cao cấp",
        "Phong cách hiện đại, tối giản"
      ]
    },
    {
      icon: FaBuilding,
      title: "Thiết kế nội thất chung cư",
      description: "Giải pháp thông minh cho căn hộ chung cư, tối ưu diện tích và ánh sáng tự nhiên.",
      features: [
        "Tủ âm tường tiết kiệm không gian",
        "Nội thất đa năng",
        "Màu sắc sáng, thoáng đãng",
        "Phù hợp căn hộ 60-120m²"
      ]
    },
    {
      icon: FaHome,
      title: "Thiết kế nội thất biệt thự",
      description: "Thiết kế nội thất đẳng cấp cho không gian sống rộng lớn, thể hiện phong cách riêng.",
      features: [
        "Nội thất cao cấp, sang trọng",
        "Phong cách đa dạng (cổ điển, hiện đại)",
        "Kết hợp smarthome",
        "Thiết kế theo yêu cầu riêng"
      ]
    },
    {
      icon: FaStore,
      title: "Thiết kế nội thất cửa hàng",
      description: "Không gian thương mại chuyên nghiệp, thu hút khách hàng và tối ưu trải nghiệm mua sắm.",
      features: [
        "Thiết kế showroom, cửa hàng",
        "Kệ trưng bày tối ưu",
        "Ánh sáng chuyên nghiệp",
        "Phù hợp với thương hiệu"
      ]
    },
    {
      icon: FaBriefcase,
      title: "Thiết kế nội thất văn phòng",
      description: "Môi trường làm việc hiệu quả, chuyên nghiệp và sáng tạo cho doanh nghiệp.",
      features: [
        "Bàn làm việc, phòng họp",
        "Không gian mở hiện đại",
        "Khu vực nghỉ ngơi",
        "Hệ thống điện, mạng chuyên nghiệp"
      ]
    },
    {
      icon: FaCoffee,
      title: "Thiết kế F&B (Café, Nhà hàng)",
      description: "Thiết kế không gian ăn uống độc đáo, tạo ấn tượng và thu hút khách hàng.",
      features: [
        "Concept độc đáo, nổi bật",
        "Tối ưu động tuyến phục vụ",
        "Khu vực bếp chuyên nghiệp",
        "Không gian Instagram-able"
      ]
    }
  ];

  const designProcess = [
    {
      step: "01",
      title: "Khảo sát & Lắng nghe",
      description: "Khảo sát không gian thực tế, lắng nghe nhu cầu và sở thích của khách hàng."
    },
    {
      step: "02",
      title: "Concept & Phối cảnh 3D",
      description: "Đề xuất phong cách nội thất, bảng màu và phối cảnh 3D chân thực."
    },
    {
      step: "03",
      title: "Bản vẽ thi công",
      description: "Hoàn thiện bản vẽ nội thất chi tiết, bảng vật liệu và báo giá."
    },
    {
      step: "04",
      title: "Sản xuất & Thi công",
      description: "Sản xuất nội thất theo thiết kế, thi công lắp đặt tại công trình."
    },
    {
      step: "05",
      title: "Bàn giao & Bảo hành",
      description: "Nghiệm thu, bàn giao và bảo hành dài hạn cho toàn bộ hạng mục."
    }
  ];

  const interiorStyles = [
    {
      name: "Hiện đại tối giản",
      description: "Đơn giản, thoáng đãng, tập trung vào công năng",
      image: "/images/service-interior-2.webp"
    },
    {
      name: "Scandinavian",
      description: "Ánh sáng tự nhiên, màu sắc nhẹ nhàng, gỗ tự nhiên",
      image: "/images/service-interior.jpg"
    },
    {
      name: "Indochine",
      description: "Kết hợp Á - Âu, gỗ đậm, chi tiết thủ công",
      image: "/images/service-construction.jpg"
    }
  ];

  const benefits = [
    {
      icon: FaStar,
      title: "Thiết kế 3D chân thực",
      description: "Phối cảnh 3D giúp khách hàng hình dung chính xác trước khi thi công"
    },
    {
      icon: FaCheckCircle,
      title: "Nội thất cao cấp",
      description: "Sử dụng vật liệu nhập khẩu và sản xuất theo tiêu chuẩn cao"
    },
    {
      icon: FaClock,
      title: "Thi công nhanh chóng",
      description: "Quy trình sản xuất hiện đại, đảm bảo tiến độ"
    },
    {
      icon: FaShieldAlt,
      title: "Bảo hành 2 năm",
      description: "Bảo hành toàn bộ hạng mục nội thất trong 24 tháng"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[70vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/service-interior-2.webp"
            alt="Thiết kế Nội thất Q8 Design"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaCouch className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            Dịch vụ <span className="text-orange-400">Thiết kế Nội thất</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Biến không gian sống của bạn thành tác phẩm nghệ thuật với sự sáng tạo và tinh tế. 
            Thiết kế nội thất cao cấp, tối ưu công năng và thể hiện cá tính riêng.
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-300 group"
          >
            Nhận tư vấn miễn phí
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium uppercase tracking-wider">
              Dịch vụ chi tiết
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
              Các dịch vụ thiết kế nội thất
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Giải pháp thiết kế nội thất toàn diện cho mọi loại hình không gian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <FaCheckCircle className="text-orange-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interior Styles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Phong cách nội thất
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Đa dạng phong cách thiết kế phù hợp với mọi sở thích
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {interiorStyles.map((style, index) => (
              <div key={index} className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={style.image}
                    alt={style.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{style.name}</h3>
                    <p className="text-gray-200">{style.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quy trình thiết kế nội thất
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quy trình chuyên nghiệp, đảm bảo mỗi chi tiết hoàn hảo
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {designProcess.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn Q8 Design?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-2xl text-orange-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bạn muốn thiết kế nội thất cho không gian của mình?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Liên hệ ngay để nhận thiết kế 3D miễn phí và báo giá chi tiết.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                Nhận thiết kế 3D miễn phí
                <FaArrowRight className="ml-3" />
              </Link>
              <Link
                href="/dich-vu"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Xem các dịch vụ khác
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

