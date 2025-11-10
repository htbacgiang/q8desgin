import { useState, useEffect } from 'react';

export default function ImageLibraryModal({ 
  isOpen, 
  onClose, 
  onSelect,
  multiple = false 
}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/image');
      if (!response.ok) {
        throw new Error('Không thể tải danh sách ảnh');
      }
      const data = await response.json();
      setImages(data.images || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    if (multiple) {
      const isSelected = selectedImages.find(img => img.id === image.id);
      if (isSelected) {
        setSelectedImages(selectedImages.filter(img => img.id !== image.id));
      } else {
        setSelectedImages([...selectedImages, image]);
      }
    } else {
      setSelectedImages([image]);
    }
  };

  const handleConfirm = () => {
    if (selectedImages.length === 0) {
      alert('Vui lòng chọn ít nhất một ảnh');
      return;
    }

    if (multiple) {
      onSelect(selectedImages.map(img => img.src));
    } else {
      onSelect(selectedImages[0].src);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setSelectedImages([]);
    setSearchTerm('');
    onClose();
  };

  const filteredImages = images.filter(img => 
    img.src.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (img.altText && img.altText.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal - Positioned to the right, avoiding sidebar */}
      <div className="flex min-h-screen items-start justify-end p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[85vh] overflow-hidden transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                📚 Thư viện ảnh
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                {multiple 
                  ? `Đã chọn ${selectedImages.length} ảnh` 
                  : 'Chọn một ảnh từ thư viện'}
              </p>
            </div>
            
            {/* Search */}
            <div className="flex-1 mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Tìm kiếm ảnh..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchImages}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Thử lại
                </button>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-gray-600">
                  {searchTerm ? 'Không tìm thấy ảnh phù hợp' : 'Chưa có ảnh nào trong thư viện'}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-4 text-blue-600 hover:text-blue-700"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Hiển thị {filteredImages.length} / {images.length} ảnh
                  </p>
                  {selectedImages.length > 0 && multiple && (
                    <button
                      onClick={() => setSelectedImages([])}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Bỏ chọn tất cả
                    </button>
                  )}
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                  {filteredImages.map((image) => {
                    const isSelected = selectedImages.find(img => img.id === image.id);
                    return (
                      <div
                        key={image.id}
                        onClick={() => handleImageClick(image)}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                          isSelected 
                            ? 'ring-4 ring-blue-500 scale-95' 
                            : 'hover:ring-2 hover:ring-gray-300 hover:scale-95'
                        }`}
                      >
                        <img
                          src={image.src}
                          alt={image.altText || 'Image'}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay */}
                        <div className={`absolute inset-0 transition-opacity ${
                          isSelected ? 'bg-blue-500 bg-opacity-30' : 'bg-black bg-opacity-0 hover:bg-opacity-20'
                        }`} />

                        {/* Checkmark */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}

                        {/* Alt Text */}
                        {image.altText && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-2 truncate">
                            {image.altText}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t sticky bottom-0 bg-white">
            <div className="text-sm text-gray-600">
              {multiple && selectedImages.length > 0 && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Đã chọn {selectedImages.length} ảnh
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirm}
                disabled={selectedImages.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none text-sm"
              >
                {multiple ? `Chọn ${selectedImages.length} ảnh` : 'Chọn ảnh'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

