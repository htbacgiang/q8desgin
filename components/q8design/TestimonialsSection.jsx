import { useState } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Gia đình anh Nam",
      role: "Biệt thự Bắc Ninh",
      location: "Hà Nội",
      image: "/images/khach-hang/gia-dinh-anh-nam.webp",
      videoThumbnail: "/images/khach-hang/gia-dinh-anh-nam.webp",
      hasVideo: true,
      rating: 5,
      content: "Chúng tôi chọn gói Thiết kế & Thi công trọn gói vì muốn sự đồng bộ. Q8 Design đã không làm chúng tôi thất vọng. Mọi chi tiết từ bản vẽ đến thực tế đều hoàn hảo, và điều quan trọng nhất là sự minh bạch về chi phí và tiến độ. Đây là một dịch vụ đáng giá cho những người bận rộn như chúng tôi.",
      year: "2024"
    },
    {
      id: 2,
      name: "Anh Minh Tuấn",
      role: "Chủ nhân căn hộ 90 Nguyễn Tuân", 
      location: "Hà Nội",
      image: "/images/banner2.jpg",
      videoThumbnail: "/images/khach-hang/anh-tuan-thanh-hoa.webp",
      hasVideo: true,
      rating: 5,
      content: "Vợ chồng tôi chọn Q8 Design vì sự chuyên nghiệp ngay từ khâu tư vấn. Căn hộ 110m² được thiết kế theo phong cách Tân cổ điển nhẹ nhàng, và điều khiến tôi hài lòng nhất là chất lượng thi công nội thất rất tỉ mỉ, từ vật liệu đến ánh sáng đều không khác gì bản vẽ 3D. Đầu tư xứng đáng!",
      year: "2024"
    },
    {
      id: 3,
      name: "Anh Hùng",
      role: "Chủ sở hữu căn hộ Times City",
      location: "Hà Nội", 
      image: "/images/khach-hang/anh-hung-ha-noi.webp",
      videoThumbnail: "/images/khach-hang/anh-hung-ha-noi.webp",
      hasVideo: false,
      rating: 5,
      content: "Dù diện tích chỉ 68m² nhưng Q8 Design đã mang đến một thiết kế Tối giản – Hiện đại đầy tinh tế, đúng chuẩn phong cách tôi mong muốn. Sự chuyên nghiệp thể hiện ở cách họ kiểm soát vật liệu và chất lượng thi công. Tôi hoàn toàn tin tưởng vào đội ngũ KTS của Q8 Design",
      year: "2023"
    },

  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium uppercase tracking-wider">
              Khách hàng nói về Q8 Design
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Cảm nhận từ khách hàng
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lắng nghe những chia sẻ chân thực từ các khách hàng đã tin tưởng 
            và đồng hành cùng Q8 Design trong hành trình kiến tạo không gian sống mơ ước.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left: Video/Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {currentData.hasVideo ? (
                  // Video Thumbnail with Play Button
                  <div className="relative group cursor-pointer">
                    <Image
                      src={currentData.videoThumbnail}
                      alt={`Video phỏng vấn ${currentData.name}`}
                      width={600}
                      height={400}
                      className="object-cover w-full h-96 transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Video Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                    
                  </div>
                ) : (
                  // Static Image
                  <Image
                    src={currentData.image}
                    alt={currentData.name}
                    width={600}
                    height={400}
                    className="object-cover w-full h-96"
                  />
                )}
              </div>
              
              {/* Quote Icon */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <FaQuoteLeft className="text-white text-xl" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              {/* Stars Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(currentData.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg md:text-xl leading-relaxed text-gray-700 italic">
                &ldquo;{currentData.content}&rdquo;
              </blockquote>

              {/* Client Info */}
              <div className="border-l-4 border-orange-500 pl-6">
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {currentData.name}
                </p>
                <p className="text-orange-600 font-medium mb-1">
                  {currentData.role}
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  {currentData.location} • {currentData.year}
                </p>
             
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-gray-100 hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? "bg-orange-500 w-8" 
                      : "bg-gray-300 hover:bg-orange-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-gray-100 hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">500+</div>
            <div className="text-gray-600">Dự án hoàn thành</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">100%</div>
            <div className="text-gray-600">Khách hàng hài lòng</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">10+</div>
            <div className="text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">24/7</div>
            <div className="text-gray-600">Hỗ trợ khách hàng</div>
          </div>
        </div>
    
      </div>
    </section>
  );
}
