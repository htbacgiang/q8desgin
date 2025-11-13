import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight, FaHome, FaTools, FaUserTie } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function HeroSection() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slide data
  const slides = [
    {
      id: 1,
      title: "Thiết kế nội thất cao cấp",
      subtitle: "Biệt thự & chung cư cao cấp",
      description: "Kiến tạo không gian sống sang trọng với thiết kế hiện đại, tận dụng tối đa ánh sáng và view đẹp",
      icon: FaHome,
      image: "/images/banner-q8-01.webp",
      features: ["Thiết kế 3D chuyên nghiệp", "Nội thất nhập khẩu cao cấp", "Tối ưu không gian sống"],
      cta: "Xem dự án",
      link: "/du-an"
    },
    {
      id: 2,
      title: "Thi công trọn gói",
      subtitle: "Cải tạo & Xây dựng hoàn thiện",
      description: "Dịch vụ thi công trọn gói từ A-Z, đảm bảo chất lượng và tiến độ, mang đến không gian sống hoàn hảo",
      icon: FaTools,
      image: "/images/banner-q8-02.webp",
      features: ["Thi công chuyên nghiệp", "Vật liệu chất lượng cao", "Bảo hành dài hạn"],
      cta: "Tìm hiểu dịch vụ",
      link: "/dich-vu"
    },
    {
      id: 3,
      title: "Tư vấn chuyên nghiệp",
      subtitle: "Hỗ trợ khách hàng 24/7",
      description: "Đội ngũ kiến trúc sư giàu kinh nghiệm tư vấn miễn phí, hỗ trợ khách hàng từ ý tưởng đến hoàn thiện",
      icon: FaUserTie,
      image: "/images/banner-q8-03.webp",
      features: ["Tư vấn miễn phí", "Đội ngũ chuyên nghiệp", "Hỗ trợ 24/7"],
      cta: "Đặt lịch tư vấn",
      link: null // No link, opens form instead
    }
  ];

  // Auto-play slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle CTA button click
  const handleCTAClick = (slide) => {
    if (slide.link) {
      router.push(slide.link);
    } else {
      toggleForm();
    }
  };

  // Toggle form visibility
  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  // Close form with Escape key
  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFormOpen, toggleForm]);

  return (
    <>
    <div>
      <section className="q8-hero-section relative aspect-[8/6] max-h-[80vh] sm:aspect-[8/6] sm:max-h-[80vh] md:aspect-auto md:h-screen md:min-h-[80vh] md:max-h-none w-full overflow-hidden">
        {/* Slider Container */}
        <div className="relative w-full h-full">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 ">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-contain md:object-cover"
                quality={100}
                sizes="100vw"
              />
            </div>

            {/* Content - Desktop: inside image, Mobile: hidden */}
            <div className="hidden md:flex relative z-10 w-full px-4 md:px-6 lg:px-8 xl:px-12 h-full items-center justify-center md:items-end md:justify-start pb-0 md:pb-8">
              <div className="max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl text-white/90 text-center md:text-left w-full md:w-auto md:mr-0 md:ml-0">
                {/* Service Icon */}
                {/* Main Heading - Smaller text */}
                <div className="text-[0.95rem] sm:text-xl md:text-3xl lg:text-4xl font-bold text-white/90 leading-tight md:text-left">
                  <span 
                    className="uppercase inline-block md:inline-block"
                    style={{
                      WebkitTextStroke: '1.5px rgba(0, 0, 0, 0.7)',
                      paintOrder: 'stroke fill',
                      opacity: 0.95
                    }}
                  >
                    <span className="inline">Q8 Design</span>
                    <span className="inline ml-1 md:ml-2">{slide.title}</span>
                  </span>
                  <span 
                    className="block md:mt-2 mt-1  text-white/90 text-xs sm:text-base md:text-2xl mb-1 md:mb-2 lg:text-3xl md:text-left"
                    style={{
                      WebkitTextStroke: '1px rgba(0, 0, 0, 0.7)',
                      paintOrder: 'stroke fill',
                      opacity: 0.95
                    }}
                  >
                    {slide.subtitle}
                  </span>
                </div>

                {/* CTA Buttons - Smaller on mobile */}
                <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4 mb-0 md:mb-6 justify-center items-center md:items-start md:justify-start">
                  <button
                    onClick={() => handleCTAClick(slide)}
                    className="group inline-flex items-center justify-center px-3 py-2 sm:px-4 md:px-6 sm:py-3 md:py-4 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg border border-q8-primary-600/20 w-fit text-xs sm:text-sm md:text-base"
                  >
                    <span>{slide.cta}</span>
                    <FaArrowRight className="ml-1 sm:ml-2 transition-transform group-hover:translate-x-1 text-xs sm:text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide trước"
        >
          <FaChevronLeft className="text-sm sm:text-base md:text-lg" />
        </button>
        
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-black/50 text-white rounded-full items-center justify-center transition-all duration-300 backdrop-blur-sm"
          aria-label="Slide tiếp theo"
        >
          <FaChevronRight className="text-sm sm:text-base md:text-lg" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-q8-primary-50 scale-125'
                  : 'bg-q8-primary-500/50 hover:bg-q8-primary-600/70'
              }`}
              aria-label={`Chuyển đến slide ${index + 1}`}
            />
          ))}
        </div>
        </div>
      </section>

      {/* Mobile Content - Below image */}
      <div className="md:hidden w-full px-4 pt-3 bg-q8-primary-50 relative overflow-hidden">
        {/* Background Pattern - same as AboutSection */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23121212' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Gradient Overlay - same as AboutSection */}
        <div className="absolute inset-0 bg-gradient-to-br from-q8-primary-50/50 via-transparent to-q8-primary-100/30"></div>
        
        <div className="relative z-10">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-500 ${
                index === currentSlide ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            >
              {/* Main Heading */}
              <div className="text-xl font-bold text-gray-900 leading-tight text-center mb-2">
                <span className="uppercase">
                  <span className="inline">Q8 Design</span>
                  <span className="inline ml-1">{slide.title}</span>
                </span>
                <span className="block mt-1 text-gray-700 text-base">
                  {slide.subtitle}
                </span>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => handleCTAClick(slide)}
                  className="group inline-flex items-center justify-center px-6 py-3 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105  border border-q8-primary-600/20 w-fit text-sm"
                >
                  <span>{slide.cta}</span>
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1 text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Registration Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleForm();
          }}
        >
          <div className="relative bg-white rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              onClick={toggleForm}
              aria-label="Đóng form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Registration Form */}
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}
