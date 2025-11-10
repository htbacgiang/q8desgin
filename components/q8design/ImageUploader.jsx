import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ImageLibraryModal from './ImageLibraryModal';

export default function ImageUploader({ 
  label, 
  multiple = false, 
  value = '', 
  onUpload,
  helperText = ''
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  
  // Update preview when value changes (for edit mode)
  useEffect(() => {
    setPreview(value);
  }, [value]);
  const [error, setError] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');
    setUploading(true);

    try {
      if (multiple) {
        // Upload nhiều ảnh
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('image', files[i]);
        }

        const response = await fetch('/api/image?multiple=true', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload thất bại');
        }

        const data = await response.json();
        onUpload(data.src); // data.src là array các URLs
      } else {
        // Upload một ảnh
        const formData = new FormData();
        formData.append('image', files[0]);
        formData.append('altText', label || '');

        const response = await fetch('/api/image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload thất bại');
        }

        const data = await response.json();
        setPreview(data.src);
        onUpload(data.src);
      }

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

  const handleRemove = () => {
    setPreview('');
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLibrarySelect = (url) => {
    setPreview(url);
    onUpload(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {helperText && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}

      {/* Preview */}
      {preview && !multiple && (
        <div className="space-y-2">
          <div className="relative w-32 h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-300 group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTE4NSAxMzVIMjE1VjE2NUgxODVWMTM1WiIgZmlsbD0iIzlDQTNBRiIvPgo8Y2lyY2xlIGN4PSIxNzAiIGN5PSIxNDAiIHI9IjMiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE3MCAxNDNMMTc1IDE0OEwyMDAgMTIzTDIxNSAxMzhMMjMwIDEyM0wyNDAgMTMzVjE2NUgyMTVMMjAwIDE1MEwxODUgMTY1SDE3MFYxNDNaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
              }}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors shadow-lg text-xs"
            >
              ✕
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1">
              <div className="flex items-center justify-center">
                <span className="text-green-400">✓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-input-${label}`}
        />
        
        <label
          htmlFor={`file-input-${label}`}
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
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                {multiple ? 'Chọn nhiều ảnh' : 'Upload ảnh mới'}
              </span>
            </>
          )}
        </label>

        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 border-2 border-green-300 hover:border-green-500 hover:bg-green-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className="text-sm font-medium text-green-700">Thư viện</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* File Info */}
      <p className="text-xs text-gray-500">
        💡 Upload ảnh mới hoặc chọn từ thư viện ảnh đã có
      </p>

      {/* Library Modal */}
      <ImageLibraryModal
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={handleLibrarySelect}
        multiple={false}
      />
    </div>
  );
}

