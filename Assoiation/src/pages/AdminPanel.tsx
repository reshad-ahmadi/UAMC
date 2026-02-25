import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Building, MapPin, TextQuote, Image, Loader2, CheckCircle2, LayoutDashboard, LogOut } from 'lucide-react';
import Navbar from '../components/Nav';
import Footer from '../components/Footer';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'login' | 'dashboard'>('login');
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  
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

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.name === 'Admin01' && loginData.password === 'Admin0912') {
      setStep('dashboard');
      setError('');
    } else {
      setError('Invalid username or password');
    }
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

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadResult = await uploadRes.json();
        finalImageUrl = uploadResult.imageUrl;
      }

      const response = await fetch(`${API_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: finalImageUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Member added successfully!' });
        setFormData({ name: '', category: '', description: '', location: '', image: '' });
        setImageFile(null);
        setTimeout(() => navigate('/members'), 2000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add member.' });
      }
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: error.message || 'Server error. Please check if backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050E12] text-white">
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-32">
        {step === 'login' && (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#0B161B] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-tighter">Admin <span className="text-blue-500">Login</span></h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <input 
                  type="text" required placeholder="Username"
                  value={loginData.name}
                  onChange={(e) => setLoginData({...loginData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all"
                />
                <input 
                  type="password" required placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all"
                />
                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  Confirm Access
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-10 flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-extrabold mb-2 tracking-tight">Add New <span className="text-blue-500">Member</span></h2>
                <p className="text-gray-400">Fill in the details to register a new federation company.</p>
              </div>
              <button 
                onClick={() => setStep('login')}
                className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors font-bold uppercase tracking-widest text-xs mb-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>

            <div className="bg-[#0B161B] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              {message.text && (
                <div className={`mb-10 p-5 rounded-3xl flex items-center gap-4 animate-in fade-in zoom-in-95 ${
                  message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {message.type === 'success' ? <CheckCircle2 size={24} /> : <Plus size={24} className="rotate-45" />}
                  <span className="font-semibold">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Company Name</label>
                    <input 
                      type="text" name="name" required value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                      placeholder="e.g. Shamal Profile"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Category</label>
                    <select 
                      name="category" required value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all text-gray-300"
                    >
                      <option value="">Select Category</option>
                      <option value="Profile Production">Profile Production</option>
                      <option value="Iron & Steel">Iron & Steel</option>
                      <option value="Pipe Production">Pipe Production</option>
                      <option value="Industrial Solutions">Industrial Solutions</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Location</label>
                  <input 
                    type="text" name="location" required value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                    placeholder="e.g. Mazar-i-Sharif, Balkh"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Company Image</label>
                  <input 
                    type="file" accept="image/*" onChange={handleFileChange}
                    className="w-full bg-black/40 border-2 border-dashed border-white/10 rounded-3xl py-8 px-5 outline-none hover:border-blue-500/50 transition-all cursor-pointer text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Description</label>
                  <textarea 
                    name="description" rows={5} required value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all resize-none"
                    placeholder="Describe the company's profile..."
                  ></textarea>
                </div>

                <button 
                  type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-blue-600/30 active:scale-98"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                  {loading ? 'Processing...' : 'Register Company'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

