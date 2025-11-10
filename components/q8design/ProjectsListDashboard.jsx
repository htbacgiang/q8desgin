import { useState } from 'react';
import Image from 'next/image';
import ConfirmDialog from './ConfirmDialog';

export default function ProjectsListDashboard({ projects: initialProjects, onEdit, onDelete }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, project: null });

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categoryColors = {
    villa: 'bg-blue-100 text-blue-800',
    apartment: 'bg-green-100 text-green-800',
    townhouse: 'bg-purple-100 text-purple-800',
    commercial: 'bg-orange-100 text-orange-800'
  };

  const categoryNames = {
    villa: 'Biệt thự - vila',
    apartment: 'Căn hộ',
    townhouse: 'Nhà phố',
    commercial: 'Văn phòng'
  };

  const handleDeleteClick = (project) => {
    setDeleteConfirm({ isOpen: true, project });
  };

  const handleDeleteConfirm = async () => {
    const { project } = deleteConfirm;
    if (!project) return;

    try {
      if (onDelete) {
        await onDelete(project);
        setProjects(projects.filter(p => p.id !== project.id));
     
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Danh sách dự án</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Công trình thực tế ({projects.length})</option>
            <option value="villa">Biệt thự - vila ({projects.filter(p => p.category === 'villa').length})</option>
            <option value="townhouse">Nhà phố ({projects.filter(p => p.category === 'townhouse').length})</option>
            <option value="apartment">Căn hộ ({projects.filter(p => p.category === 'apartment').length})</option>
            <option value="commercial">Văn phòng ({projects.filter(p => p.category === 'commercial').length})</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          Hiển thị {filteredProjects.length} / {projects.length} dự án
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          // Debug log
          console.log('Project:', project.title, 'Gallery:', project.gallery);
          return (
          <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Project Image */}
            <div className="relative h-48 bg-gray-200">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/q8design/placeholder.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${categoryColors[project.category]}`}>
                  {categoryNames[project.category]}
                </span>
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
                    ⭐ Nổi bật
                  </span>
                )}
              </div>
            </div>


            {/* Project Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                {project.subtitle}
              </p>
              
              <div className="space-y-1 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📍</span>
                  <span className="line-clamp-1">{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📐</span>
                  <span>{project.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">📅</span>
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">✅</span>
                  <span>{project.completion}</span>
                </div>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t">
                <button
                  onClick={() => window.open(`/du-an/${project.slug}`, '_blank')}
                  className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded hover:bg-blue-100 transition-colors"
                >
                  👁️ Xem
                </button>
                <button
                  onClick={() => onEdit && onEdit(project)}
                  className="flex-1 px-3 py-2 bg-green-50 text-green-600 text-sm font-medium rounded hover:bg-green-100 transition-colors"
                >
                  ✏️ Sửa
                </button>
                <button
                  onClick={() => handleDeleteClick(project)}
                  className="flex-1 px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded hover:bg-red-100 transition-colors"
                >
                  🗑️ Xóa
                </button>
              </div>
            </div>
          </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📁</div>
          <p className="text-lg font-medium">Không tìm thấy dự án nào</p>
          <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, project: null })}
        onConfirm={handleDeleteConfirm}
        title="Xóa dự án"
        message={deleteConfirm.project ? `Bạn có chắc chắn muốn xóa dự án "${deleteConfirm.project.title}"? Hành động này không thể hoàn tác.` : ''}
        confirmText="Xóa dự án"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  );
}

