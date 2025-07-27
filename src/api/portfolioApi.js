// src/api/portfolioApi.js

import axios from 'axios';

// 1. Determine the API baseURL (from env or fallback to Vercel)
const baseURL =
  // CRA
  (typeof process !== 'undefined' &&
    process.env.REACT_APP_API_URL) ||
  // Vite
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  // fallback to production backend
  'https://portfolio-admin-backend-alpha.vercel.app/api';

// 2. Derive the “static files” root (e.g. https://portfolio-admin-backend-alpha.vercel.app)
const staticRoot = baseURL.replace(/\/api\/?$/, '');

// 3. Axios instance
const portfolioAPI = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// 4. Helper to fix up image URLs
function fixUrl(url) {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return staticRoot + url;
}

// 5. Exported read-only methods
export default {
  // — Blogs —
  async getAllBlogs() {
    const res = await portfolioAPI.get('/blogroutes');
    return res.data.map(b => ({
      ...b,
      imageUrl: fixUrl(b.imageUrl),
    }));
  },

  async getBlogById(id) {
    const res = await portfolioAPI.get(`/blogroutes/${id}`);
    return {
      ...res.data,
      imageUrl: fixUrl(res.data.imageUrl),
    };
  },

  // — Projects —
  async getAllProjects() {
    const res = await portfolioAPI.get('/projectroutes');
    return res.data.map(p => ({
      ...p,
      image: fixUrl(p.image),
    }));
  },

  async getProjectById(id) {
    const res = await portfolioAPI.get(`/projectroutes/${id}`);
    return {
      ...res.data,
      image: fixUrl(res.data.image),
    };
  },

  // — Messages (testimonials) —
  async getAllMessages() {
    const res = await portfolioAPI.get('/messageroutes');
    return res.data;
  },
};
