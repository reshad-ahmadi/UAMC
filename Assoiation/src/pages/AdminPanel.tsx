import { useState, useEffect } from 'react';
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
    name_en: '', name_da: '', name_ps: '',
    category_en: '', category_da: '', category_ps: '',
    description_en: '', description_da: '', description_ps: '',
    location_en: '', location_da: '', location_ps: '',
    factory_address_en: '', factory_address_da: '', factory_address_ps: '',
    sales_office_address_en: '', sales_office_address_da: '', sales_office_address_ps: '',
    contact_numbers_en: '', contact_numbers_da: '', contact_numbers_ps: '',
    image: '',
    logo: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'https://uigpmca.af/api';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.password === 'Admin0912') {
      setStep('dashboard');
      setError('');
    } else {
      setError('Invalid Access Code');
    }
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/companies`);
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/companies/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMessage({ type: 'success', text: 'Member deleted successfully' });
        fetchMembers();
      } else {
        setMessage({ type: 'error', text: 'Failed to delete member' });
      }
    } catch (err) {
       setMessage({ type: 'error', text: 'Error deleting member' });
    }
  };

  useEffect(() => {
    if (step === 'dashboard') fetchMembers();
  }, [step]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
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
      let finalLogoUrl = formData.logo;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);

        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error('Background image upload failed');
        const uploadResult = await uploadRes.json();
        finalImageUrl = uploadResult.imageUrl;
      }

      if (logoFile) {
        const uploadData = new FormData();
        uploadData.append('image', logoFile);

        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: uploadData,
        });

        if (!uploadRes.ok) throw new Error('Logo upload failed');
        const uploadResult = await uploadRes.json();
        finalLogoUrl = uploadResult.imageUrl;
      }

      const response = await fetch(`${API_URL}/api/companies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: finalImageUrl, logo: finalLogoUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Member added successfully!' });
        setFormData({ 
          name_en: '', name_da: '', name_ps: '',
          category_en: '', category_da: '', category_ps: '',
          description_en: '', description_da: '', description_ps: '',
          location_en: '', location_da: '', location_ps: '',
          factory_address_en: '', factory_address_da: '', factory_address_ps: '',
          sales_office_address_en: '', sales_office_address_da: '', sales_office_address_ps: '',
          contact_numbers_en: '', contact_numbers_da: '', contact_numbers_ps: '',
          image: '', logo: '' 
        });
        setImageFile(null);
        setLogoFile(null);
        fetchMembers();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        {step === 'login' ? (
          <div className="max-w-md mx-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-[#0B161B] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-8 text-center tracking-tight">Access <span className="text-blue-500">Portal</span></h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1 text-center">Entry Code</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500/50 transition-all text-center text-2xl font-mono tracking-[0.5em]"
                  />
                </div>
                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                  Confirm Access
                </button>
              </form>
            </div>
          </div>
        ) : (
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
                {/* General Information */}
                <div className="bg-black/20 p-6 rounded-3xl border border-white/5 space-y-6">
                  <h3 className="text-blue-500 font-bold uppercase tracking-widest text-sm border-b border-white/5 pb-2">1. General Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Company Logo (PNG)</label>
                      <input 
                        type="file" accept="image/*" onChange={handleLogoChange}
                        className="w-full bg-black/40 border-2 border-dashed border-white/10 rounded-2xl py-3 px-5 outline-none hover:border-blue-500/50 transition-all cursor-pointer text-gray-400 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-blue-600 file:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Main Background Image</label>
                      <input 
                        type="file" accept="image/*" onChange={handleFileChange}
                        className="w-full bg-black/40 border-2 border-dashed border-white/10 rounded-2xl py-3 px-5 outline-none hover:border-blue-500/50 transition-all cursor-pointer text-gray-400 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-blue-600 file:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* English Data */}
                <div className="bg-blue-500/5 p-6 rounded-3xl border border-blue-500/10 space-y-6">
                  <h3 className="text-blue-400 font-bold uppercase tracking-widest text-sm border-b border-blue-500/10 pb-2">2. Data in English (EN)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Company Name (EN)</label>
                      <input 
                        type="text" required value={formData.name_en} 
                        onChange={(e) => setFormData({...formData, name_en: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                        placeholder="e.g. Shamal Profile"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Category (EN)</label>
                       <select 
                        required value={formData.category_en} 
                        onChange={(e) => setFormData({...formData, category_en: e.target.value})}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Contact Numbers (EN)</label>
                      <input 
                        type="text" required value={formData.contact_numbers_en} 
                        onChange={(e) => setFormData({...formData, contact_numbers_en: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                        placeholder="e.g. 0708000500 - 0792101010"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">General Location (EN)</label>
                      <input 
                        type="text" required value={formData.location_en} 
                        onChange={(e) => setFormData({...formData, location_en: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                        placeholder="e.g. Mazar-i-Sharif, Balkh"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Factory Address (EN)</label>
                      <input 
                        type="text" required value={formData.factory_address_en} 
                        onChange={(e) => setFormData({...formData, factory_address_en: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                        placeholder="Factory Location in English"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Sales Office Address (EN)</label>
                      <input 
                        type="text" required value={formData.sales_office_address_en} 
                        onChange={(e) => setFormData({...formData, sales_office_address_en: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all"
                        placeholder="Sales Office in English"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Description (EN)</label>
                    <textarea 
                      rows={3} required value={formData.description_en} 
                      onChange={(e) => setFormData({...formData, description_en: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-500 transition-all resize-none"
                      placeholder="Company description in English..."
                    ></textarea>
                  </div>
                </div>

                {/* Dari Data */}
                <div className="bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/10 space-y-6" dir="rtl">
                  <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm border-b border-emerald-500/10 pb-2 text-right">۳. معلومات به زبان دری (DA)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">نام شرکت (دری)</label>
                      <input 
                        type="text" required value={formData.name_da} 
                        onChange={(e) => setFormData({...formData, name_da: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all text-right"
                        placeholder="نام شرکت را وارد کنید..."
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">کتگوری/فعالیت (دری)</label>
                       <select 
                        required value={formData.category_da} 
                        onChange={(e) => setFormData({...formData, category_da: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all text-gray-300 text-right"
                      >
                        <option value="">انتخاب کتگوری</option>
                        <option value="تولید پروفیل">تولید پروفیل</option>
                        <option value="آهن و فولاد">آهن و فولاد</option>
                        <option value="تولید پایپ">تولید پایپ</option>
                        <option value="راه حل های صنعتی">راه حل های صنعتی</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">شماره های تماس (دری)</label>
                      <input 
                        type="text" required value={formData.contact_numbers_da} 
                        onChange={(e) => setFormData({...formData, contact_numbers_da: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all text-right"
                        placeholder="مثلاً: ۰۷۰۰۰۰۰۰۰۰"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">موقعیت عمومی (دری)</label>
                      <input 
                        type="text" required value={formData.location_da} 
                        onChange={(e) => setFormData({...formData, location_da: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all text-right"
                        placeholder="مثلاً: هرات، پارک صنعتی"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">آدرس فابریکه (دری)</label>
                      <input 
                        type="text" required value={formData.factory_address_da} 
                        onChange={(e) => setFormData({...formData, factory_address_da: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all text-right"
                        placeholder="آدرس کارخانه به دری"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">آدرس دفتر فروشات (دری)</label>
                      <input 
                        type="text" required value={formData.sales_office_address_da} 
                        onChange={(e) => setFormData({...formData, sales_office_address_da: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all text-right"
                        placeholder="آدرس دفتر فروش به دری"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">توضیحات (دری)</label>
                    <textarea 
                      rows={3} required value={formData.description_da} 
                      onChange={(e) => setFormData({...formData, description_da: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-emerald-500 transition-all resize-none text-right"
                      placeholder="توضیحات شرکت به زبان دری..."
                    ></textarea>
                  </div>
                </div>

                {/* Pashto Data */}
                <div className="bg-orange-500/5 p-6 rounded-3xl border border-orange-500/10 space-y-6" dir="rtl">
                  <h3 className="text-orange-400 font-bold uppercase tracking-widest text-sm border-b border-orange-500/10 pb-2 text-right">۴. معلومات په پښتو ژبه (PS)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">د شرکت نوم (پښتو)</label>
                      <input 
                        type="text" required value={formData.name_ps} 
                        onChange={(e) => setFormData({...formData, name_ps: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all text-right"
                        placeholder="د شرکت نوم ولیکئ..."
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">کتګوري/فعالیت (پښتو)</label>
                       <select 
                        required value={formData.category_ps} 
                        onChange={(e) => setFormData({...formData, category_ps: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all text-gray-300 text-right"
                      >
                        <option value="">کتګوري وټاکئ</option>
                        <option value="د پروفیل تولید">د پروفیل تولید</option>
                        <option value="اوسپنه او فولاد">اوسپنه او فولاد</option>
                        <option value="د پایپ تولید">د پایپ تولید</option>
                        <option value="صنعتي حلونه">صنعتي حلونه</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">د اړیکو شمیرې (پښتو)</label>
                      <input 
                        type="text" required value={formData.contact_numbers_ps} 
                        onChange={(e) => setFormData({...formData, contact_numbers_ps: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all text-right"
                        placeholder="مثلاً: ۰۷۰۰۰۰۰۰۰۰"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">عمومي موقعیت (پښتو)</label>
                      <input 
                        type="text" required value={formData.location_ps} 
                        onChange={(e) => setFormData({...formData, location_ps: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all text-right"
                        placeholder="مثلاً: کابل، صنعتي پارک"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">د فابریکې پته (پښتو)</label>
                      <input 
                        type="text" required value={formData.factory_address_ps} 
                        onChange={(e) => setFormData({...formData, factory_address_ps: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all text-right"
                        placeholder="د فابریکې پته په پښتو"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">د پلور دفتر پته (پښتو)</label>
                      <input 
                        type="text" required value={formData.sales_office_address_ps} 
                        onChange={(e) => setFormData({...formData, sales_office_address_ps: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all text-right"
                        placeholder="د دفتر پته په پښتو"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">تفصیلات (پښتو)</label>
                    <textarea 
                      rows={3} required value={formData.description_ps} 
                      onChange={(e) => setFormData({...formData, description_ps: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-orange-500 transition-all resize-none text-right"
                      placeholder="د شرکت په اړه معلومات په پښتو..."
                    ></textarea>
                  </div>
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

            {/* Existing Members Section */}
            <div className="mt-16 space-y-8">
               <h3 className="text-2xl font-bold tracking-tight px-2 flex items-center gap-3">
                 <Building className="text-blue-500" />
                 Registered <span className="text-blue-500">Members</span>
               </h3>
               
               <div className="space-y-4">
                 {members.length === 0 ? (
                    <div className="bg-[#0B161B] border border-white/5 rounded-3xl p-10 text-center">
                       <p className="text-gray-500 font-medium italic">No members registered yet.</p>
                    </div>
                 ) : (
                   members.map((member) => (
                     <div key={member.id} className="bg-[#0B161B] border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:border-blue-500/20 transition-all duration-300">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-black/40 rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center p-2">
                              {member.logo ? (
                                <img src={member.logo} alt={member.name_en} className="w-full h-full object-contain" />
                              ) : (
                                <Building size={24} className="text-gray-600" />
                              )}
                           </div>
                           <div>
                              <h4 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{member.name_en}</h4>
                              <p className="text-gray-500 text-sm">{member.category_en}</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => handleDelete(member.id)}
                          className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
                        >
                          Delete
                        </button>
                     </div>
                   ))
                 )}
               </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
