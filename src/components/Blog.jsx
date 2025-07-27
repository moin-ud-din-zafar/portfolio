// src/components/Blog.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import api from '../api/portfolioApi'   // your read‑only API wrapper

export default function Blog() {
  const [posts, setPosts]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Fetch posts on mount
  useEffect(() => {
    api.getAllBlogs()
      .then(postsArray => {
        setPosts(Array.isArray(postsArray) ? postsArray : [])
      })
      .catch(err => {
        console.error('Failed to fetch blogs:', err)
        setError(err.message || 'Unknown error')
      })
      .finally(() => setLoading(false))
  }, [])

  // Animate elements as they enter viewport
  useEffect(() => {
    if (loading) return;
    const elems = document.querySelectorAll('#blog .child');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    elems.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  // Loading, error, empty states
  if (loading) {
    return (
      <section id="blog" className="snap-start py-24 bg-secondary/5">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading posts…</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="blog" className="snap-start py-24 bg-secondary/5">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="snap-start py-24 bg-secondary/5">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-500">No posts found.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="blog" className="snap-start py-24 bg-secondary/5 scroll-snap-section">
      {/* Animation Styles */}
      <style>{`
        .child {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .child.animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 child">
          <h2 className="text-4xl font-bold mb-2">
            Latest <span className="text-indigo-500">Blog Posts</span>
          </h2>
          <div className="w-24 h-1 bg-indigo-500 rounded-full mx-auto mb-4" />
          <p className="text-lg text-gray-600">
            Thoughts, tutorials, and insights on modern web development
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <article
              key={post._id}
              className="child group bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition flex flex-col"
            >
              {/* Image + readTime badge */}
              <div className="relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 left-3 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded">
                  {post.readTime}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-4 flex-1 flex flex-col">
                <div className="text-sm text-gray-500">
                  {new Date(post.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(post.tags || []).map(tag => (
                    <span
                      key={tag}
                      className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <Link
                  to={`/blog/${post._id}`}
                  className="text-indigo-600 font-medium text-sm hover:underline"
                >
                  Read More →
                </Link>
                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <div className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{post.likes || 0}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{post.comments || 0}</span>
                  </div>
                  <button className="hover:text-gray-700 transition">
                    <span>🔗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12 child">
          <Link
            to="/blog-list"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:opacity-90 transition"
          >
            View More Posts <FaEye />
          </Link>
        </div>
      </div>
    </section>
  )
}
