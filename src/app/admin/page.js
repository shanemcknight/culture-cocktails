'use client';
import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'culturecocktails2026';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [newProject, setNewProject] = useState({
    title: '', description: '', client: '', category: 'Beverage Development',
    image: '', images: [], location: '', testimonial: '', testimonialAuthor: '',
    seoTitle: '', seoDescription: '', seoKeywords: '',
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [editImageUrl, setEditImageUrl] = useState('');

  const [siteSettings, setSiteSettings] = useState({
    stat1Number: '30+', stat1Label: 'Years Experience',
    stat2Number: '500+', stat2Label: 'Products Launched',
    stat3Number: '100+', stat3Label: 'Brand Partners',
    stat4Number: '50M+', stat4Label: 'Units Produced',
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('cc_admin') === 'true') {
        setIsLoggedIn(true);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (isLoggedIn) loadProjects();
  }, [isLoggedIn]);

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.log('Could not load projects');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
      try { sessionStorage.setItem('cc_admin', 'true'); } catch (e) {}
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    try { sessionStorage.removeItem('cc_admin'); } catch (e) {}
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Add image to new project
  const addImageToNew = () => {
    if (!newImageUrl.trim()) return;
    setNewProject({ ...newProject, images: [...newProject.images, newImageUrl.trim()] });
    setNewImageUrl('');
  };

  const removeImageFromNew = (index) => {
    setNewProject({ ...newProject, images: newProject.images.filter((_, i) => i !== index) });
  };

  const moveImageNew = (index, direction) => {
    const imgs = [...newProject.images];
    const swap = index + direction;
    if (swap < 0 || swap >= imgs.length) return;
    [imgs[index], imgs[swap]] = [imgs[swap], imgs[index]];
    setNewProject({ ...newProject, images: imgs });
  };

  // Add image to existing project (edit mode)
  const addImageToExisting = async (projectId) => {
    if (!editImageUrl.trim()) return;
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const updatedImages = [...(project.images || []), editImageUrl.trim()];
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
        body: JSON.stringify({ id: projectId, images: updatedImages, image: updatedImages[0] }),
      });
      if (res.ok) { showSuccess('Image added!'); setEditImageUrl(''); loadProjects(); }
    } catch (e) { setError('Failed to add image'); }
  };

  const removeImageFromExisting = async (projectId, index) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const updatedImages = (project.images || []).filter((_, i) => i !== index);
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
        body: JSON.stringify({ id: projectId, images: updatedImages, image: updatedImages[0] || '' }),
      });
      if (res.ok) { showSuccess('Image removed'); loadProjects(); }
    } catch (e) { setError('Failed to remove image'); }
  };

  const moveImageExisting = async (projectId, index, direction) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    const imgs = [...(project.images || [])];
    const swap = index + direction;
    if (swap < 0 || swap >= imgs.length) return;
    [imgs[index], imgs[swap]] = [imgs[swap], imgs[index]];
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
        body: JSON.stringify({ id: projectId, images: imgs, image: imgs[0] }),
      });
      if (res.ok) { loadProjects(); }
    } catch (e) { setError('Failed to reorder images'); }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const project = {
        ...newProject, id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        image: newProject.images[0] || newProject.image || '',
      };
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        showSuccess('Project added successfully!');
        setNewProject({
          title: '', description: '', client: '', category: 'Beverage Development',
          image: '', images: [], location: '', testimonial: '', testimonialAuthor: '',
          seoTitle: '', seoDescription: '', seoKeywords: '',
        });
        loadProjects();
      } else {
        setError('Failed to add project');
      }
    } catch (e) {
      setError('Failed to add project: ' + e.message);
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch('/api/projects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
        body: JSON.stringify({ id }),
      });
      if (res.ok) { showSuccess('Project deleted'); loadProjects(); }
    } catch (e) { setError('Failed to delete project'); }
  };

  // Move project up or down in display order
  const moveProject = async (projectId, direction) => {
    try {
      const res = await fetch('/api/projects/reorder', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
        body: JSON.stringify({ projectId, direction }),
      });
      if (res.ok) { loadProjects(); }
      else { setError('Failed to reorder project'); }
    } catch (e) { setError('Failed to reorder project'); }
  };

  // Initialize display order for existing projects (one-time)
  const initDisplayOrder = async () => {
    try {
      const res = await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + ADMIN_PASSWORD },
      });
      if (res.ok) { showSuccess('Display order initialized!'); loadProjects(); }
    } catch (e) { setError('Failed to initialize order'); }
  };

  const categories = [
    'Beverage Development', 'Brand Strategy', 'Product Launch', 'Private Label',
    'Spirits', 'Wine', 'Beer', 'RTD Cocktails', 'Non-Alcoholic', 'Consulting',
  ];

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-box">
          <img src="/images/culture-cocktails-logo.png" alt="Culture Cocktails"
            style={{ height: '48px', margin: '0 auto 24px' }} />
          <h1>Admin Dashboard</h1>
          <p>Enter your password to manage your site</p>
          {error && <div className="error-msg">{error}</div>}
          <div style={{ textAlign: 'left' }}>
            <input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(e); }}
              placeholder="Enter password"
              style={{
                width: '100%', padding: '14px 16px', border: '1.5px solid #d1d5db',
                borderRadius: '8px', fontSize: '0.95rem', fontFamily: "'Sora', sans-serif",
                marginBottom: '16px', outline: 'none', boxSizing: 'border-box',
              }}
            />
            <button onClick={handleLogin} className="btn-admin"
              style={{ width: '100%', textAlign: 'center', padding: '14px', fontSize: '1rem' }}>
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="admin-header">
        <h1>Culture Cocktails Admin</h1>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="/" target="_blank" rel="noopener">View Site</a>
          <button onClick={handleLogout} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
            padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
            fontFamily: "'Sora', sans-serif", fontSize: '0.85rem',
          }}>Log Out</button>
        </div>
      </div>

      {successMsg && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '12px 24px',
          textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>{successMsg}</div>
      )}

      <div style={{
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        display: 'flex', gap: '0', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem',
        overflowX: 'auto',
      }}>
        {[
          { id: 'projects', label: 'Projects' },
          { id: 'add', label: '+ Add Project' },
          { id: 'settings', label: 'Settings' },
          { id: 'seo', label: 'SEO Tools' },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: '16px 24px', border: 'none', background: 'none', cursor: 'pointer',
            fontSize: '0.9rem', fontWeight: 600, fontFamily: "'Sora', sans-serif",
            color: activeTab === tab.id ? '#025D9F' : '#6B7280', whiteSpace: 'nowrap',
            borderBottom: activeTab === tab.id ? '3px solid #025D9F' : '3px solid transparent',
          }}>{tab.label}</button>
        ))}
      </div>

      <div className="admin-content">

        {activeTab === 'projects' && (
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0 }}>Portfolio Projects ({projects.length})</h2>
              {projects.length > 0 && (
                <button onClick={initDisplayOrder} className="btn-admin"
                  style={{ padding: '6px 14px', fontSize: '0.75rem', background: '#6B7280' }}>
                  Reset Order
                </button>
              )}
            </div>
            {projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No projects yet</p>
                <p style={{ fontSize: '0.85rem' }}>Click &quot;+ Add Project&quot; to create your first portfolio piece.</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <div key={project.id} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div className="project-list-item">
                    {/* Reorder arrows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginRight: '12px', flexShrink: 0 }}>
                      <button
                        onClick={() => moveProject(project.id, 'up')}
                        disabled={index === 0}
                        title="Move up"
                        style={{
                          border: 'none', background: index === 0 ? '#e5e7eb' : '#dbeafe',
                          cursor: index === 0 ? 'default' : 'pointer', borderRadius: '4px',
                          padding: '4px 8px', fontSize: '0.75rem', fontWeight: 700,
                          color: index === 0 ? '#9CA3AF' : '#025D9F', lineHeight: 1,
                        }}>&#9650;</button>
                      <span style={{ textAlign: 'center', fontSize: '0.65rem', color: '#9CA3AF', fontWeight: 600 }}>{index + 1}</span>
                      <button
                        onClick={() => moveProject(project.id, 'down')}
                        disabled={index === projects.length - 1}
                        title="Move down"
                        style={{
                          border: 'none', background: index === projects.length - 1 ? '#e5e7eb' : '#dbeafe',
                          cursor: index === projects.length - 1 ? 'default' : 'pointer', borderRadius: '4px',
                          padding: '4px 8px', fontSize: '0.75rem', fontWeight: 700,
                          color: index === projects.length - 1 ? '#9CA3AF' : '#025D9F', lineHeight: 1,
                        }}>&#9660;</button>
                    </div>
                    {(project.images?.[0] || project.image) && (
                      <img src={project.images?.[0] || project.image} alt={project.title} />
                    )}
                    <div className="info">
                      <h3>{project.title}</h3>
                      <p>
                        {project.client && <span>{project.client} &bull; </span>}
                        {project.category}
                        {project.location && <span> &bull; {project.location}</span>}
                        {project.images && <span> &bull; {project.images.length} image{project.images.length !== 1 ? 's' : ''}</span>}
                      </p>
                    </div>
                    <div className="actions" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setEditingProject(editingProject === project.id ? null : project.id)}
                        className="btn-admin"
                        style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#025D9F' }}
                      >
                        {editingProject === project.id ? 'Close' : 'Manage Images'}
                      </button>
                      <button onClick={() => handleDeleteProject(project.id)}
                        className="btn-admin danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Delete</button>
                    </div>
                  </div>

                  {/* Expanded image management panel */}
                  {editingProject === project.id && (
                    <div style={{ marginTop: '16px', padding: '20px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px' }}>
                        Project Images ({(project.images || []).length})
                      </h4>

                      {/* Current images grid */}
                      {(project.images || []).length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                          {(project.images || []).map((img, idx) => (
                            <div key={idx} style={{
                              position: 'relative', borderRadius: '8px', overflow: 'hidden',
                              border: idx === 0 ? '2px solid #025D9F' : '1px solid #e5e7eb',
                              background: '#fff',
                            }}>
                              <img src={img} alt={`Image ${idx + 1}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                              {idx === 0 && (
                                <span style={{
                                  position: 'absolute', top: '4px', left: '4px',
                                  background: '#025D9F', color: '#fff', fontSize: '0.65rem',
                                  fontWeight: 700, padding: '2px 6px', borderRadius: '4px',
                                }}>PRIMARY</span>
                              )}
                              <div style={{ padding: '6px', display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                <button onClick={() => moveImageExisting(project.id, idx, -1)}
                                  disabled={idx === 0}
                                  style={{
                                    border: 'none', background: idx === 0 ? '#e5e7eb' : '#dbeafe', cursor: idx === 0 ? 'default' : 'pointer',
                                    borderRadius: '4px', padding: '3px 8px', fontSize: '0.7rem', fontWeight: 600,
                                  }}>&#9664;</button>
                                <button onClick={() => moveImageExisting(project.id, idx, 1)}
                                  disabled={idx === (project.images || []).length - 1}
                                  style={{
                                    border: 'none', background: idx === (project.images || []).length - 1 ? '#e5e7eb' : '#dbeafe', cursor: idx === (project.images || []).length - 1 ? 'default' : 'pointer',
                                    borderRadius: '4px', padding: '3px 8px', fontSize: '0.7rem', fontWeight: 600,
                                  }}>&#9654;</button>
                                <button onClick={() => removeImageFromExisting(project.id, idx)}
                                  style={{
                                    border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer',
                                    borderRadius: '4px', padding: '3px 8px', fontSize: '0.7rem', fontWeight: 600,
                                  }}>&#10005;</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '16px' }}>No images yet. Add one below.</p>
                      )}

                      {/* Add new image */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          value={editImageUrl}
                          onChange={(e) => setEditImageUrl(e.target.value)}
                          placeholder="/images/filename.jpg or paste URL"
                          onKeyDown={(e) => { if (e.key === 'Enter') addImageToExisting(project.id); }}
                          style={{
                            flex: 1, padding: '10px 14px', border: '1.5px solid #d1d5db',
                            borderRadius: '8px', fontSize: '0.85rem', fontFamily: "'Sora', sans-serif",
                            outline: 'none', boxSizing: 'border-box',
                          }}
                        />
                        <button onClick={() => addImageToExisting(project.id)} className="btn-admin"
                          style={{ padding: '10px 20px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                          + Add Image
                        </button>
                      </div>
                      <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '6px' }}>
                        Add images to public/images/ in GitHub, then enter the path (e.g. /images/my-photo.jpg). First image = primary display image.
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div>
            <div className="admin-card">
              <h2>Add New Project</h2>
              <div className="form-group">
                <label>Project Title *</label>
                <input type="text" value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="e.g. Rancho La Gloria RTD Margaritas" />
              </div>
              <div className="form-group">
                <label>Client Name</label>
                <input type="text" value={newProject.client}
                  onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                  placeholder="e.g. Patco Brands" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Category</label>
                  <select value={newProject.category}
                    onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}>
                    {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA" />
                </div>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe the project, what you did, and the results..." rows={4} />
              </div>
              <div className="form-group">
                <label>Project Images</label>
                {/* Current images for new project */}
                {newProject.images.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px', marginBottom: '12px' }}>
                    {newProject.images.map((img, idx) => (
                      <div key={idx} style={{
                        position: 'relative', borderRadius: '8px', overflow: 'hidden',
                        border: idx === 0 ? '2px solid #025D9F' : '1px solid #e5e7eb', background: '#fff',
                      }}>
                        <img src={img} alt={`Image ${idx + 1}`} style={{ width: '100%', height: '90px', objectFit: 'cover' }} />
                        {idx === 0 && (
                          <span style={{
                            position: 'absolute', top: '3px', left: '3px',
                            background: '#025D9F', color: '#fff', fontSize: '0.6rem',
                            fontWeight: 700, padding: '1px 5px', borderRadius: '3px',
                          }}>PRIMARY</span>
                        )}
                        <div style={{ padding: '4px', display: 'flex', gap: '3px', justifyContent: 'center' }}>
                          <button type="button" onClick={() => moveImageNew(idx, -1)} disabled={idx === 0}
                            style={{ border: 'none', background: idx === 0 ? '#e5e7eb' : '#dbeafe', cursor: idx === 0 ? 'default' : 'pointer', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontWeight: 600 }}>&#9664;</button>
                          <button type="button" onClick={() => moveImageNew(idx, 1)} disabled={idx === newProject.images.length - 1}
                            style={{ border: 'none', background: idx === newProject.images.length - 1 ? '#e5e7eb' : '#dbeafe', cursor: idx === newProject.images.length - 1 ? 'default' : 'pointer', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontWeight: 600 }}>&#9654;</button>
                          <button type="button" onClick={() => removeImageFromNew(idx)}
                            style={{ border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', borderRadius: '3px', padding: '2px 6px', fontSize: '0.65rem', fontWeight: 600 }}>&#10005;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImageToNew(); } }}
                    placeholder="/images/filename.jpg or paste URL" />
                  <button type="button" onClick={addImageToNew} className="btn-admin"
                    style={{ padding: '10px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>+ Add</button>
                </div>
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Add images to public/images/ in your GitHub repo, then enter the path. First image = primary/hero image. You can add multiple and reorder them.</p>
              </div>
            </div>

            <div className="admin-card">
              <h2>Client Testimonial (Optional)</h2>
              <div className="form-group">
                <label>Quote</label>
                <textarea value={newProject.testimonial}
                  onChange={(e) => setNewProject({ ...newProject, testimonial: e.target.value })}
                  placeholder="What did the client say about working with you?" rows={3} />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" value={newProject.testimonialAuthor}
                  onChange={(e) => setNewProject({ ...newProject, testimonialAuthor: e.target.value })}
                  placeholder="e.g. John Smith, VP Marketing at Patco Brands" />
              </div>
            </div>

            <div className="admin-card">
              <h2>SEO for This Project (Optional)</h2>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '16px' }}>
                Help search engines understand this project better.</p>
              <div className="form-group">
                <label>SEO Title</label>
                <input type="text" value={newProject.seoTitle}
                  onChange={(e) => setNewProject({ ...newProject, seoTitle: e.target.value })}
                  placeholder="e.g. RTD Margarita Development | Culture Cocktails" />
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Ideal: 50-60 characters. Include your service + client name.</p>
              </div>
              <div className="form-group">
                <label>SEO Description</label>
                <textarea value={newProject.seoDescription}
                  onChange={(e) => setNewProject({ ...newProject, seoDescription: e.target.value })}
                  placeholder="A brief summary for search results (150-160 characters ideal)" rows={2} />
              </div>
              <div className="form-group">
                <label>Keywords</label>
                <input type="text" value={newProject.seoKeywords}
                  onChange={(e) => setNewProject({ ...newProject, seoKeywords: e.target.value })}
                  placeholder="e.g. RTD cocktails, beverage development, margarita, private label" />
              </div>
            </div>

            <button onClick={handleAddProject} className="btn-admin"
              disabled={loading || !newProject.title || !newProject.description}
              style={{
                width: '100%', textAlign: 'center', padding: '16px', fontSize: '1rem',
                marginBottom: '2rem', opacity: (!newProject.title || !newProject.description) ? 0.5 : 1,
              }}>
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <div className="admin-card">
              <h2>Stats Section</h2>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '16px' }}>
                These numbers appear in the dark stats bar on your homepage.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div className="form-group" style={{ marginBottom: '8px' }}>
                      <label style={{ fontSize: '0.8rem' }}>Stat {n} Number</label>
                      <input type="text" value={siteSettings['stat' + n + 'Number']}
                        onChange={(e) => setSiteSettings({ ...siteSettings, ['stat' + n + 'Number']: e.target.value })} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                      <label style={{ fontSize: '0.8rem' }}>Stat {n} Label</label>
                      <input type="text" value={siteSettings['stat' + n + 'Label']}
                        onChange={(e) => setSiteSettings({ ...siteSettings, ['stat' + n + 'Label']: e.target.value })} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-admin" onClick={() => showSuccess('Settings saved! To update the live site, edit page.js stats directly.')}
                style={{ marginTop: '16px' }}>Save Settings</button>
            </div>

            <div className="admin-card">
              <h2>Quick Links</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'GitHub Repo', url: 'https://github.com/shanemcknight/culture-cocktails' },
                  { label: 'Vercel Dashboard', url: 'https://vercel.com/shanemcknights-projects/culture-cocktails-8gfa' },
                  { label: 'Google Search Console', url: 'https://search.google.com/search-console' },
                  { label: 'Google Business Profile', url: 'https://business.google.com' },
                ].map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'block', padding: '16px', background: '#f9fafb', borderRadius: '8px',
                      border: '1px solid #e5e7eb', textAlign: 'center', fontSize: '0.9rem',
                      fontWeight: 600, color: '#1A1A1A',
                    }}>{link.label}</a>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div>
            <div className="admin-card">
              <h2>SEO Checklist</h2>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', marginBottom: '20px' }}>
                Track your progress on making your site discoverable.</p>
              {[
                { task: 'Sitemap.xml created', desc: 'Tells Google every page on your site' },
                { task: 'Robots.txt configured', desc: 'Controls what search engines can crawl' },
                { task: 'Schema markup added', desc: 'Structured data for rich search results' },
                { task: 'Open Graph tags set', desc: 'Makes links look great on social media' },
                { task: 'Google Search Console verified', desc: 'Monitor your search performance' },
                { task: 'Google Business Profile created', desc: 'Show up in local searches and Maps' },
                { task: 'All images have alt text', desc: 'Helps search engines understand images' },
                { task: 'Meta descriptions on all pages', desc: 'Controls what shows in search results' },
                { task: 'Blog section launched', desc: 'Content marketing drives organic traffic' },
                { task: 'Page load speed optimized', desc: 'Faster sites rank higher' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 0', borderBottom: '1px solid #f3f4f6',
                }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px',
                    border: '2px solid #d1d5db', background: '#fff', flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.task}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-card">
              <h2>AI and Search Optimization Tips</h2>
              <p style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '1.7', marginBottom: '12px' }}>
                To appear in AI search results (ChatGPT, Claude, Perplexity):</p>
              <ul style={{ fontSize: '0.85rem', color: '#6B7280', lineHeight: '2', paddingLeft: '20px', listStyle: 'disc' }}>
                <li>Add detailed case studies with specific results and numbers</li>
                <li>Include FAQs on service pages (AI loves Q and A format)</li>
                <li>Write blog posts about industry topics you are an expert on</li>
                <li>Get mentioned on other industry sites and directories</li>
                <li>Keep content fresh — update your site monthly at minimum</li>
                <li>Use natural language that matches how people ask questions</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
