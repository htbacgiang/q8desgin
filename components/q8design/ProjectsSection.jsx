"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import SafeImage from "../common/SafeImage";
import Link from "next/link";
import { FaArrowRight, FaPlay, FaCube, FaMapMarkerAlt, FaRuler, FaCog, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useProjects } from "../../hooks/useProjects";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [displayProjects, setDisplayProjects] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  
  // Fetch featured projects using the same hook as ProjectsPage
  const { 
    projects: featuredProjects = [], 
    loading: featuredLoading, 
    error: featuredError 
  } = useProjects({
    featured: true,
    limit: 50,
    page: 1,
    sort: 'createdAt',
    order: 'desc'
  });

  // Fetch all projects as fallback
  const { 
    projects: allProjectsFallback = [], 
    loading: fallbackLoading, 
    error: fallbackError,
    pagination: fallbackPagination,
    categoryCounts: apiCategoryCounts,
    completionCounts: apiCompletionCounts
  } = useProjects({
    featured: false,
    limit: 50,
    page: 1,
    sort: 'createdAt',
    order: 'desc'
  });

  // Keep legacy state update (no harm), but source for rendering will prefer full dataset
  useEffect(() => {
    if (!featuredLoading && featuredProjects.length > 0) {
      setDisplayProjects(featuredProjects);
    } 
    if (!fallbackLoading && allProjectsFallback.length > 0) {
      setDisplayProjects(allProjectsFallback);
    }
  }, [featuredProjects, allProjectsFallback, featuredLoading, fallbackLoading]);

  // Source for rendering: prefer full dataset from API over featured
  const projectsForView = useMemo(() => {
    if (!fallbackLoading && allProjectsFallback && allProjectsFallback.length > 0) {
      return allProjectsFallback;
    }
    return featuredProjects || [];
  }, [allProjectsFallback, featuredProjects, fallbackLoading]);

  const allProjects = projectsForView;
  const loading = featuredLoading || (featuredProjects.length === 0 && fallbackLoading);
  const error = featuredError || (featuredProjects.length === 0 && fallbackError);

  // Build counts from API response when available
  const countsFromApi = useMemo(() => {
    const mapCategoryCounts = {};
    if (apiCategoryCounts && Array.isArray(apiCategoryCounts)) {
      apiCategoryCounts.forEach(item => {
        if (item && item._id) {
          mapCategoryCounts[item._id] = item.count || 0;
        }
      });
    }
    const mapCompletionCounts = {};
    if (apiCompletionCounts && Array.isArray(apiCompletionCounts)) {
      apiCompletionCounts.forEach(item => {
        if (item && item._id) {
          mapCompletionCounts[item._id] = item.count || 0;
        }
      });
    }
    const totalAll = fallbackPagination?.count ?? (allProjectsFallback?.length || 0);
    return { category: mapCategoryCounts, completion: mapCompletionCounts, totalAll };
  }, [apiCategoryCounts, apiCompletionCounts, fallbackPagination, allProjectsFallback]);

  // Create filter categories from API data
  const filterCategories = [
    { id: "all", name: "Tất cả dự án", count: countsFromApi.totalAll, color: "gray" },
    { id: "apartment", name: "Căn hộ", count: countsFromApi.category['apartment'] || 0, color: "green" },
    { id: "townhouse", name: "Nhà phố", count: countsFromApi.category['townhouse'] || 0, color: "purple" },
    { id: "villa", name: "Biệt thự - vila", count: countsFromApi.category['villa'] || 0, color: "blue" },
    { id: "office", name: "Văn phòng", count: countsFromApi.category['office'] || 0, color: "orange" }
  ];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter(project =>
      project.category &&
      project.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, allProjects]);

  const displayProjectsList = filteredProjects.slice(0, 6);

  // Reset slide when filter changes
  useEffect(() => {
    setCurrentSlide(0);
    setIsPaused(false); // Resume auto slide when filter changes
    // Clear any pending pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, [activeFilter]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Auto slide every 5 seconds on mobile
  useEffect(() => {
    if (displayProjectsList.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => {
          if (prev < displayProjectsList.length - 1) {
            return prev + 1;
          } else {
            return 0; // Loop back to first slide
          }
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [displayProjectsList.length, isPaused]);

  // Handle swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
    pauseAutoSlide(); // Pause auto slide when user touches
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Helper function to pause and resume auto slide
  const pauseAutoSlide = () => {
    setIsPaused(true);
    // Clear existing timeout if any
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    // Resume after 8 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      pauseTimeoutRef.current = null;
    }, 8000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    pauseAutoSlide(); // Pause auto slide when user manually navigates
  };

  const nextSlide = () => {
    if (currentSlide < displayProjectsList.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0); // Loop back to first
    }
    pauseAutoSlide(); // Pause auto slide when user manually navigates
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(displayProjectsList.length - 1); // Loop to last
    }
    pauseAutoSlide(); // Pause auto slide when user manually navigates
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < displayProjectsList.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (isLeftSwipe) {
      setCurrentSlide(0); // Loop to first
    }
    
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (isRightSwipe) {
      setCurrentSlide(displayProjectsList.length - 1); // Loop to last
    }
    
    pauseAutoSlide(); // Pause auto slide when user swipes
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="py-10 bg-q8-primary-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="inline-block mb-0">
            <h2 className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-base font-medium uppercase tracking-wider">
              Dự án đã hoàn thành
            </h2>
          </div>
          
          <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto leading-relaxed">
            Khám phá gallery gồm những dự án tiêu biểu nhất của Q8 Design. 
            Mỗi dự án là một câu chuyện thiết kế độc đáo, phản ánh dấu ấn cá nhân và phong cách sống của gia chủ.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-q8-primary-900 to-q8-primary-700 text-white shadow-lg transform scale-105'
                  : 'bg-gradient-to-r from-q8-primary-100 to-q8-primary-200 text-q8-primary-600 hover:from-q8-primary-200 hover:to-q8-primary-300 hover:text-q8-primary-800 shadow-sm'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-q8-primary-900"></div>
            <p className="mt-4 text-q8-primary-600">Đang tải dự án...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Featured Projects - Carousel on mobile, Grid on desktop */}
        {!loading && !error && displayProjectsList.length > 0 && (
          <>
            {/* Mobile Carousel */}
            <div 
              className="md:hidden relative mb-8 overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              ref={carouselRef}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {displayProjectsList.map((project, index) => (
                  <div key={project._id || project.id} className="w-full flex-shrink-0 px-1">
                    <Link 
                      href={`/du-an/${project.slug}`}
                      className="group block"
                    >
                      <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden shadow-lg cursor-pointer">
                          {/* Background Image */}
                          <div className="absolute inset-0">
                            <SafeImage
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              priority={index === 0}
                            />
                          </div>

                          {/* Overlay - appears on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all duration-500"></div>

                          {/* Category Badge - top left */}
                          <div className="absolute top-4 left-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                            <span className="px-4 py-1 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-sm font-medium shadow-lg">
                              {filterCategories.find(cat => cat.id === project.category)?.name || project.category}
                            </span>
                          </div>

                          {/* Center Content - appears on hover */}
                          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="text-center px-6 max-w-sm">
                              {/* Project Title */}
                              <h3 className="text-white font-bold text-xl mb-2 drop-shadow-2xl">
                                {project.title}
                              </h3>
                              
                              {/* Project Info */}
                              <div className="space-y-3">
                                <div className="flex flex-col items-center justify-center text-white/90 text-sm space-y-2">
                                  <span className="flex items-center">
                                    <FaMapMarkerAlt className="mr-2 text-q8-primary-400" />
                                    {project.location}
                                  </span>
                                  <span className="flex items-center">
                                    <FaRuler className="mr-2 text-q8-primary-400" />
                                    {project.area}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3D Badge - top right */}
                          {project.has3D && (
                            <div className="absolute top-4 right-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                <FaCube className="text-q8-primary-900 text-lg" />
                              </div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>

              {/* Navigation Arrows - Mobile */}
              {displayProjectsList.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                      currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Slide trước"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={currentSlide === displayProjectsList.length - 1}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-30 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                      currentSlide === displayProjectsList.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    aria-label="Slide tiếp theo"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}

              {/* Navigation Dots - Mobile */}
              {displayProjectsList.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {displayProjectsList.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? 'bg-q8-primary-900 w-6'
                          : 'bg-q8-primary-300 hover:bg-q8-primary-500'
                      }`}
                      aria-label={`Chuyển đến slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
                </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-3 mb-16">
              {displayProjectsList.map((project) => (
                <Link 
                  key={project._id || project.id} 
                  href={`/du-an/${project.slug}`}
                  className="group block"
                >
                  <div className="relative w-full aspect-[5/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <SafeImage
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={false}
                      />
                    </div>

                    {/* Overlay - appears on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/80 group-hover:via-black/70 group-hover:to-black/80 transition-all duration-500"></div>

                    {/* Category Badge - top left */}
                    <div className="absolute top-4 left-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full text-sm font-semibold shadow-lg">
                        {filterCategories.find(cat => cat.id === project.category)?.name || project.category}
                      </span>
                    </div>

                    {/* Center Content - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="text-center px-6 max-w-sm">
                        {/* Project Title */}
                        <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-2xl">
                          {project.title}
                        </h3>
                        
                        {/* Project Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-center text-white/90 text-sm space-x-4">
                            <span className="flex items-center">
                              <FaMapMarkerAlt className="mr-2 text-q8-primary-400" />
                              {project.location}
                            </span>
                            <span className="flex items-center">
                              <FaRuler className="mr-2 text-q8-primary-400" />
                              {project.area}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3D Badge - top right */}
                    {project.has3D && (
                      <div className="absolute top-4 right-4 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <FaCube className="text-q8-primary-900 text-lg" />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* No Projects State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Không có dự án nào được tìm thấy.</p>
            <Link 
              href="/du-an"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              Xem tất cả dự án
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
      
          <Link 
            href="/du-an"
            className="inline-flex items-center px-8 py-2 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-colors duration-300 group"
          >
            Khám phá thêm dự án
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
