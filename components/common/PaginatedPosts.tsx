import React, { FC, useState } from "react";
import { PostDetail } from "../../utils/types";
import PostCard from "./PostCard";

interface Props {
  posts: PostDetail[]; // Danh sách bài viết
  postsPerPage: number; // Số bài viết mỗi trang
}

const PaginatedPosts: FC<Props> = ({ posts, postsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  console.log('🔍 PaginatedPosts received posts:', posts.length);
  console.log('🔍 PaginatedPosts posts sample:', posts[0]);
  
  // Debug: Check if posts have required fields
  if (posts.length > 0) {
    const samplePost = posts[0];
    console.log('🔍 Sample post fields:', {
      id: samplePost.id,
      title: samplePost.title,
      slug: samplePost.slug,
      category: samplePost.category,
      thumbnail: samplePost.thumbnail,
      meta: samplePost.meta,
      createdAt: samplePost.createdAt
    });
  }

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  console.log('🔍 Current posts to display:', currentPosts.length);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationControls = () => {
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return (
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border border-gray-300 rounded-lg font-medium transition-colors duration-200 ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed bg-gray-100" : "hover:bg-orange-50 hover:border-orange-300 text-gray-700"
          }`}
        >
          &lt;
        </button>
        {range.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                currentPage === page
                  ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                  : "hover:bg-orange-50 hover:border-orange-300 text-gray-700 border-gray-300"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-4 py-2 text-gray-400">
              {page}
            </span>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border border-gray-300 rounded-lg font-medium transition-colors duration-200 ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed bg-gray-100" : "hover:bg-orange-50 hover:border-orange-300 text-gray-700"
          }`}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {renderPaginationControls()}
    </div>
  );
};

export default PaginatedPosts;
