import React from 'react';

const GallerySection = ({ 
  title = "Hình ảnh hoạt động tại Q8 Design",
  subtitle = "Khám phá những dự án thiết kế nội thất đẳng cấp và không gian sống hiện đại của Q8 Design",
  className = "",
  showTitle = true
}) => {
  // Sample gallery images - replace with actual images
  const galleryImages = [
    { id: 1, src: "/images/gallery/project-1.jpg", alt: "Dự án thiết kế nội thất 1" },
    { id: 2, src: "/images/gallery/project-2.jpg", alt: "Dự án thiết kế nội thất 2" },
    { id: 3, src: "/images/gallery/project-3.jpg", alt: "Dự án thiết kế nội thất 3" },
    { id: 4, src: "/images/gallery/project-4.jpg", alt: "Dự án thiết kế nội thất 4" },
    { id: 5, src: "/images/gallery/project-5.jpg", alt: "Dự án thiết kế nội thất 5" },
    { id: 6, src: "/images/gallery/project-6.jpg", alt: "Dự án thiết kế nội thất 6" },
  ];

  return (
    <section className={`py-16 ${className}`}>  
      {showTitle && (
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      )}
      
      {/* Simple Gallery Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium">
                    {image.alt}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
