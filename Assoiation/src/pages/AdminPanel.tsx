import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let finalImageUrl = formData.image;

      // 1. Upload Image if file exists
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadResult = await uploadRes.json();
        finalImageUrl = uploadResult.imageUrl;
      }

      // 2. Add Company
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: finalImageUrl }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Company added successfully!' });
        setFormData({ name: '', category: '', description: '', location: '', image: '' });
        setImageFile(null);
        setTimeout(() => navigate('/members'), 2000);
      } else {
        setMessage({ type: 'error', text: 'Failed to add company.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Server error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 md:px-[70px]">
        <div className="max-w-3xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="mb-10 text-center">
            <span className="text-brand-primary text-xs font-bold uppercase tracking-widest block mb-4">Admin Dashboard</span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Add New <span className="text-brand-primary">Company</span></h1>
          </div>

          {message.text && (
            <div className={`mb-8 p-4 rounded-xl text-center font-medium ${
              message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                <input 
                  type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  placeholder="e.g. Aria Sanat"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <select 
                  name="category" required value={formData.category} onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-primary transition-all text-gray-300"
                >
                  <option value="">Select Category</option>
                  <option value="Profile Production">Profile Production</option>
                  <option value="Iron & Steel">Iron & Steel</option>
                  <option value="Pipe Production">Pipe Production</option>
                  <option value="Industrial Solutions">Industrial Solutions</option>
                  <option value="Metal Construction">Metal Construction</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Location</label>
              <input 
                type="text" name="location" required value={formData.location} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                placeholder="e.g. Herat, Afghanistan"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Upload Company Logo</label>
              <div className="relative group/upload">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="w-full bg-white/5 border border-dashed border-white/20 rounded-xl py-6 px-4 outline-none focus:border-brand-primary transition-all text-center file:hidden cursor-pointer hover:bg-white/10"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-gray-400 group-hover/upload:text-white transition-colors">
                  <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {imageFile ? `Selected: ${imageFile.name}` : 'Click to select or drag and drop logo'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea 
                name="description" rows={4} required value={formData.description} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-brand-primary transition-all resize-none"
                placeholder="Tell us about the company..."
              ></textarea>
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                type="button" onClick={() => navigate('/members')}
                className="flex-1 py-4 rounded-xl border border-white/10 font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-all text-gray-400"
              >
                Cancel
              </button>
              <button 
                type="submit" disabled={loading}
                className="flex-[2] py-4 rounded-xl bg-brand-primary text-black font-bold text-sm uppercase tracking-wider hover:bg-brand-secondary disabled:opacity-50 transition-all shadow-lg shadow-brand-primary/20"
              >
                {loading ? 'Adding...' : 'Save Company'}
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
