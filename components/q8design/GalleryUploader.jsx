import { useState, useRef, useEffect } from 'react';
import ImageLibraryModal from './ImageLibraryModal';

export default function GalleryUploader({ value = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [gallery, setGallery] = useState(value);
  const [error, setError] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const fileInputRef = useRef(null);

  // Sync gallery state with value prop
  useEffect(() => {
    setGallery(value);
  }, [value]);

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      
      // Append all files
      for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
      }

      const response = await fetch('/api/image?multiple=true', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload thất bại');
      }

      const data = await response.json();
      const newGallery = [...gallery, ...data.src];
      setGallery(newGallery);
      onChange(newGallery);

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi upload ảnh');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    onChange(newGallery);
  };

  const handleClear = () => {
    setGallery([]);
    onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLibrarySelect = (urls) => {
    const newGallery = [...gallery, ...urls];
    setGallery(newGallery);
    onChange(newGallery);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Gallery ({gallery.length} ảnh)
        </label>
        {gallery.length > 0 && (
          <div className="flex gap-2">
            <span className="text-xs text-gray-500">Hover vào ảnh để xóa bất kỳ ảnh nào</span>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-600 hover:text-red-700 font-medium"
            >
              🗑️ Xóa tất cả
            </button>
          </div>
        )}
      </div>

      {/* Gallery Grid */}
      {gallery.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {gallery.map((url, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTE4NSAxMzVIMjE1VjE2NUgxODVWMTM1WiIgZmlsbD0iIzlDQTNBRiIvPgo8Y2lyY2xlIGN4PSIxNzAiIGN5PSIxNDAiIHI9IjMiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE3MCAxNDNMMTc1IDE0OEwyMDAgMTIzTDIxNSAxMzhMMjMwIDEyM0wyNDAgMTMzVjE2NUgyMTVMMjAwIDE1MEwxODUgMTY1SDE3MFYxNDNaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-200 shadow-lg text-xs opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100"
                  title={`Xóa ảnh ${index + 1}`}
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-0.5 text-center">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          
          {/* Gallery Info */}
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <div className="flex items-center justify-between">
              <span>📸 {gallery.length} ảnh hiện tại</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="mt-1 text-xs text-blue-600">
              ➕ Ảnh mới sẽ được thêm vào cuối danh sách
            </div>
          </div>
        </div>
      )}

      {/* Upload Buttons */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="gallery-input"
        />
        
        <label
          htmlFor="gallery-input"
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
            uploading 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
        >
          {uploading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-gray-600">Đang upload...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Thêm ảnh mới
              </span>
            </>
          )}
        </label>

        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-50 border-2 border-green-300 hover:border-green-500 hover:bg-green-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-sm font-medium text-green-700">Thêm từ thư viện</span>
        </button>
      </div>

      {/* Helper Text */}
      {gallery.length > 0 && (
        <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
          💡 <strong>Mẹo:</strong> Ảnh mới sẽ được thêm vào cuối gallery hiện tại. Hover vào bất kỳ ảnh nào để xóa ảnh đó.
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded flex items-start gap-2">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Helper Text */}
      <p className="text-xs text-gray-500">
        💡 Upload ảnh mới hoặc chọn nhiều ảnh từ thư viện
      </p>

      {/* Library Modal */}
      <ImageLibraryModal
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={handleLibrarySelect}
        multiple={true}
      />
    </div>
  );
}

