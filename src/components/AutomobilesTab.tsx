import React, { useState } from 'react';
import {
  Car,
  Fuel,
  ShieldCheck,
  Zap,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  BadgePercent,
  Search,
  Sparkles,
  Sliders,
  DollarSign,
} from 'lucide-react';
import {
  TOP_VEHICLES_DATA,
  PARIVAHAN_SERVICES,
  VehicleItem,
} from '../data/automobilesData';
import { DynamicHighCpmAdSlot } from './DynamicHighCpmAdSlot';
import { useAdRefresh } from '../hooks/useAdRefresh';

interface AutomobilesTabProps {
  onSaveItem?: (title: string, type: string) => void;
}

export const AutomobilesTab: React.FC<AutomobilesTabProps> = ({ onSaveItem }) => {
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>('All');
  const [activeSubTab, setActiveSubTab] = useState<'vehicles' | 'insurance' | 'parivahan' | 'ev-calc'>('vehicles');

  // Dynamic High-CPM Ad Refresh on Subtab Switch
  useAdRefresh({
    activeTab: 'automobiles',
    subTab: activeSubTab,
    category: 'automobiles',
    dwellRefreshIntervalSeconds: 35,
    enabled: true,
  });

  // EV vs Petrol Monthly Savings Calculator state
  const [monthlyKm, setMonthlyKm] = useState<number>(1200); // 1,200 km per month
  const [petrolPrice, setPetrolPrice] = useState<number>(104); // ₹104/litre
  const [petrolMileage, setPetrolMileage] = useState<number>(16); // 16 km/l

  // EV Math: ~7 km per kWh, electricity ~₹7.50 per unit
  const monthlyPetrolCost = Math.round((monthlyKm / petrolMileage) * petrolPrice);
  const monthlyEvCost = Math.round((monthlyKm / 7) * 7.5);
  const monthlySavings = monthlyPetrolCost - monthlyEvCost;
  const annualSavings = monthlySavings * 12;

  const filteredVehicles =
    vehicleTypeFilter === 'All'
      ? TOP_VEHICLES_DATA
      : TOP_VEHICLES_DATA.filter((v) => v.type === vehicleTypeFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-zinc-900 to-red-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-red-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-xs font-bold uppercase tracking-wider">
            <Car className="w-3.5 h-3.5" />
            <span>High-CPM Automobiles & Parivahan Mobility Hub 2026</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Cars, Electric Vehicles, Motor Insurance & Parivahan
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Real-world mileage benchmarks, 5-Star Bharat NCAP safety ratings, Car/Bike insurance claim guides, Sarathi Driving Licence online services, and live EV fuel savings calculators.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-md transition hover:scale-105"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Direct Fast-Track Car Loan & Insurance Server</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Subtab Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'vehicles', label: 'Top Cars, EVs & Bikes 2026', icon: Car },
          { id: 'ev-calc', label: 'EV Fuel Savings Calculator', icon: Zap },
          { id: 'insurance', label: 'Motor Insurance & IDV Guide', icon: ShieldCheck },
          { id: 'parivahan', label: 'Sarathi & Parivahan Portals', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                isActive
                  ? 'bg-red-950 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic High-CPM Automobiles & Insurance Slot */}
      <DynamicHighCpmAdSlot
        slotId="automobiles-main-banner"
        category="automobiles"
        format="banner"
        showManualRefresh={true}
        className="shadow-md"
      />

      {/* 🚗 SUBTAB 1: VEHICLES */}
      {activeSubTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {['All', 'Car / SUV', 'Electric Vehicle (EV)', 'Motorcycle', 'Scooter'].map((type) => (
              <button
                key={type}
                onClick={() => setVehicleTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  vehicleTypeFilter === type
                    ? 'bg-red-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-600">
                        {veh.brand} • {veh.type}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-lg mt-0.5">{veh.name}</h3>
                    </div>
                    {veh.badge && (
                      <span className="bg-red-50 text-red-700 font-extrabold text-[10px] px-2.5 py-1 rounded-full border border-red-200 shrink-0">
                        {veh.badge}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Price (Ex-Showroom):</div>
                      <div className="font-black text-slate-900">{veh.priceRangeExShowroom}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Mileage / Range:</div>
                      <div className="font-black text-emerald-600">{veh.mileageOrRange}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Transmission:</div>
                      <div className="font-semibold text-slate-700">{veh.transmission}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 font-bold uppercase text-[10px]">Safety Rating:</div>
                      <div className="font-semibold text-blue-900">{veh.safetyRating}</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-800">Top Standout Features:</div>
                    <ul className="space-y-1 text-slate-600">
                      {veh.keyFeatures.map((kf, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{kf}</span>
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
                    className="w-full py-2.5 bg-red-900 hover:bg-red-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <span>Check On-Road Price & Discount</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⚡ SUBTAB 2: EV CALCULATOR */}
      {activeSubTab === 'ev-calc' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider">
                Electric Mobility Economics
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                EV vs Petrol Monthly Running Cost Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Calculate your exact fuel expenditure savings switching to an Electric Car or Scooter.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Monthly Commute (Kilometres):</span>
                <span className="text-red-900 text-sm font-black">{monthlyKm.toLocaleString()} km / month</span>
              </div>
              <input
                type="range"
                min={300}
                max={4000}
                step={100}
                value={monthlyKm}
                onChange={(e) => setMonthlyKm(Number(e.target.value))}
                className="w-full accent-red-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>300 km (City Scooter)</span>
                <span>1,500 km (Daily Office)</span>
                <span>4,000 km (High Touring)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Petrol Price (₹ / Litre):</span>
                <span className="text-slate-900 text-sm font-black">₹{petrolPrice} / L</span>
              </div>
              <input
                type="range"
                min={90}
                max={120}
                step={1}
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Number(e.target.value))}
                className="w-full accent-red-900 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold">
                <span className="text-slate-700">Petrol Vehicle Mileage (km/L):</span>
                <span className="text-slate-900 text-sm font-black">{petrolMileage} km/l</span>
              </div>
              <input
                type="range"
                min={10}
                max={60}
                step={1}
                value={petrolMileage}
                onChange={(e) => setPetrolMileage(Number(e.target.value))}
                className="w-full accent-red-900 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-red-950 text-white rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Calculated Fuel Economics
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  ₹{monthlySavings.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300">Net Monthly Cash Saved</div>
              </div>

              <div className="h-px bg-white/15" />

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-300">Monthly Petrol Cost:</span>
                  <span className="font-extrabold text-red-300">₹{monthlyPetrolCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Monthly EV Charging Cost:</span>
                  <span className="font-extrabold text-emerald-300">₹{monthlyEvCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black text-sm pt-2 border-t border-white/10">
                  <span>5-Year Cumulative Savings:</span>
                  <span className="text-amber-300">₹{(annualSavings * 5).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <a
              href="https://omg10.com/4/11640571"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs text-center flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Explore Subsidized EV Test Drives</span>
            </a>
          </div>
        </div>
      )}

      {/* 🛡️ SUBTAB 3: MOTOR INSURANCE */}
      {activeSubTab === 'insurance' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 space-y-6">
          <div>
            <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider">
              Financial Protection on Wheels
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Car & Bike Insurance: Comprehensive vs Zero Depreciation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Depreciation (Bumper-to-Bumper) Policy:</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Covers 100% replacement cost of plastic, rubber, fiber, and metal parts without deducting annual vehicle age depreciation during accident claims. Recommended for all vehicles aged 0-5 years.
              </p>
              <div className="font-bold text-slate-900">Essential Add-On Riders:</div>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Engine Protection Cover:</strong> Protects hydrostatic lock damage during heavy waterlogging/monsoons.</li>
                <li>• <strong>Return to Invoice (RTI):</strong> Pays original ex-showroom price + road tax if vehicle is stolen or totally written off.</li>
                <li>• <strong>24x7 Roadside Assistance (RSA):</strong> Free towing, flat tyre fix, and jumpstart within 50 km.</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <BadgePercent className="w-4 h-4 text-blue-600" />
                <span>No Claim Bonus (NCB) Discount Rules:</span>
              </h3>
              <p className="text-slate-600 leading-relaxed">
                For every claim-free year, insurers reward you with a direct discount on your Own Damage (OD) premium:
              </p>
              <div className="grid grid-cols-2 gap-2 font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                <div>1 Year: 20% NCB</div>
                <div>2 Years: 25% NCB</div>
                <div>3 Years: 35% NCB</div>
                <div>4 Years: 45% NCB</div>
                <div className="col-span-2 text-emerald-700">5+ Consecutive Years: 50% Flat NCB Discount</div>
              </div>
              <p className="text-[11px] text-slate-500">
                <em>Pro Tip:</em> NCB belongs to the owner, not the car. You can transfer your 50% NCB certificate to your new vehicle purchase!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🚦 SUBTAB 4: PARIVAHAN SERVICES */}
      {activeSubTab === 'parivahan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PARIVAHAN_SERVICES.map((srv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600">
                  {srv.portalName}
                </span>
                <h3 className="font-black text-slate-900 text-base">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.description}</p>
              </div>

              <a
                href={srv.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl text-center flex items-center justify-center gap-1.5 transition"
              >
                <span>{srv.actionLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
