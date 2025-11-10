import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function Banner() {
  // State to track the current slide
  const [currentSlide, setCurrentSlide] = useState(0);
  // State to control form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);
  // State to pause auto-slide
  const [isPaused, setIsPaused] = useState(false);
  // Ref for modal focus trapping
  const modalRef = useRef(null);

  // Array of slides
  const slides = [
    {
      image: "/images/banner4.webp",
      smallHeading: "GREENLAHOME",
      heading: "Thiết kế hiện đại, tối ưu không gian sống",
      description:
        "Chúng tôi cung cấp giải pháp thiết kế và thi công nội thất chuyên nghiệp, tối ưu không gian sống cho mọi gia đình.",
    },
    {
      image: "/images/banner5.webp",
      smallHeading: "GREENLAHOME",
      heading: "Giải pháp thiết kế toàn diện cho căn hộ hiện đại.",
      description:
        "Chúng tôi mang đến thiết kế và thi công nội thất chuyên nghiệp, phù hợp với mọi căn hộ hiện đại.",
    },
    {
      image: "/images/banner6.webp",
      smallHeading: "GREENLAHOME",
      heading: "Nội thất hiện đại, chất lượng bền vững",
      description:
        "Chúng tôi cung cấp dịch vụ thiết kế và thi công nội thất hiện đại, đảm bảo chất lượng và phong cách sống lâu dài.",
    },
  ];

  // Auto-run functionality
  useEffect(() => {
    if (isPaused || isFormOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isPaused, isFormOpen]);

  // Memoized navigation functions
  const goToPreviousSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  }, [slides.length]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Toggle form visibility
  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  // Keyboard navigation for slides
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFormOpen) return; // Disable slide navigation when form is open
      if (e.key === "ArrowLeft") goToPreviousSlide();
      if (e.key === "ArrowRight") goToNextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide, isFormOpen]);

  // Close form with Escape key and focus trapping
  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    // Focus trapping
    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    firstElement?.focus();
    modal.addEventListener("keydown", handleTab);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen, toggleForm]);

  return (
    <section
      className="relative h-screen"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slides[currentSlide].image}
          alt={`Slide ${currentSlide + 1}: ${slides[currentSlide].smallHeading}`}
          layout="fill"
          quality={100}
          objectFit="cover"
          className="brightness-90 transition-opacity duration-1000"
          priority={currentSlide === 0} // Preload first slide
          onError={(e) => (e.target.src = "/images/fallback.png")} // Fallback image
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <p className="text-green-500 text-3xl font-bold uppercase tracking-widest mb-2">
          {slides[currentSlide].smallHeading}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          {slides[currentSlide].heading}
        </h2>
        <p className="text-gray-300 text-sm md:text-lg max-w-5xl mx-auto mb-6">
          {slides[currentSlide].description}
        </p>
        <button
          className="flex items-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          onClick={toggleForm}
          aria-label="Open registration form"
        >
          Tìm hiểu ngay
          <FaArrowRight className="ml-2" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 flex items-center z-10">
        <button
          onClick={goToPreviousSlide}
          aria-label="Previous slide"
          className="focus:outline-none"
        >
          <FaArrowLeft className="text-white text-2xl cursor-pointer hover:text-orange-500" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-4 flex items-center z-10">
        <button
          onClick={goToNextSlide}
          aria-label="Next slide"
          className="focus:outline-none"
        >
          <FaArrowRight className="text-white text-2xl cursor-pointer hover:text-orange-500" />
        </button>
      </div>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-orange-500" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Registration Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleForm();
          }}
        >
          <div
            ref={modalRef}
            className="rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl relative bg-white"
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleForm}
              aria-label="Close form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
    </section>
  );
}