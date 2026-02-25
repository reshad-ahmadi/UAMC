import { useState, useEffect } from 'react';
import { Plus, User, Lock, Building, MapPin, TextQuote, Image, Loader2, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'home' | 'login' | 'dashboard'>('home');
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

  const API_URL = 'http://localhost:5000'; // Make sure this matches your backend

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

      // 1. Upload Image if file exists
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

      // 2. Add Company
      const response = await fetch(`${API_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: finalImageUrl }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Member added successfully!' });
        setFormData({ name: '', category: '', description: '', location: '', image: '' });
        setImageFile(null);
      } else {
        setMessage({ type: 'error', text: 'Failed to add member.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Server error. Please check if backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050E12] text-white font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Building className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">UAMC <span className="text-blue-500">Admin</span></span>
          </div>
          {step === 'dashboard' && (
            <button 
              onClick={() => setStep('home')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {step === 'home' && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Manage Your <span className="text-blue-500">Members</span>
            </h1>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Welcome to the UAMC administration portal. Add and manage federation members with ease.
            </p>
            <button 
              onClick={() => setStep('login')}
              className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98] mx-auto"
            >
              <Plus className="group-hover:rotate-90 transition-transform duration-300" />
              Add Member
            </button>
          </div>
        )}

        {step === 'login' && (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#0B161B] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Admin <span className="text-blue-500">Login</span></h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="text" 
                      required
                      placeholder="Username"
                      value={loginData.name}
                      onChange={(e) => setLoginData({...loginData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="password" 
                      required
                      placeholder="Password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
                >
                  Login
                </button>
                <button 
                  type="button"
                  onClick={() => setStep('home')}
                  className="w-full text-gray-500 hover:text-white text-sm font-medium transition-colors"
                >
                  Cancel
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
                <p className="text-gray-400">Fill in the details below to register a new company.</p>
              </div>
            </div>

            <div className="bg-[#0B161B] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
               {/* Decorative corner */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-[100px] pointer-events-none"></div>

               {message.text && (
                <div className={`mb-10 p-5 rounded-3xl flex items-center gap-4 animate-in fade-in zoom-in-95 ${
                  message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {message.type === 'success' ? <CheckCircle2 size={24} /> : <Lock size={24} />}
                  <span className="font-semibold">{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                      <Building size={16} /> Company Name
                    </label>
                    <input 
                      type="text" name="name" required value={formData.name} 
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                      placeholder="e.g. Shamal Profile"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                      <Plus size={16} /> Category
                    </label>
                    <select 
                      name="category" required value={formData.category} 
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all appearance-none text-gray-300"
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
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                    <MapPin size={16} /> Location
                  </label>
                  <input 
                    type="text" name="location" required value={formData.location} 
                    onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                    placeholder="e.g. Mazar-i-Sharif, Balkh"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                    <Image size={16} /> Company Image / Logo
                  </label>
                  <div className="relative group cursor-pointer">
                    <input 
                      type="file" accept="image/*" onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-black/40 border-2 border-dashed border-white/10 rounded-3xl py-12 flex flex-col items-center justify-center transition-all group-hover:border-blue-500/50 group-hover:bg-blue-500/5">
                      <Image className="text-gray-600 mb-4 group-hover:text-blue-500 transition-colors" size={48} />
                      <p className="text-gray-400 font-medium">{imageFile ? imageFile.name : 'Click to upload image'}</p>
                      <p className="text-gray-600 text-xs mt-2 uppercase tracking-tighter">JPG, PNG or WEBP (Max 5MB)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest px-1">
                    <TextQuote size={16} /> Description
                  </label>
                  <textarea 
                    name="description" rows={5} required value={formData.description} 
                    onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all resize-none"
                    placeholder="Describe the company's production and mission..."
                  ></textarea>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:opacity-50 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-2xl shadow-blue-600/30 active:scale-[0.99]"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                    {loading ? 'Adding Member...' : 'Register Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 py-12 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} UAMC Federation Control. Secure Access.</p>
      </footer>
    </div>
  );
}
