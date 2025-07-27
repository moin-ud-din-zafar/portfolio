// src/components/subcomponents/BlogPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/portfolioApi'  // <-- correct relative path

export default function BlogPage() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const [post, setPost]         = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    setLoading(true)
    api.getBlogById(id)
      .then(p => {
        setPost(p)             // p is the blog object itself
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to load post')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading post…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Post not found.</p>
      </div>
    )
  }

  const paragraphs = Array.isArray(post.content)
    ? post.content
    : String(post.content || '').split('\n\n')

  return (
    <div className="min-h-screen bg-white text-black py-12">
      <div className="container mx-auto px-6 lg:px-8 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline"
        >
          ← Back to Blog
        </button>
        <article className="space-y-6">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full max-h-96 object-cover rounded-lg shadow"
            />
          )}
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500">
            <span>
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <div className="prose prose-indigo max-w-none">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(post.tags) &&
              post.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
          </div>
        </article>
      </div>
    </div>
  )
}
