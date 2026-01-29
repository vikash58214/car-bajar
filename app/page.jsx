"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star,
  Fuel,
  Calendar,
  Gauge,
  User,
  Search,
  Filter,
  X,
  Menu,
  Calculator,
  Navigation,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Clock,
} from "lucide-react";

// --- Static Dummy Data ---
const VEHICLES = [
  {
    id: 1,
    name: "Maruti Suzuki Swift VXI",
    type: "Car",
    price: 545000,
    year: 2021,
    km: "24,000",
    fuel: "Petrol",
    ownership: "1st",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
    ],
    emi: "8,500",
    description:
      "Mint condition Maruti Suzuki Swift VXI. Regularly serviced at authorized service centers. Features include power windows, steering mounted controls, and a smooth petrol engine perfect for city driving.",
    features: ["Power Steering", "ABS", "Dual Airbags", "Touchscreen Music System", "Reverse Sensors"],
  },
  {
    id: 2,
    name: "Hyundai Creta SX (O) Diesel",
    type: "Car",
    price: 1425000,
    year: 2022,
    km: "18,500",
    fuel: "Diesel",
    ownership: "1st",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
    ],
    emi: "24,000",
    description:
      "Top-end Creta Diesel. Panoramic sunroof, ventilated seats, and premium Bose audio system. This car is virtually brand new and comes with manufacturer warranty.",
    features: ["Panoramic Sunroof", "Ventilated Seats", "Wireless Charging", "LED Headlamps", "6 Airbags"],
  },
  {
    id: 3,
    name: "Honda City V",
    type: "Car",
    price: 890000,
    year: 2019,
    km: "42,000",
    fuel: "Petrol",
    ownership: "2nd",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1606152424101-ad949ca6485b?auto=format&fit=crop&q=80&w=800",
    ],
    emi: "14,200",
    description:
      "Well maintained executive sedan. The i-VTEC engine offers incredible performance. Comes with full service history and zero-dep insurance.",
    features: ["Cruise Control", "Climate Control", "Alloy Wheels", "Leather Upholstery", "Reverse Camera"],
  },
  {
    id: 4,
    name: "Royal Enfield Classic 350",
    type: "Bike",
    price: 175000,
    year: 2023,
    km: "3,200",
    fuel: "Petrol",
    ownership: "1st",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&q=80&w=800",
    ],
    emi: "3,100",
    description:
      "Latest J-series engine Classic 350. Stealth Black color with alloy wheels. Hardly used, only 3,200 km driven. First service just completed.",
    features: ["Dual Channel ABS", "Electric Start", "USB Charging", "Alloy Wheels", "Side Stand Sensor"],
  },
  {
    id: 5,
    name: "Toyota Fortuner 4x4",
    type: "Car",
    price: 3200000,
    year: 2021,
    km: "35,000",
    fuel: "Diesel",
    ownership: "1st",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    ],
    emi: "52,000",
    description:
      "The beast of the road. Full 4x4 capability with low-range transfer case. Pristine condition, driven mostly on highways. Ceramic coating done.",
    features: ["4WD", "Touchscreen Infotainment", "Powered Tailgate", "7 Seats", "Traction Control"],
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 5,
    text: "Best dealership in the city! Got my Swift at a very fair price. The documentation was smooth.",
  },
  {
    id: 2,
    name: "Priya Patel",
    rating: 5,
    text: "Transparent dealing and very well-maintained cars. Highly recommended for first-time buyers.",
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 4,
    text: "Good collection of SUVs. The EMI calculator on the site helped me plan my budget.",
  },
];

// --- Utility Components ---

const FloatingActions = () => {
  const whatsappNumber = "919876543210";
  const callNumber = "+919876543210";
  const message = encodeURIComponent("Hi, I saw your car on Google. Is it available?");

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageCircle size={28} fill="currentColor" />
      </a>
      <a
        href={`tel:${callNumber}`}
        className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-bounce"
      >
        <Phone size={28} fill="currentColor" />
      </a>
    </div>
  );
};

const EMICalculator = ({ defaultPrice = 500000 }) => {
  const [price, setPrice] = useState(defaultPrice);
  const [downPayment, setDownPayment] = useState(Math.round(defaultPrice * 0.2));
  const [interest, setInterest] = useState(9.5);
  const [tenure, setTenure] = useState(60);

  useEffect(() => {
    setPrice(defaultPrice);
    setDownPayment(Math.round(defaultPrice * 0.2));
  }, [defaultPrice]);

  const monthlyEMI = useMemo(() => {
    const principal = price - downPayment;
    if (principal <= 0) return 0;
    const r = interest / 12 / 100;
    const n = tenure;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [price, downPayment, interest, tenure]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-900">
        <Calculator className="text-blue-600" /> EMI Calculator
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Down Payment (₹)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Interest (%)</label>
            <input
              type="number"
              value={interest}
              step="0.1"
              onChange={(e) => setInterest(Number(e.target.value))}
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tenure</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-blue-500"
            >
              {[12, 24, 36, 48, 60, 72].map((m) => (
                <option key={m} value={m}>
                  {m / 12} Years
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 bg-blue-600 p-6 rounded-xl text-center text-white shadow-lg shadow-blue-100">
          <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Monthly Payment</p>
          <p className="text-3xl font-black mt-1">₹ {monthlyEMI.toLocaleString("en-IN")}</p>
        </div>
      </div>
    </div>
  );
};

const VehicleCard = ({ vehicle, onClick }) => {
  const whatsappNumber = "919876543210";
  const message = encodeURIComponent(`Hi, I'm interested in the ${vehicle.name}. Is it available?`);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col h-full">
      <div className="relative overflow-hidden cursor-pointer" onClick={onClick}>
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          {vehicle.year}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-gray-900 shadow-sm">
          {vehicle.ownership} Owner
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3
          className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer"
          onClick={onClick}
        >
          {vehicle.name}
        </h3>
        <p className="text-2xl font-black text-gray-900 mt-1">₹ {vehicle.price.toLocaleString("en-IN")}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <Gauge size={14} /> {vehicle.km} km
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={14} /> {vehicle.fuel}
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-green-500" /> Certified
          </span>
        </div>

        <div className="mt-auto pt-5 grid grid-cols-2 gap-2">
          <a
            href={`tel:+919876543210`}
            className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-xl text-sm font-bold active:scale-95 transition-all hover:bg-blue-100"
          >
            <Phone size={16} /> Call
          </a>
          <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-bold active:scale-95 transition-all hover:bg-blue-700 shadow-md shadow-blue-100"
          >
            Details <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const VehicleDetails = ({ vehicle, onBack, onSelectOther }) => {
  const [activeImage, setActiveImage] = useState(0);
  const whatsappNumber = "919876543210";
  const message = encodeURIComponent(
    `Hi, I saw the ${vehicle.name} on your website. Is it still available? I'd like to book a test drive.`,
  );

  if (!vehicle) return null;

  const related = VEHICLES.filter((v) => v.id !== vehicle.id && v.type === vehicle.type).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="container mx-auto px-4 md:px-6">
        {/* Breadcrumb / Back Navigation */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold mb-6 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Inventory
        </button>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Gallery & Info */}
          <div className="lg:col-span-8">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-lg bg-gray-100">
                <img
                  src={vehicle.images[activeImage]}
                  alt={vehicle.name}
                  className="w-full h-full object-cover animate-in fade-in duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <ShieldCheck size={12} /> Certified Unit
                  </span>
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {vehicle.year} Model
                  </span>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {vehicle.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-24 h-20 rounded-xl overflow-hidden border-4 transition-all ${activeImage === idx ? "border-blue-600 scale-95 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                  </button>
                ))}
              </div>
            </div>

            {/* Core Specs Grid (Mobile Optimized) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { label: "Driven", value: vehicle.km + " KM", icon: <Gauge className="text-blue-600" /> },
                { label: "Fuel Type", value: vehicle.fuel, icon: <Fuel className="text-blue-600" /> },
                { label: "Ownership", value: vehicle.ownership + " Owner", icon: <User className="text-blue-600" /> },
                { label: "Transmission", value: "Manual/Auto", icon: <Zap className="text-blue-600" /> },
              ].map((spec, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm">{spec.icon}</div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none mb-1">
                      {spec.label}
                    </p>
                    <p className="font-black text-gray-900 leading-none">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description & Features */}
            <div className="mt-12 space-y-10">
              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-4">Seller Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">{vehicle.description}</p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                  {vehicle.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-700 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-blue-600" /> {f}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT COLUMN: Pricing & Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-xl shadow-gray-100 sticky top-24">
              <div className="mb-6">
                <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">{vehicle.name}</h1>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-blue-600">₹ {vehicle.price.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <a
                  href={`tel:${whatsappNumber}`}
                  className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]"
                >
                  <Phone size={24} fill="white" /> Call Seller
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${message}`}
                  className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg shadow-green-100 active:scale-[0.98]"
                >
                  <MessageCircle size={24} fill="white" /> Contact via WhatsApp
                </a>
              </div>

              <div className="mt-8 bg-gray-50 rounded-2xl p-5 border border-dashed border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-600">Expected EMI</span>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
                    Easy Financing
                  </span>
                </div>
                <p className="text-2xl font-black text-gray-900 mb-1">₹ {vehicle.emi}/mo*</p>
                <p className="text-xs text-gray-400 font-medium">
                  Calculation based on 20% down payment @ 9.5% p.a for 5 years.
                </p>
              </div>
            </div>

            <EMICalculator defaultPrice={vehicle.price} />
          </div>
        </div>

        {/* Related Vehicles */}
        {related.length > 0 && (
          <div className="mt-20 pt-20 border-t border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-10 text-center md:text-left">
              Similar Vehicles You May Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((v) => (
                <VehicleCard key={v.id} vehicle={v} onClick={() => onSelectOther(v)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = ({ setPage, setSelectedVehicle }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1600"
            className="w-full h-full object-cover opacity-20"
            alt="Hero"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <span className="bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block border border-white/20">
              Trusted Excellence Since 2010
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]">
              Quality Used Cars for <span className="text-blue-400 underline decoration-blue-500/30">Smart Buyers</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
              Explore Delhi's finest collection of certified pre-owned vehicles with 200-point inspection and easy
              financing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setPage("cars")}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
              >
                Explore All Cars <ArrowRight size={22} />
              </button>
              <button
                onClick={() => setPage("contact")}
                className="bg-white text-blue-900 px-10 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all active:scale-95 shadow-xl shadow-black/10"
              >
                Contact Dealer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">Featured Collection</h2>
              <p className="text-gray-500 mt-2 text-lg">Hand-picked vehicles based on high demand</p>
            </div>
            <button
              onClick={() => setPage("cars")}
              className="text-blue-600 font-bold flex items-center gap-2 group hover:gap-3 transition-all"
            >
              View Entire Inventory <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VEHICLES.slice(0, 4).map((v) => (
              <VehicleCard
                key={v.id}
                vehicle={v}
                onClick={() => {
                  setSelectedVehicle(v);
                  setPage("details");
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form + Map Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Quick Enquiry Form */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col">
              <div className="mb-8">
                <h2 className="text-4xl font-black text-gray-900 mb-3">Get an Instant Quote</h2>
                <p className="text-gray-500 font-medium">
                  Leave your details and our expert will call you back within 15 minutes.
                </p>
              </div>

              <form className="space-y-5 flex-1" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Rahul Sharma"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-blue-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-blue-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-gray-400 tracking-wider ml-1">
                    I'm Interested In
                  </label>
                  <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-blue-500 focus:bg-white transition-all font-semibold appearance-none">
                    <option>Buying a Car</option>
                    <option>Selling my Car</option>
                    <option>Bike Enquiry</option>
                    <option>Financing / EMI Assistance</option>
                  </select>
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] mt-4">
                  Request Callback
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200 h-[500px] lg:h-auto min-h-[450px] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827188812!2d77.2065171!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b71ec4147c!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1676880000000!5m2!1sen!2sin"
                className="w-full h-full border-0 brightness-95 group-hover:brightness-100 transition-all duration-500"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
              <div className="absolute bottom-8 left-8 right-8">
                <a
                  href="https://goo.gl/maps/placeholder"
                  className="bg-white text-blue-900 py-4 px-8 rounded-2xl font-black shadow-2xl flex items-center justify-center gap-3 hover:bg-blue-50 transition-colors active:scale-95"
                >
                  <Navigation size={22} className="text-blue-600" /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Inventory = ({ setSelectedVehicle, setPage }) => {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = VEHICLES.filter((v) => {
    const matchesCategory = filter === "All" || v.type === filter;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 animate-in fade-in duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-gray-900 tracking-tight">Certified Inventory</h1>
          <p className="text-gray-500 mt-4 text-lg">Browse {VEHICLES.length} vehicles ready for immediate delivery</p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by brand or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-blue-500"
            />
          </div>
          <div className="flex p-1.5 bg-gray-200 rounded-2xl">
            {["All", "Car", "Bike"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${filter === cat ? "bg-white text-blue-600 shadow-md" : "text-gray-500 hover:text-gray-700"}`}
              >
                {cat}s
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((v) => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onClick={() => {
                setSelectedVehicle(v);
                setPage("details");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-white flex items-center">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h1 className="text-5xl font-black mb-6">Let's Talk Cars</h1>
        <p className="text-gray-600 text-lg mb-12 leading-relaxed">
          Fill out the simple form below or call us directly. Our showroom is open all 7 days of the week.
        </p>

        <form className="space-y-4 text-left">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Your Name"
              className="p-4 bg-gray-50 border border-gray-200 rounded-2xl w-full outline-blue-500"
            />
            <input
              placeholder="Phone Number"
              className="p-4 bg-gray-50 border border-gray-200 rounded-2xl w-full outline-blue-500"
            />
          </div>
          <textarea
            rows="4"
            placeholder="How can we help you today?"
            className="p-4 bg-gray-50 border border-gray-200 rounded-2xl w-full outline-blue-500 resize-none"
          ></textarea>
          <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-500/20 active:scale-[0.98]">
            Submit Enquiry
          </button>
        </form>
      </div>
    </div>
  );
};

// --- App Entry ---

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  }, [page, selectedVehicle]);

  return (
    <div className="font-sans antialiased text-gray-900 bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || page !== "home" ? "bg-white/90 backdrop-blur-xl shadow-sm py-3" : "bg-transparent py-6"}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <button onClick={() => setPage("home")} className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl text-white group-hover:rotate-[15deg] transition-transform">
              <Star fill="white" size={20} />
            </div>
            <span
              className={`text-2xl font-black tracking-tighter ${scrolled || page !== "home" ? "text-gray-900" : "text-white"}`}
            >
              Your<span className="text-blue-500">Company</span>
            </span>
          </button>

          <div
            className={`hidden md:flex items-center gap-10 ${scrolled || page !== "home" ? "text-gray-700" : "text-white"}`}
          >
            <button
              onClick={() => setPage("home")}
              className="font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setPage("cars")}
              className="font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              Inventory
            </button>
            <button
              onClick={() => setPage("contact")}
              className="font-bold text-sm uppercase tracking-widest hover:text-blue-500 transition-colors"
            >
              Contact
            </button>
            <a
              href="tel:+919876543210"
              className="bg-blue-600 text-white px-7 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/10 active:scale-95"
            >
              Call
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl ${scrolled || page !== "home" ? "text-gray-900" : "text-white"}`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white p-6 flex flex-col gap-8 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-black tracking-tighter">
              Your<span className="text-blue-500">Company</span>
            </span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-xl">
              <X size={28} />
            </button>
          </div>
          <button onClick={() => setPage("home")} className="text-4xl font-black text-left">
            Home
          </button>
          <button onClick={() => setPage("cars")} className="text-4xl font-black text-left">
            Inventory
          </button>
          <button onClick={() => setPage("contact")} className="text-4xl font-black text-left">
            Contact Us
          </button>
          <div className="mt-auto grid grid-cols-2 gap-4">
            <a
              href="tel:+919876543210"
              className="bg-blue-600 text-white py-5 rounded-2xl font-black text-center flex items-center justify-center gap-3"
            >
              <Phone size={20} /> Call
            </a>
            <a
              href="https://wa.me/919876543210"
              className="bg-green-500 text-white py-5 rounded-2xl font-black text-center flex items-center justify-center gap-3"
            >
              <MessageCircle size={20} /> Chat
            </a>
          </div>
        </div>
      )}

      {/* Main Content Router */}
      <main>
        {page === "home" && <Home setPage={setPage} setSelectedVehicle={setSelectedVehicle} />}
        {page === "cars" && <Inventory setPage={setPage} setSelectedVehicle={setSelectedVehicle} />}
        {page === "details" && (
          <VehicleDetails
            vehicle={selectedVehicle}
            onBack={() => setPage("cars")}
            onSelectOther={(v) => setSelectedVehicle(v)}
          />
        )}
        {page === "contact" && <Contact />}
      </main>

      {/* Professional Footer */}
      <footer className="bg-[#0f172a] pt-24 pb-12 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
            {/* Branding Column */}
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                  <Star fill="white" size={24} />
                </div>
                <span className="text-3xl font-black tracking-tighter">
                  Your<span className="text-blue-500">Company</span>
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Delhi NCR's premier multi-brand used car showroom. We specialize in certified luxury and budget vehicles
                with a promise of 100% transparency.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 bg-gray-800/50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-xl font-bold mb-8 relative inline-block">
                Quick Shop
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></div>
              </h4>
              <ul className="space-y-4 text-gray-400 font-semibold">
                <li>
                  <button onClick={() => setPage("home")} className="hover:text-blue-500 transition-colors">
                    Home Page
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage("cars")} className="hover:text-blue-500 transition-colors">
                    Our Inventory
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage("cars")} className="hover:text-blue-500 transition-colors">
                    Premium Cars
                  </button>
                </li>
                <li>
                  <button onClick={() => setPage("cars")} className="hover:text-blue-500 transition-colors">
                    Budget Bikes
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-8 relative inline-block">
                Support
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></div>
              </h4>
              <ul className="space-y-4 text-gray-400 font-semibold">
                <li>
                  <button className="hover:text-blue-500 transition-colors">EMI Calculator</button>
                </li>
                <li>
                  <button className="hover:text-blue-500 transition-colors">Sell Your Car</button>
                </li>
                <li>
                  <button className="hover:text-blue-500 transition-colors">Car Valuation</button>
                </li>
                <li>
                  <button onClick={() => setPage("contact")} className="hover:text-blue-500 transition-colors">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-xl font-bold mb-8 relative inline-block">
                Store Location
                <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></div>
              </h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-gray-800 p-3 rounded-xl h-fit">
                    <MapPin className="text-blue-500" size={20} />
                  </div>
                  <p className="text-gray-400 font-medium">
                    Block H, Inner Circle, Connaught Place, New Delhi - 110001
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gray-800 p-3 rounded-xl h-fit">
                    <Phone className="text-blue-500" size={20} />
                  </div>
                  <p className="text-gray-400 font-medium">+91 98765 43210</p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gray-800 p-3 rounded-xl h-fit">
                    <Clock className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 font-medium">Mon - Sun: 10AM - 9PM</p>
                    <p className="text-xs text-blue-500 font-bold mt-1">Open on Public Holidays</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm font-medium">
              © 2024 Your Company Automobiles Pvt. Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-gray-500 text-sm font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
}
