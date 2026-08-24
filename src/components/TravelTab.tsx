import React, { useState } from 'react';
import {
  Plane,
  Train,
  MapPin,
  Compass,
  Calendar,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgePercent,
  Search,
  Sparkles,
  Luggage,
} from 'lucide-react';
import {
  TOP_TRAVEL_DESTINATIONS,
  TRAVEL_SERVICES_GUIDES,
  TravelDestination,
  TravelServiceGuide,
} from '../data/travelData';

interface TravelTabProps {
  onSaveItem?: (title: string, type: string) => void;
}

export const TravelTab: React.FC<TravelTabProps> = ({ onSaveItem }) => {
  const [activeSubTab, setActiveSubTab] = useState<'destinations' | 'irctc' | 'digiyatra' | 'passport'>('destinations');
  const [destinationFilter, setDestinationFilter] = useState<string>('All');

  const filteredDestinations =
    destinationFilter === 'All'
      ? TOP_TRAVEL_DESTINATIONS
      : TOP_TRAVEL_DESTINATIONS.filter((d) => d.category === destinationFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-sky-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-sky-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-400/30 rounded-full text-sky-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>High-CPM Travel, Tourism & Pilgrimage Intelligence 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Hotels, Flights, IRCTC Tatkal Hacks & Destinations
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Curated spiritual & heritage circuits (Bodh Gaya, Nalanda, Rajgir, Kashi), verified IRCTC Tatkal booking master-list hacks, DigiYatra fast-track airport gates, and Passport Seva guidelines.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Direct Flight & Hotel Best Price Deal Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Subtab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'destinations', label: 'Top Circuits & Destinations', icon: MapPin },
          { id: 'irctc', label: 'IRCTC Tatkal Booking Hacks', icon: Train },
          { id: 'digiyatra', label: 'DigiYatra Fast Airport Entry', icon: Plane },
          { id: 'passport', label: 'Passport Seva & Tatkaal Guide', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                isActive
                  ? 'bg-sky-950 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 🗺️ SUBTAB 1: DESTINATIONS */}
      {activeSubTab === 'destinations' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Pilgrimage & Spiritual', 'Beach & Leisure'].map((cat) => (
              <button
                key={cat}
                onClick={() => setDestinationFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  destinationFilter === cat
                    ? 'bg-sky-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-600">
                      {dest.stateOrCircuit}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-lg mt-0.5">{dest.name}</h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{dest.overview}</p>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Best Time:</span>
                      <span className="font-bold text-slate-900">{dest.bestTimeToVisit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Ideal Duration:</span>
                      <span className="font-bold text-sky-900">{dest.idealDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-semibold">Est. Budget:</span>
                      <span className="font-bold text-emerald-600">{dest.estimatedBudgetPerPerson}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-800">Key Attractions:</div>
                    <ul className="space-y-1 text-slate-600">
                      {dest.topAttractions.slice(0, 3).map((att, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="line-clamp-1">{att}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="https://omg10.com/4/11640571"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-sky-900 hover:bg-sky-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <span>Check Hotel & Travel Deals</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🚂 SUBTAB 2: IRCTC TATKAL HACKS */}
      {activeSubTab === 'irctc' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider">
                Indian Railways (IRCTC) Booking Blueprint
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                How to Book Confirmed IRCTC Tatkal Tickets in 2026
              </h2>
            </div>

            <div className="bg-sky-50 text-sky-900 font-extrabold text-xs px-4 py-2 rounded-2xl border border-sky-200">
              AC: 10:00 AM | Sleeper: 11:00 AM
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>The 5-Step Tatkal Success Routine:</span>
              </h3>
              <ul className="space-y-2">
                <li>1. <strong>Pre-Fill Master Passenger List:</strong> Add all passenger names, ages, and berth preferences in your IRCTC profile before 9:45 AM.</li>
                <li>2. <strong>Use IRCTC e-Wallet:</strong> Top up wallet in advance. It eliminates bank SMS OTP delays and books within 3 seconds.</li>
                <li>3. <strong>Precise Login Timing:</strong> Login at 9:58 AM (for AC) or 10:58 AM (for Sleeper) to avoid session expiry.</li>
                <li>4. <strong>Automated Auto-Fill:</strong> Use official IRCTC App or synchronized Chrome desktop for maximum bandwidth.</li>
              </ul>
              <a
                href="https://www.irctc.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-800 font-bold hover:underline pt-2"
              >
                <span>Official IRCTC Booking Portal (irctc.co.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Premium Tatkal & Cancellation Rules:</span>
              </h3>
              <ul className="space-y-2">
                <li>• <strong>Dynamic Pricing:</strong> Premium Tatkal (PT) fares increase with demand and available seats.</li>
                <li>• <strong>Refund on Confirmed Tatkal:</strong> No refund is granted on confirmed Tatkal ticket cancellation (except if train is cancelled or delayed &gt; 3 hours).</li>
                <li>• <strong>RAC / Waitlist Tatkal:</strong> Full refund minus clerkage charge if ticket remains waitlisted after chart preparation.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ✈️ SUBTAB 3: DIGIYATRA */}
      {activeSubTab === 'digiyatra' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider">
              Ministry of Civil Aviation Biometric Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              DigiYatra: Contactless 5-Second Airport Security Entry
            </h2>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-700">
            <p className="text-slate-600 leading-relaxed text-sm">
              DigiYatra uses facial recognition technology to provide seamless, paperless check-in and security clearance across Delhi (DEL), Patna (PAT), Mumbai (BOM), Bengaluru (BLR), and 24+ airports in India.
            </p>
            <ul className="space-y-2 pt-2">
              <li>• <strong>Zero Document Showing:</strong> No need to display physical Aadhaar or paper boarding pass at airport gates.</li>
              <li>• <strong>Dedicated Fast-Track Gates:</strong> Skip long 30-minute standard security queues.</li>
              <li>• <strong>100% Privacy Preserved:</strong> Biometrics are stored encrypted locally on your phone, not in a central government database.</li>
            </ul>
            <a
              href="https://www.digiyatrafoundation.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-800 font-bold hover:underline pt-2"
            >
              <span>DigiYatra Official Portal & App Download</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* 🛂 SUBTAB 4: PASSPORT SEVA */}
      {activeSubTab === 'passport' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider">
              Ministry of External Affairs (MEA)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Passport Seva Kendra (PSK) & Tatkaal Fast-Track Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Standard vs Tatkaal Passport:</h3>
              <div className="space-y-2">
                <div>• <strong>Normal Passport Fee:</strong> ₹1,500 (36 pages) / ₹2,000 (60 pages). Dispatched within 10-15 working days.</div>
                <div>• <strong>Tatkaal Passport Fee:</strong> ₹3,500. Dispatched within 1-3 business days without waiting for prior police verification.</div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-extrabold text-slate-900 text-sm">Mandatory Documents to Carry:</h3>
              <ul className="space-y-1.5">
                <li>• Original Aadhaar Card with updated mobile number.</li>
                <li>• PAN Card or Voter ID for photo identification.</li>
                <li>• 10th Standard School Leaving Certificate (for Non-ECR Emigration Check Not Required status).</li>
                <li>• Nationalized Bank Passbook with applicant photo & stamp.</li>
              </ul>
              <a
                href="https://www.passportindia.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sky-800 font-bold hover:underline pt-2"
              >
                <span>Official Passport Seva Portal (passportindia.gov.in)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
