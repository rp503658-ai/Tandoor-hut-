import React, { useState, useEffect, useMemo } from 'react';
import { Logo } from './components/Logo';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ChevronRight, 
  Plus, 
  Minus, 
  X, 
  UtensilsCrossed,
  Truck,
  Heart,
  Instagram,
  Facebook,
  Menu as MenuIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from './constants';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Tandoori' | 'Main Course' | 'Breads' | 'Beverages'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const filteredMenu = useMemo(() => {
    let items = MENU_ITEMS;
    if (activeCategory !== 'All') {
      items = items.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen relative text-gray-900 font-sans selection:bg-orange-100 overflow-x-hidden">
      {/* Global Background Layer */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#FDFCFB]/95 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
              <Logo size={32} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">Tandoor Hut</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-orange-600 leading-none">Arrah, Bihar</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#menu" className="hover:text-orange-600 transition-colors">Menu</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
            <a href="#reviews" className="hover:text-orange-600 transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCartOpen(true)}
              id="cart-button"
              className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors bg-white rounded-full shadow-sm border border-gray-100"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-gray-700">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1599487488170-d11ec9c175f0?q=80&w=2000&auto=format&fit=crop" 
            alt="Authentic Tandoori preparation" 
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-orange-600 rounded-full text-xs font-bold uppercase tracking-widest">Original & Authentic</span>
              <div className="flex items-center gap-1 text-orange-400">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold text-white">4.3</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
              The Original <span className="text-orange-500">Tandoor Hut</span> Experience.
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed">
              Serving the heart of Arrah with smoky tandoori delights and rich North Indian curries. Authentic wood-fired flavor in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#menu" 
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/20 text-center"
              >
                View Full Menu
              </a>
              <a 
                href="https://maps.app.goo.gl/ousG1FX7sdaWEUz97" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold transition-all border border-white/20 text-center flex items-center justify-center gap-2"
              >
                <MapPin size={18} />
                Visit Us in Arrah
              </a>
            </div>
          </motion.div>
        </div>

        {/* Feature Pill */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-10 right-4 md:right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-white hidden md:block"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-sm font-bold">Fast Delivery</p>
              <p className="text-xs text-white/60">Within Godhna Road area</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Info Cards */}
      <section className="py-12 -mt-16 relative z-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="https://maps.app.goo.gl/ousG1FX7sdaWEUz97" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 flex items-center gap-5 hover:scale-[1.02] transition-transform cursor-pointer group"
          >
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MapPin size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Our Location</p>
              <p className="text-sm font-semibold text-gray-700">Godhna Rd, Anaith, Arrah</p>
              <p className="text-[10px] text-blue-600 font-bold mt-1">View on Maps →</p>
            </div>
          </a>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 flex items-center gap-5">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Opening Hours</p>
              <p className="text-sm font-semibold text-gray-700">11:00 AM - 10:00 PM</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 flex items-center gap-5">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
              <UtensilsCrossed size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Price Range</p>
              <p className="text-sm font-semibold text-gray-700">₹200–400 per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Art of Tandoor */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1573016462002-39fe51df718d?q=80&w=1200&auto=format&fit=crop" 
                alt="Original Tandoor Oven" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-600 rounded-3xl p-6 text-white hidden lg:flex flex-col justify-center gap-2 shadow-2xl">
              <p className="text-3xl font-black italic">100%</p>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Traditional Clay Oven Methods</p>
            </div>
          </div>
          <div>
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4 block">Our Legacy</span>
            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Authenticity You Can <span className="italic text-orange-600">Taste</span>.</h3>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                At Tandoor Hut, we don't just cook—we carry forward the age-old tradition of Tandoori cuisine. Our signature dishes are prepared in authentic clay ovens, using a secret blend of spices that has made us a favorite in Arrah.
              </p>
              <p>
                From our Godhna Road location, we've been serving the community with a commitment to hygiene, warmth, and flavor that stays true to its roots.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="p-4 bg-orange-50 rounded-2xl">
                <p className="text-2xl font-bold text-orange-600 mb-1">262+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Happy Reviews</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl">
                <p className="text-2xl font-bold text-orange-600 mb-1">8 Yrs</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Of Hot Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-[#1A1A1A] rounded-[3.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            <div className="lg:w-1/2 relative bg-[#222]">
              <div className="aspect-[4/5] lg:aspect-auto lg:h-full group">
                <img 
                  src="https://images.unsplash.com/photo-1614583225154-5feaba06b3bc?q=80&w=1200&auto=format&fit=crop" 
                  alt="Founder of Tandoor Hut" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="absolute bottom-8 left-8 text-white z-10">
                <p className="text-orange-500 font-bold uppercase tracking-widest text-[10px] mb-2">Our Visionary</p>
                <h4 className="text-3xl font-bold">The Founder's Journey</h4>
              </div>
            </div>
            <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center text-white relative">
              {/* Decorative Quote Mark */}
              <div className="absolute top-10 right-10 opacity-10">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H15.017C14.465 8 14.017 8.448 14.017 9V15C14.017 15.552 14.465 16 15.017 16H16.017C14.899 16 14.017 16.899 14.017 18V21H14.017ZM4.017 21L4.017 18C4.017 16.899 4.899 16 6.017 16H9.017C9.569 16 10.017 15.552 10.017 15V9C10.017 8.448 9.569 8 9.017 8H5.017C4.465 8 4.017 8.448 4.017 9V15C4.017 15.552 4.465 16 5.017 16H6.017C4.899 16 4.017 16.899 4.017 18V21H4.017Z" /></svg>
              </div>
              
              <h3 className="text-4xl font-bold mb-8 leading-tight">Bringing <span className="text-orange-500 italic">Passion</span> to Every Plate.</h3>
              
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  "Tandoor Hut started with a simple belief: that everyone in Arrah deserves high-quality, authentic flavors in a space that feels like home. I wanted to create a place where traditional tandoori techniques meet modern service standards."
                </p>
                <p>
                  "Every dish that leaves our kitchen is a reflection of our commitment to excellence. We source only the freshest ingredients and stay true to the recipes that have defined Indian cuisine for generations."
                </p>
              </div>

              <div className="mt-12 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center font-serif text-2xl">
                  R
                </div>
                <div>
                  <p className="font-bold text-white uppercase tracking-widest text-sm">Founder & CEO</p>
                  <p className="text-gray-500 text-xs italic">Tandoor Hut, Arrah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exterior Showcase */}
      <section className="py-24 bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">Visit Arrah's Finest</span>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">Comfort and Flavor <br/>Under One <span className="text-orange-500">Roof</span>.</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Step into our warm and inviting space on Godhna Road. Our restaurant is designed to provide a perfect blend of modern comfort and traditional Indian hospitality. From family celebrations to quick lunches, we make every meal special.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-600">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400 font-medium tracking-wide">Joined by 10k+ food lovers in Arrah</p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop" 
                  alt="Tandoor Hut Restaurant Exterior" 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600 rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600 rounded-full blur-[80px] opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-white/10 rounded-[4rem] rotate-6"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-2 block">Our Specialties</span>
            <h3 className="text-4xl font-bold text-gray-900">Explore Our Menu</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search food..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-full text-sm focus:ring-2 focus:ring-orange-600 focus:outline-none shadow-sm"
              />
              <X 
                size={16} 
                className={`absolute right-3 top-2.5 text-gray-400 cursor-pointer ${searchQuery ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => setSearchQuery('')}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <MenuIcon size={16} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(['All', 'Tandoori', 'Main Course', 'Breads', 'Beverages'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.div 
        layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                id={`item-${item.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      item.isVegetarian ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {item.isVegetarian ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                    <Heart size={18} />
                  </button>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{item.name}</h4>
                    <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2 italic">
                    {item.description}
                  </p>
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-3 mt-auto bg-gray-50 hover:bg-orange-600 text-gray-900 hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <Plus size={18} className="group-hover/btn:rotate-90 transition-transform" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Visit Us Section - Map Embed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-4 block">Location</span>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Visit Us in <span className="text-orange-600">Arrah</span></h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Located conveniently on Godhna Road, we are easily accessible from all parts of Arrah. Whether you're coming for a family dinner or picking up a quick bite, we're right where you need us.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Address</p>
                    <p className="text-sm text-gray-500">GMR7+RMR, Godhna Rd, Anaith, Arrah, Bihar 802302</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pt-4">
                  <a 
                    href="https://maps.app.goo.gl/ousG1FX7sdaWEUz97" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-center hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                  >
                    <MapPin size={18} />
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.243503823485!2d84.6617564!3d25.563532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d5e69e46a96e5%3A0xc39e5e69e46a96e5!2sTandoor%20Hut!5e0!3m2!1sen!2sin!4v1715070000000!5m2!1sen!2sin" 
                  className="w-full h-full grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 rounded-[2.5rem]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Godhna Road Special Section */}
       <section className="py-24 bg-orange-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-4 rotate-12 scale-150">
            {Array.from({ length: 24 }).map((_, i) => (
              <UtensilsCrossed key={i} size={40} />
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 italic leading-tight">Gordhna Road's <span className="text-orange-900">Favorite</span> Tandoor.</h3>
            <p className="text-xl text-orange-100 mb-8 max-w-lg leading-relaxed">
              We take pride in being the go-to spot for food lovers in the Godhna Road area. Fresh, hot, and traditional—delivered straight to your doorstep within 30 minutes.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-6 py-4 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                <p className="text-sm font-bold">Free Delivery</p>
                <p className="text-xs opacity-60">Orders above ₹500</p>
              </div>
              <div className="px-6 py-4 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-md">
                <p className="text-sm font-bold">Fast Pickup</p>
                <p className="text-xs opacity-60">Ready in 15-20 Mins</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 md:w-80 md:h-80 bg-orange-500 rounded-full flex items-center justify-center border-8 border-orange-400 shadow-2xl relative"
            >
               <p className="text-4xl font-black text-center leading-tight -rotate-12">TASTE<br/>OF<br/>ARRAH</p>
            </motion.div>
            <div className="absolute -top-4 -right-4 bg-white text-orange-600 px-4 py-2 rounded-xl font-bold shadow-xl rotate-12">
              BEST IN BIHAR
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">What Our Customers Say</h3>
            <div className="flex items-center justify-center gap-2">
              <div className="flex text-orange-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill={i <= 4 ? "currentColor" : "none"} stroke="currentColor" />)}
              </div>
              <span className="font-bold text-gray-600">4.3 Based on 262 reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Hygienic place in ara and staff behavior is too good and food is also good",
              "The service is at par, the staff behaviour is warm.",
              "Good quality food serve with a good portion of food"
            ].map((text, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex text-orange-400 mb-4">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-600 italic leading-relaxed italic">"{text}"</p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">Local Guide</p>
                    <p className="text-xs text-gray-400">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-bottom border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingBag size={20} className="text-orange-600" />
                  Your Order
                </h3>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="font-medium">Your cart is empty</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="mt-4 text-orange-600 text-sm font-bold"
                    >
                      Start Ordering
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 rounded-2xl object-cover border border-gray-100" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 leading-tight mb-1">{item.name}</p>
                          <p className="text-sm font-bold text-orange-600 mb-2">₹{item.price}</p>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center text-gray-500 text-sm">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500 text-sm">
                    <span>Delivery Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 mt-2">
                    Checkout Now
                  </button>
                  <p className="text-[10px] text-center text-gray-400">
                    Estimated delivery: 30-45 mins to Godhna Road area
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contact Card Section */}
      <section id="contact-card" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs mb-2 block">Connect With Us</span>
            <h3 className="text-4xl font-bold text-gray-900">Virtual Business Card</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row relative group">
              {/* Decorative Corner Flowers (matching the image) */}
              <div className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-900">
                  <path d="M50 0c5 15 20 20 35 20s20-15 20-30m-75 10c15 5 20 20 20 35s-15 20-30 20M10 90c15-5 20-20 20-35s-15-20-30-20m75 80c-5-15-20-20-35-20s-20 15-20 30" />
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none translate-x-1/2 translate-y-1/2 rotate-180">
                <svg viewBox="0 0 100 100" fill="currentColor" className="text-red-900">
                  <path d="M50 0c5 15 20 20 35 20s20-15 20-30m-75 10c15 5 20 20 20 35s-15 20-30 20M10 90c15-5 20-20 20-35s-15-20-30-20m75 80c-5-15-20-20-35-20s-20 15-20 30" />
                </svg>
              </div>

              {/* Card Body - Right Side in Image (Business Side) */}
              <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-[#f0f0f0] relative">
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-orange-500 shadow-xl">
                      <Logo size={40} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-gray-900 tracking-tighter leading-none mb-1">TANDOOR HUT</h4>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">A Multi-cuisine Restaurant</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-400 italic">"Taste that makes you Crazy"</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Call or WhatsApp</p>
                      <p className="text-lg font-bold text-gray-900">+91 83402 45998</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Secondary Number</p>
                      <p className="text-lg font-bold text-gray-900">+91 98522 59112</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body - Left Side in Image (Social/Info) */}
              <div className="flex-1 p-10 md:p-16 flex flex-col justify-center border-l border-gray-200 bg-white">
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group/social cursor-pointer">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                      <Facebook size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Facebook</p>
                      <p className="text-sm font-bold text-gray-900">@tandoorhutAra</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group/social cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">
                      <Instagram size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Instagram</p>
                      <p className="text-sm font-bold text-gray-900">@tandoor__hut</p>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Located At</p>
                        <p className="text-sm font-bold text-gray-900 leading-tight">
                          Near SBI ATM,<br />
                          Godhna Road, Arrah
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Delivery Seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <div className="w-32 h-32 bg-orange-600 rounded-full border-4 border-white shadow-xl flex items-center justify-center -rotate-12 scale-75 group-hover:scale-100 transition-transform duration-500">
                  <div className="text-center text-white p-2">
                    <Truck size={24} className="mx-auto mb-1" />
                    <p className="text-[10px] font-black uppercase leading-none">FREE<br/>DELIVERY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="contact" className="bg-[#1A1A1A] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                  <Logo size={32} />
                </div>
                <h1 className="text-xl font-bold tracking-tight">Tandoor Hut</h1>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
                Serving the most authentic and hygienic South-Asian flavors in Arrah since 2018. Your go-to place for Tandoori delights.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Instagram size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Facebook size={18} />
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Quick Links</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#menu" className="hover:text-orange-600 transition-colors">Digital Menu</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Our History</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Hygiene Standards</a></li>
                <li><a href="#" className="hover:text-orange-600 transition-colors">Franchise</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Services</h5>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li>Dine-in Experience</li>
                <li>Drive-through</li>
                <li>No-contact Delivery</li>
                <li>Event Catering</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">Contact Us</h5>
              <ul className="space-y-6">
                <li>
                  <a 
                    href="https://maps.app.goo.gl/ousG1FX7sdaWEUz97" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex gap-4 group cursor-pointer"
                  >
                    <MapPin size={20} className="text-orange-600 shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-gray-400 text-sm group-hover:text-white transition-colors">GMR7+RMR, Godhna Rd, Anaith, Arrah, Bihar 802302</p>
                  </a>
                </li>
                <li className="flex gap-4">
                  <Phone size={20} className="text-orange-600 shrink-0" />
                  <p className="text-gray-400 text-sm">083402 45998</p>
                </li>
                <li className="flex gap-4">
                  <Clock size={20} className="text-orange-600 shrink-0" />
                  <p className="text-gray-400 text-sm">11:00 AM - 10:00 PM</p>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs">© 2026 Tandoor Hut, Arrah. All rights reserved.</p>
            <div className="flex gap-8 text-gray-500 text-xs">
              <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}
