'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('dashboard'); // dashboard | new | edit
  const [editProject, setEditProject] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: '',
    category: 'RTD Cocktails',
    description: '',
    client: '',
    featured: false,
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    'RTD Cocktails', 'Functional Beverages', 'Sodas & Seltzers',
    'Spirits & Liqueurs', 'CBD / THC Beverages', 'Clean Label',
    'Draft Systems', 'Other',
  ];

  const savedPassword = typeof window !== 'undefined' ? sessionStorage.getItem('admin_pw') : null;

  useEffect(() => {
    if (savedPassword) {
      setPassword(savedPassword);
      setLoggedIn(true);
      loadProjects(savedPassword);
    }
  }, []);

  const loadProjects = async (pw) => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Try to verify by making an authenticated request
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        setLoggedIn(true);
        sessionStorage.setItem('admin_pw', password);
        loadProjects(password);
      }
    } catch {
      setMessage({ type: 'error', text: 'Login failed' });
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return form.image;

    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${password}` },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        return data.url;
      } else {
        // If blob storage isn't set up, just use a placeholder
        console.warn('Image upload failed - using placeholder');
        return '/images/placeholder-project.jpg';
      }
    } catch {
      return '/images/placeholder-project.jpg';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      const projectData = {
        ...form,
        image: imageUrl,
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Project added successfully!' });
        setForm({ title: '', category: 'RTD Cocktails', description: '', client: '', featured: false, image: '' });
        setImageFile(null);
        setImagePreview(null);
        setView('dashboard');
        loadProjects(password);
      } else {
        setMessage({ type: 'error', text: 'Failed to save project' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error saving project' });
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${password}` },
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Project deleted' });
        loadProjects(password);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Delete failed' });
    }
  };

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <img src="/images/culture-cocktails-logo.png" alt="Culture Cocktails" style={{ height: 40, marginBottom: '1.5rem' }} />
          <h1>Admin Dashboard</h1>
          <p>Enter your password to manage your site</p>
          {message && (
            <div className={message.type === 'error' ? 'error-msg' : 'success-msg'}>
              {message.text}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-admin" style={{ width: '100%' }}>
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ADD PROJECT FORM
  if (view === 'new') {
    return (
      <div className="admin-layout">
        <div className="admin-header">
          <h1>Add New Project</h1>
          <a href="#" onClick={(e) => { e.preventDefault(); setView('dashboard'); }}>← Back</a>
        </div>
        <div className="admin-content">
          {message && (
            <div className={message.type === 'error' ? 'error-msg' : 'success-msg'}>
              {message.text}
            </div>
          )}
          <div className="admin-card">
            <form onSubmit={handleSubmit}>
              {/* Photo upload - the most important thing on mobile */}
              <div className="form-group">
                <label>Project Photo</label>
                <div
                  className={`upload-zone ${imagePreview ? 'has-image' : ''}`}
                  onClick={() => document.getElementById('photo-input').click()}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" />
                  ) : (
                    <>
                      <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>📸</div>
                      <p style={{ color: 'var(--gray-text)' }}>Tap to add a photo</p>
                    </>
                  )}
                </div>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="form-group">
                <label>Project Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Premium Craft Ginger Beer"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What did you develop? What was the challenge?"
                />
              </div>

              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="e.g., Patco Brands"
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    style={{ width: 'auto' }}
                  />
                  Feature on homepage
                </label>
              </div>

              <button type="submit" className="btn-admin" disabled={loading}>
                {loading ? 'Saving...' : '✓ Save Project'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h1>🍹 Culture Cocktails Admin</h1>
        <a href="/" target="_blank" rel="noopener">View Site →</a>
      </div>

      <div className="admin-content">
        {message && (
          <div className={message.type === 'error' ? 'error-msg' : 'success-msg'}>
            {message.text}
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-box">
            <div className="number">{projects.length}</div>
            <div className="label">Total Projects</div>
          </div>
          <div className="stat-box">
            <div className="number">{projects.filter(p => p.featured).length}</div>
            <div className="label">Featured</div>
          </div>
          <div className="stat-box">
            <div className="number">{[...new Set(projects.map(p => p.category))].length}</div>
            <div className="label">Categories</div>
          </div>
        </div>

        {/* Quick Action */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            className="btn-admin"
            onClick={() => { setView('new'); setMessage(null); }}
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
          >
            📸 Add New Project
          </button>
        </div>

        {/* Project List */}
        <div className="admin-card">
          <h2>Your Projects</h2>
          {projects.length === 0 ? (
            <p style={{ color: 'var(--gray-text)', textAlign: 'center', padding: '2rem 0' }}>
              No projects yet. Tap &ldquo;Add New Project&rdquo; to get started!
            </p>
          ) : (
            projects.map((project) => (
              <div className="project-list-item" key={project.id}>
                {project.image && project.image !== '/images/placeholder-project.jpg' && (
                  <img src={project.image} alt={project.title} />
                )}
                <div className="info">
                  <h3>{project.title}</h3>
                  <p>{project.category} {project.client ? `• ${project.client}` : ''}</p>
                </div>
                <div className="actions">
                  <button
                    className="btn-admin danger"
                    style={{ padding: '.4rem .75rem', fontSize: '.8rem' }}
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
