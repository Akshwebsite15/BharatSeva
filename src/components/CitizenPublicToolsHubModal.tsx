import React, { useState } from 'react';
import {
  X,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
  IndianRupee,
  ShoppingBag,
  Wallet,
  MapPin,
  Car,
  HeartPulse,
  Phone,
  Copy,
  Check,
  ChevronRight,
  Info,
  Sparkles,
  Share2,
  Calculator,
  ArrowUpRight,
} from 'lucide-react';
import { TRENDING_PUBLIC_TOOLS, PublicToolItem } from '../data/publicToolsData';

interface CitizenPublicToolsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialToolId?: string;
  showToast?: (msg: string) => void;
}

export const CitizenPublicToolsHubModal: React.FC<CitizenPublicToolsHubModalProps> = ({
  isOpen,
  onClose,
  initialToolId = 'ration-card',
  showToast,
}) => {
  const [selectedToolId, setSelectedToolId] = useState<string>(initialToolId);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Interactive Widget States
  // 1. Ration Calculator
  const [familyMembers, setFamilyMembers] = useState<number>(4);
  const [cardType, setCardType] = useState<'PHH' | 'AAY'>('PHH');

  // 2. PM Kisan Checklist
  const [landSeedingChecked, setLandSeedingChecked] = useState(true);
  const [eKycChecked, setEKycChecked] = useState(true);
  const [npciBankChecked, setNpciBankChecked] = useState(true);

  // 3. Traffic Sign LL Mock Test
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  if (!isOpen) return null;

  const currentTool =
    TRENDING_PUBLIC_TOOLS.find((t) => t.id === selectedToolId) || TRENDING_PUBLIC_TOOLS[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    if (showToast) showToast(`✅ Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleShareTool = (tool: PublicToolItem) => {
    const text = `📌 *${tool.title}* (${tool.hindiTitle})\n\n` +
      `Official Portal: ${tool.officialUrl}\n` +
      `Search status & download online for free on BharatSeva: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Grain Calculation for PMGKAY
  const calculatedRice = cardType === 'AAY' ? 21 : familyMembers * 3;
  const calculatedWheat = cardType === 'AAY' ? 14 : familyMembers * 2;
  const totalGrains = cardType === 'AAY' ? 35 : familyMembers * 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-4 sm:p-6 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white flex items-center justify-center font-black shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Daily Public Services & Citizen Status Hub (नागरिक सेवा केंद्र)
                </h3>
                <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" /> Official Direct Portals
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                Most searched utilities on Google: Ration Card, PM Kisan ₹2000, EPFO PF Passbook, Bhulekh, Aadhaar-PAN, LPG & Ayushman
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-4 overflow-y-auto flex-1">
          {/* Left Column: Quick Tool Selector Navigation List */}
          <div className="lg:col-span-4 space-y-1.5 overflow-y-auto max-h-56 lg:max-h-full pr-1">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block px-2 mb-1">
              Top Searched Citizen Services (8 Major Portals)
            </span>
            {TRENDING_PUBLIC_TOOLS.map((tool) => {
              const isSelected = tool.id === currentTool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedToolId(tool.id)}
                  className={`w-full text-left p-3 rounded-2xl transition cursor-pointer flex items-center justify-between gap-2 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-slate-900 to-indigo-950 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-2xs'
                      }`}
                    >
                      {tool.id === 'ration-card' && <ShoppingBag className="w-4 h-4 text-emerald-400" />}
                      {tool.id === 'pm-kisan' && <IndianRupee className="w-4 h-4 text-amber-400" />}
                      {tool.id === 'epfo-passbook' && <Wallet className="w-4 h-4 text-blue-400" />}
                      {tool.id === 'bhulekh-land' && <MapPin className="w-4 h-4 text-teal-400" />}
                      {tool.id === 'aadhaar-pan' && <ShieldCheck className="w-4 h-4 text-purple-400" />}
                      {tool.id === 'lpg-subsidy' && <Flame className="w-4 h-4 text-rose-400" />}
                      {tool.id === 'echallan-parivahan' && <Car className="w-4 h-4 text-indigo-400" />}
                      {tool.id === 'ayushman-card' && <HeartPulse className="w-4 h-4 text-pink-400" />}
                    </div>
                    <div className="truncate">
                      <span className="text-xs font-black block truncate">{tool.title}</span>
                      <span
                        className={`text-[10px] block truncate ${
                          isSelected ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {tool.hindiTitle}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tool.searchesPerMonth}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Tool Interactive Deep Dive & Live Utility */}
          <div className="lg:col-span-8 space-y-4 overflow-y-auto">
            {/* Tool Banner */}
            <div
              className={`p-4 sm:p-5 rounded-3xl text-white shadow-md bg-gradient-to-br ${currentTool.colorGradient} flex flex-col justify-between gap-3`}
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                    {currentTool.badge}
                  </span>
                  <span className="bg-black/20 px-2 py-0.5 rounded-full text-[10px] font-bold text-white/90">
                    Portal: {currentTool.officialPortalName}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">{currentTool.title}</h2>
                <p className="text-xs text-white/90 font-medium leading-relaxed">
                  {currentTool.hindiTitle}
                </p>
                <p className="text-xs text-white/80 font-normal leading-relaxed pt-1">
                  {currentTool.shortDesc}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/20">
                <a
                  href={currentTool.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-4 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition active:scale-95 cursor-pointer"
                >
                  <span>Open Official Govt Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
                </a>

                <button
                  onClick={() => handleShareTool(currentTool)}
                  className="py-2 px-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 backdrop-blur-md transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>

            {/* INTERACTIVE LIVE UTILITY WIDGETS BASED ON SELECTED TOOL */}
            {/* Widget 1: Ration Card Grain Allocation Calculator */}
            {currentTool.id === 'ration-card' && (
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-700" />
                    <span>Free Foodgrain Entitlement Calculator (PMGKAY 2026)</span>
                  </h4>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full">
                    100% Free Grain
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
                  <div>
                    <label className="block mb-1 text-slate-800">Card Category:</label>
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        onClick={() => setCardType('PHH')}
                        className={`py-1.5 rounded-lg text-xs font-black transition ${
                          cardType === 'PHH'
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white border border-emerald-300 text-emerald-900'
                        }`}
                      >
                        Priority (PHH)
                      </button>
                      <button
                        onClick={() => setCardType('AAY')}
                        className={`py-1.5 rounded-lg text-xs font-black transition ${
                          cardType === 'AAY'
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white border border-emerald-300 text-emerald-900'
                        }`}
                      >
                        Antyodaya (AAY)
                      </button>
                    </div>
                  </div>

                  {cardType === 'PHH' && (
                    <div>
                      <div className="flex justify-between mb-1 text-slate-800">
                        <span>Family Members in Ration Card:</span>
                        <span className="text-emerald-900 font-black">{familyMembers} Persons</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={familyMembers}
                        onChange={(e) => setFamilyMembers(parseInt(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>
                  )}
                </div>

                {/* Calculation Output */}
                <div className="bg-white p-3 rounded-xl border border-emerald-200 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-black block">
                      Free Rice (चावल)
                    </span>
                    <span className="text-base font-black text-emerald-900">{calculatedRice} Kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-black block">
                      Free Wheat (गेहूं)
                    </span>
                    <span className="text-base font-black text-emerald-900">{calculatedWheat} Kg</span>
                  </div>
                  <div className="border-l border-emerald-100 pl-2">
                    <span className="text-[10px] text-emerald-700 uppercase font-black block">
                      Total Monthly Grain
                    </span>
                    <span className="text-base font-black text-emerald-950">{totalGrains} Kg / Month</span>
                  </div>
                </div>
              </div>
            )}

            {/* Widget 2: PM Kisan 3-Point Eligibility & Land Seeding Checklist */}
            {currentTool.id === 'pm-kisan' && (
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                    <span>Check Why Your ₹2000 Installment Is Stopped or Pending:</span>
                  </h4>
                  <span className="text-[10px] bg-amber-200 text-amber-950 font-extrabold px-2 py-0.5 rounded-full">
                    3-Point Checklist
                  </span>
                </div>

                <div className="space-y-2 text-xs font-bold text-slate-800">
                  <label
                    onClick={() => setLandSeedingChecked(!landSeedingChecked)}
                    className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-amber-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={landSeedingChecked}
                      onChange={() => {}}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                    <div>
                      <span className="font-extrabold text-slate-900 block">
                        1. Land Seeding Status = YES (भूमि विवरण सत्यापन)
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        If NO: Submit Jamabandi copy to Circle Officer / Agriculture Coordinator.
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setEKycChecked(!eKycChecked)}
                    className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-amber-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={eKycChecked}
                      onChange={() => {}}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                    <div>
                      <span className="font-extrabold text-slate-900 block">
                        2. eKYC Done = YES (आधार ओटीपी सत्यापन)
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        If NO: Complete OTP eKYC on pmkisan.gov.in in 2 minutes.
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setNpciBankChecked(!npciBankChecked)}
                    className="flex items-center space-x-2.5 p-2 bg-white rounded-xl border border-amber-200 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={npciBankChecked}
                      onChange={() => {}}
                      className="w-4 h-4 accent-amber-600 rounded"
                    />
                    <div>
                      <span className="font-extrabold text-slate-900 block">
                        3. Aadhaar Bank Account DBT / NPCI Seeding = Active
                      </span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        If NO: Visit your bank branch or open India Post Payments Bank (IPPB) DBT account.
                      </span>
                    </div>
                  </label>
                </div>

                <div
                  className={`p-2.5 rounded-xl text-xs font-black flex items-center space-x-2 ${
                    landSeedingChecked && eKycChecked && npciBankChecked
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-rose-100 text-rose-900'
                  }`}
                >
                  {landSeedingChecked && eKycChecked && npciBankChecked ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>All 3 conditions satisfied! Your next ₹2,000 installment will be credited smoothly.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                      <span>Please fix the unchecked parameters above to receive your ₹2,000 payment.</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Widget 3: EPFO 1-Click Missed Call & SMS Direct Balance Numbers */}
            {currentTool.id === 'epfo-passbook' && (
              <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-blue-950 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-blue-700" />
                    <span>Instant PF Balance without Password / Login:</span>
                  </h4>
                  <span className="text-[10px] bg-blue-200 text-blue-950 font-extrabold px-2 py-0.5 rounded-full">
                    Official EPFO
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-800">
                        📞 Missed Call Service (Toll-Free)
                      </span>
                      <p className="text-sm font-black text-slate-900 tracking-wider">9966044425</p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Give missed call from UAN-registered mobile; receive SMS with total PF balance in 30 seconds.
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy('9966044425', 'EPFO Missed Call Number')}
                      className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-black flex items-center justify-center gap-1 cursor-pointer transition"
                    >
                      {copiedText === '9966044425' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === '9966044425' ? 'Copied' : 'Copy Number'}</span>
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-blue-200 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase text-blue-800">
                        💬 SMS Service
                      </span>
                      <p className="text-xs font-black text-slate-900">
                        Send: <strong className="text-blue-900">EPFOHO UAN ENG</strong> to <strong className="text-blue-900">7738299899</strong>
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        (Replace ENG with HIN for Hindi SMS balance).
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy('EPFOHO UAN ENG', 'SMS Format')}
                      className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-lg text-xs font-black flex items-center justify-center gap-1 cursor-pointer transition"
                    >
                      {copiedText === 'EPFOHO UAN ENG' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText === 'EPFOHO UAN ENG' ? 'Copied Text' : 'Copy SMS Format'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Widget 4: LPG WhatsApp Cylinder Booking 1-Tap Directory */}
            {currentTool.id === 'lpg-subsidy' && (
              <div className="bg-rose-50/80 border border-rose-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-700" />
                    <span>1-Tap Official LPG Refill Booking on WhatsApp:</span>
                  </h4>
                  <span className="text-[10px] bg-rose-200 text-rose-950 font-extrabold px-2 py-0.5 rounded-full">
                    ₹300 Subsidy Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                  {/* Indane */}
                  <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-1 text-center">
                    <span className="text-xs font-black text-rose-900 block">Indane Gas (IOCL)</span>
                    <span className="text-[11px] text-slate-700 font-bold block font-mono">7718955555</span>
                    <a
                      href="https://wa.me/917718955555?text=REFILL"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black mt-1"
                    >
                      Book on WhatsApp
                    </a>
                  </div>

                  {/* Bharat Gas */}
                  <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-1 text-center">
                    <span className="text-xs font-black text-amber-900 block">Bharat Gas (BPCL)</span>
                    <span className="text-[11px] text-slate-700 font-bold block font-mono">1800224344</span>
                    <a
                      href="https://wa.me/911800224344?text=Hi"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black mt-1"
                    >
                      Book on WhatsApp
                    </a>
                  </div>

                  {/* HP Gas */}
                  <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-1 text-center">
                    <span className="text-xs font-black text-blue-900 block">HP Gas (HPCL)</span>
                    <span className="text-[11px] text-slate-700 font-bold block font-mono">9222201122</span>
                    <a
                      href="https://wa.me/919222201122?text=Hi"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black mt-1"
                    >
                      Book on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Widget 5: Parivahan Learning License Traffic Sign Mock Question */}
            {currentTool.id === 'echallan-parivahan' && (
              <div className="bg-indigo-50/80 border border-indigo-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-indigo-950 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-indigo-700" />
                    <span>Learning License (LL) Online Exam Quick Practice:</span>
                  </h4>
                  <span className="text-[10px] bg-indigo-200 text-indigo-950 font-extrabold px-2 py-0.5 rounded-full">
                    Parivahan Mock Q
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-indigo-200 space-y-2">
                  <p className="text-xs font-extrabold text-slate-900">
                    Q: Near a pedestrian crossing (Zebra Crossing), when pedestrians are waiting to cross the road, you should:
                  </p>

                  <div className="space-y-1.5 text-xs">
                    {[
                      { id: 0, text: 'Sound horn and proceed at the same speed', correct: false },
                      { id: 1, text: 'Slow down, stop before zebra line and wait until pedestrians have crossed', correct: true },
                      { id: 2, text: 'Overtake vehicle ahead and speed up', correct: false },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSelectedAnswer(opt.id);
                          setQuizAnswered(true);
                        }}
                        className={`w-full text-left p-2 rounded-lg font-medium transition flex items-center justify-between ${
                          quizAnswered && opt.correct
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-black'
                            : quizAnswered && selectedAnswer === opt.id && !opt.correct
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : selectedAnswer === opt.id
                            ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {quizAnswered && opt.correct && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Widget 6: Ayushman Card Free Treatment Savings Explorer */}
            {currentTool.id === 'ayushman-card' && (
              <div className="bg-pink-50/80 border border-pink-200 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-pink-950 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-pink-700" />
                    <span>Free Surgeries & Cashless Treatments under PM-JAY ₹5 Lakh:</span>
                  </h4>
                  <span className="text-[10px] bg-pink-200 text-pink-950 font-extrabold px-2 py-0.5 rounded-full">
                    Zero Out-of-Pocket
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-black">
                  <div className="p-2.5 bg-white rounded-xl border border-pink-200">
                    <span className="text-[10px] text-slate-500 font-bold block">Angioplasty / Stent</span>
                    <span className="text-pink-900 font-black">Save ₹1.5 - 2.5L</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-pink-200">
                    <span className="text-[10px] text-slate-500 font-bold block">Knee Replacement</span>
                    <span className="text-pink-900 font-black">Save ₹1.2 - 2.0L</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-pink-200">
                    <span className="text-[10px] text-slate-500 font-bold block">Kidney Dialysis</span>
                    <span className="text-pink-900 font-black">Free (Save ₹30k/mo)</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-pink-200">
                    <span className="text-[10px] text-slate-500 font-bold block">Cancer Chemotherapy</span>
                    <span className="text-pink-900 font-black">Save ₹2.0 - 5.0L</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step-by-Step Execution Guide */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-600" />
                <span>How to Check Status & Apply Online (Step-by-Step):</span>
              </h4>

              <div className="space-y-2">
                {currentTool.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5 font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights & Warnings */}
            <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2 text-xs">
              <span className="font-extrabold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Important Citizen Safeguards & Rules:
              </span>
              <ul className="space-y-1.5 text-slate-300 text-[11px]">
                {currentTool.keyHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {currentTool.helpline && (
                <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-400 font-bold">
                  📞 {currentTool.helpline}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline">
            Direct authenticated gateways to official National & State Government portals.
          </span>
          <button
            onClick={onClose}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
          >
            Close Utility Hub
          </button>
        </div>
      </div>
    </div>
  );
};
