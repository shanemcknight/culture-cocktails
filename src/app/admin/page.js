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
    image: '', location: '', testimonial: '', testimonialAuthor: '',
    seoTitle: '', seoDescription: '', seoKeywords: '',
  });

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

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const project = {
        ...newProject, id: Date.now().toString(),
        createdAt: new Date().toISOString(),
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
          image: '', location: '', testimonial: '', testimonialAuthor: '',
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
            <h2>Portfolio Projects ({projects.length})</h2>
            {projects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No projects yet</p>
                <p style={{ fontSize: '0.85rem' }}>Click &quot;+ Add Project&quot; to create your first portfolio piece.</p>
              </div>
            ) : (
              projects.map((project) => (
                <div className="project-list-item" key={project.id}>
                  {project.image && <img src={project.image} alt={project.title} />}
                  <div className="info">
                    <h3>{project.title}</h3>
                    <p>{project.client && <span>{project.client} &bull; </span>}{project.category}{project.location && <span> &bull; {project.location}</span>}</p>
                  </div>
                  <div className="actions">
                    <button onClick={() => handleDeleteProject(project.id)}
                      className="btn-admin danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Delete</button>
                  </div>
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
                <label>Image URL</label>
                <input type="text" value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  placeholder="Paste an image URL or use /images/filename.jpg" />
                <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '4px' }}>
                  Tip: Upload images to public/images/ in your GitHub repo, then use /images/filename.jpg</p>
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
