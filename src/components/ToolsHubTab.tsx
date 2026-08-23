import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Calculator,
  Percent,
  Coins,
  TrendingUp,
  Clock,
  Heart,
  Scale,
  DollarSign,
  FileSpreadsheet,
  Building,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Share2,
  Upload,
  Download,
  Scissors,
  Sliders,
  Maximize2,
  RotateCw,
  Camera,
  Image as ImageIcon,
} from 'lucide-react';
import { POPULAR_TOOLS_DATA, PopularTool } from '../data/bharatSevaToolsData';

interface ToolsHubTabProps {
  initialToolId?: string;
  onOpenAiModal?: () => void;
  onSaveItem?: (title: string, type: string) => void;
}

interface PhotoPreset {
  id: string;
  name: string;
  type: 'Photo' | 'Signature' | 'Thumb';
  widthPx: number;
  heightPx: number;
  minKb: number;
  maxKb: number;
  description: string;
}

const PHOTO_PRESETS: PhotoPreset[] = [
  {
    id: 'ssc-photo',
    name: 'SSC Photo (CGL, CHSL, MTS, GD)',
    type: 'Photo',
    widthPx: 350,
    heightPx: 450,
    minKb: 20,
    maxKb: 50,
    description: '3.5cm × 4.5cm, 20 KB to 50 KB, Light Background',
  },
  {
    id: 'ssc-sign',
    name: 'SSC Signature (CGL, CHSL, GD)',
    type: 'Signature',
    widthPx: 400,
    heightPx: 200,
    minKb: 10,
    maxKb: 20,
    description: '4.0cm × 2.0cm, 10 KB to 20 KB, Black Ink on White Paper',
  },
  {
    id: 'bpsc-photo',
    name: 'BPSC 71st / Teacher TRE Photo',
    type: 'Photo',
    widthPx: 350,
    heightPx: 450,
    minKb: 25,
    maxKb: 50,
    description: 'Recent Passport size, 25 KB to 50 KB, White background',
  },
  {
    id: 'bpsc-sign',
    name: 'BPSC Signature (Hindi / English)',
    type: 'Signature',
    widthPx: 350,
    heightPx: 150,
    minKb: 10,
    maxKb: 20,
    description: 'Separate Hindi & English sign, 10 KB to 20 KB',
  },
  {
    id: 'nta-neet-photo',
    name: 'NTA (NEET / JEE Main / CUET) Photo',
    type: 'Photo',
    widthPx: 400,
    heightPx: 500,
    minKb: 10,
    maxKb: 200,
    description: 'Passport size with Name & Date plate, 10 - 200 KB',
  },
  {
    id: 'nta-sign',
    name: 'NTA (NEET / JEE / CUET) Signature',
    type: 'Signature',
    widthPx: 350,
    heightPx: 150,
    minKb: 4,
    maxKb: 30,
    description: 'Running hand signature, 4 KB to 30 KB',
  },
  {
    id: 'ibps-bank',
    name: 'IBPS / SBI Bank PO & Clerk Photo',
    type: 'Photo',
    widthPx: 200,
    heightPx: 230,
    minKb: 20,
    maxKb: 50,
    description: '200 × 230 pixels, 20 KB to 50 KB',
  },
  {
    id: 'ibps-sign',
    name: 'IBPS / SBI Bank PO Signature',
    type: 'Signature',
    widthPx: 140,
    heightPx: 60,
    minKb: 10,
    maxKb: 20,
    description: '140 × 60 pixels, 10 KB to 20 KB',
  },
  {
    id: 'rrb-railway',
    name: 'Railway RRB (NTPC / Group D / ALP)',
    type: 'Photo',
    widthPx: 350,
    heightPx: 450,
    minKb: 20,
    maxKb: 50,
    description: '35mm × 45mm, 20 KB to 50 KB',
  },
  {
    id: 'csbc-bihar',
    name: 'CSBC Bihar Police / Daroga SI',
    type: 'Photo',
    widthPx: 350,
    heightPx: 450,
    minKb: 20,
    maxKb: 50,
    description: 'Passport photo with clear ears, 20 KB - 50 KB',
  },
];

export const ToolsHubTab: React.FC<ToolsHubTabProps> = ({
  initialToolId = 'photo-resizer',
  onOpenAiModal,
  onSaveItem,
}) => {
  const [activeToolId, setActiveToolId] = useState<string>(initialToolId);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 1. Photo Resizer States
  const [selectedPreset, setSelectedPreset] = useState<PhotoPreset>(PHOTO_PRESETS[0]);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [processedDataUrl, setProcessedDataUrl] = useState<string | null>(null);
  const [processedKb, setProcessedKb] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [targetKb, setTargetKb] = useState<number>(35);
  const [candidateName, setCandidateName] = useState<string>('');
  const [photoDate, setPhotoDate] = useState<string>('');
  const [includeNameDateStrip, setIncludeNameDateStrip] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. EMI Calculator States
  const [emiPrincipal, setEmiPrincipal] = useState<number>(500000);
  const [emiRate, setEmiRate] = useState<number>(8.5);
  const [emiYears, setEmiYears] = useState<number>(5);

  // 3. SIP Calculator States
  const [sipMonthly, setSipMonthly] = useState<number>(5000);
  const [sipRate, setSipRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  // 4. FD Calculator States
  const [fdPrincipal, setFdPrincipal] = useState<number>(100000);
  const [fdRate, setFdRate] = useState<number>(7.1);
  const [fdYears, setFdYears] = useState<number>(5);

  // 5. RD Calculator States
  const [rdMonthly, setRdMonthly] = useState<number>(3000);
  const [rdRate, setRdRate] = useState<number>(6.7);
  const [rdYears, setRdYears] = useState<number>(3);

  // 6. Income Tax Calculator States
  const [taxIncome, setTaxIncome] = useState<number>(950000);
  const [tax80C, setTax80C] = useState<number>(150000);
  const [tax80D, setTax80D] = useState<number>(25000);

  // 7. GST Calculator States
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  // 8. CGPA to Percentage States
  const [cgpaValue, setCgpaValue] = useState<number>(8.4);
  const [cgpaMultiplier, setCgpaMultiplier] = useState<number>(9.5);

  // 9. Percentage Calculator States
  const [obtainedMarks, setObtainedMarks] = useState<number>(435);
  const [totalMarks, setTotalMarks] = useState<number>(500);

  // 10. Age Calculator for Govt Exams
  const [dob, setDob] = useState<string>('2000-08-15');
  const [cutoffDate, setCutoffDate] = useState<string>('2026-08-01');
  const [examCategory, setExamCategory] = useState<'General' | 'OBC' | 'EBC' | 'SC' | 'ST' | 'EWS'>('General');

  // 11. BMI & Physical Standards States
  const [bmiHeightCm, setBmiHeightCm] = useState<number>(170);
  const [bmiWeightKg, setBmiWeightKg] = useState<number>(68);
  const [bmiGender, setBmiGender] = useState<'Male' | 'Female'>('Male');

  // 12. Salary / In-Hand CTC Calculator States
  const [grossAnnualCtc, setGrossAnnualCtc] = useState<number>(600000);

  // 13. Unit Converter States
  const [landValue, setLandValue] = useState<number>(1);
  const [landUnitFrom, setLandUnitFrom] = useState<'Bigha' | 'Katha' | 'Dhur' | 'Acre' | 'Decimal'>('Bigha');

  // 14. Currency Converter States
  const [currencyAmount, setCurrencyAmount] = useState<number>(100);
  const [currencyFrom, setCurrencyFrom] = useState<'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD'>('USD');

  // Sync target KB when preset changes
  useEffect(() => {
    setTargetKb(Math.floor((selectedPreset.minKb + selectedPreset.maxKb) / 2));
  }, [selectedPreset]);

  // Process image on change
  useEffect(() => {
    if (!uploadedImageSrc) return;
    processImage();
  }, [uploadedImageSrc, selectedPreset, zoom, brightness, contrast, rotation, targetKb, candidateName, photoDate, includeNameDateStrip]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImageSrc(event.target?.result as string);
      setZoom(1);
      setBrightness(100);
      setContrast(100);
      setRotation(0);
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!uploadedImageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = selectedPreset.widthPx;
      canvas.height = selectedPreset.heightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill clean background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      // Apply filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Apply rotation & center
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      // Scale & fit
      const aspectImg = img.width / img.height;
      const aspectCanvas = canvas.width / canvas.height;
      let drawWidth = canvas.width * zoom;
      let drawHeight = canvas.height * zoom;

      if (aspectImg > aspectCanvas) {
        drawWidth = canvas.height * aspectImg * zoom;
      } else {
        drawHeight = (canvas.width / aspectImg) * zoom;
      }

      ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      // Name & Date on Photo Strip (if enabled for SSC / NTA)
      if (includeNameDateStrip && (candidateName.trim() || photoDate.trim())) {
        const stripHeight = Math.max(36, Math.floor(canvas.height * 0.16));
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, canvas.height - stripHeight, canvas.width, stripHeight);

        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, canvas.height - stripHeight, canvas.width, stripHeight);

        ctx.fillStyle = '#0f172a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (candidateName && photoDate) {
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(candidateName.toUpperCase(), canvas.width / 2, canvas.height - stripHeight + 11);
          ctx.font = 'normal 11px sans-serif';
          ctx.fillText(`DOB / DOP: ${photoDate}`, canvas.width / 2, canvas.height - stripHeight + 25);
        } else if (candidateName) {
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(candidateName.toUpperCase(), canvas.width / 2, canvas.height - stripHeight / 2);
        } else {
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(photoDate, canvas.width / 2, canvas.height - stripHeight / 2);
        }
      }

      // Compression optimization
      let quality = 0.90;
      let outputData = canvas.toDataURL('image/jpeg', quality);
      let byteLength = Math.round((outputData.length * 3) / 4) - (outputData.indexOf(',') + 1);
      let kb = Math.round(byteLength / 1024);

      for (let i = 0; i < 8 && (kb > selectedPreset.maxKb || kb < selectedPreset.minKb); i++) {
        if (kb > selectedPreset.maxKb && quality > 0.08) {
          quality -= 0.12;
        } else if (kb < selectedPreset.minKb && quality < 0.96) {
          quality += 0.05;
        }
        outputData = canvas.toDataURL('image/jpeg', quality);
        byteLength = Math.round((outputData.length * 3) / 4) - (outputData.indexOf(',') + 1);
        kb = Math.round(byteLength / 1024);
      }

      setProcessedDataUrl(outputData);
      setProcessedKb(kb);
      setIsProcessing(false);
    };
    img.src = uploadedImageSrc;
  };

  const handleDownloadPhoto = () => {
    if (!processedDataUrl) return;
    const link = document.createElement('a');
    link.href = processedDataUrl;
    link.download = `BharatSeva_${selectedPreset.id}_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastText(`✅ Downloaded! File size: ${processedKb} KB (Ready for ${selectedPreset.name})`);
    setTimeout(() => setToastText(null), 3500);
  };

  // --- Calculations ---

  // EMI Calculation
  const emiResult = useMemo(() => {
    const p = emiPrincipal;
    const r = emiRate / 12 / 100;
    const n = emiYears * 12;
    if (r === 0 || n === 0) return { emi: 0, totalInterest: 0, totalPayment: p };
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [emiPrincipal, emiRate, emiYears]);

  // SIP Calculation
  const sipResult = useMemo(() => {
    const p = sipMonthly;
    const i = sipRate / 12 / 100;
    const n = sipYears * 12;
    if (i === 0 || n === 0) return { invested: p * n, returns: 0, total: p * n };
    const total = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = p * n;
    const returns = total - invested;
    return {
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(total),
    };
  }, [sipMonthly, sipRate, sipYears]);

  // FD Calculation
  const fdResult = useMemo(() => {
    const p = fdPrincipal;
    const r = fdRate / 100;
    const n = 4;
    const t = fdYears;
    const total = p * Math.pow(1 + r / n, n * t);
    const interest = total - p;
    return {
      maturity: Math.round(total),
      interest: Math.round(interest),
    };
  }, [fdPrincipal, fdRate, fdYears]);

  // RD Calculation
  const rdResult = useMemo(() => {
    const p = rdMonthly;
    const r = rdRate / 100;
    const n = rdYears * 12;
    let maturity = 0;
    for (let month = 1; month <= n; month++) {
      const timeYears = (n - month + 1) / 12;
      maturity += p * Math.pow(1 + r / 4, 4 * timeYears);
    }
    const invested = p * n;
    return {
      invested: Math.round(invested),
      interest: Math.round(maturity - invested),
      maturity: Math.round(maturity),
    };
  }, [rdMonthly, rdRate, rdYears]);

  // Income Tax Comparison
  const taxResult = useMemo(() => {
    const stdDeductionNew = 75000;
    const taxableNew = Math.max(0, taxIncome - stdDeductionNew);
    let taxNew = 0;
    if (taxableNew <= 300000) {
      taxNew = 0;
    } else if (taxableNew <= 700000) {
      taxNew = (taxableNew - 300000) * 0.05;
    } else if (taxableNew <= 1000000) {
      taxNew = 20000 + (taxableNew - 700000) * 0.10;
    } else if (taxableNew <= 1200000) {
      taxNew = 50000 + (taxableNew - 1000000) * 0.15;
    } else if (taxableNew <= 1500000) {
      taxNew = 80000 + (taxableNew - 1200000) * 0.20;
    } else {
      taxNew = 140000 + (taxableNew - 1500000) * 0.30;
    }
    if (taxableNew <= 700000) {
      taxNew = 0;
    }
    const cessNew = taxNew * 0.04;
    const totalTaxNew = Math.round(taxNew + cessNew);

    const stdDeductionOld = 50000;
    const taxableOld = Math.max(0, taxIncome - stdDeductionOld - Math.min(150000, tax80C) - Math.min(50000, tax80D));
    let taxOld = 0;
    if (taxableOld <= 250000) {
      taxOld = 0;
    } else if (taxableOld <= 500000) {
      taxOld = (taxableOld - 250000) * 0.05;
    } else if (taxableOld <= 1000000) {
      taxOld = 12500 + (taxableOld - 500000) * 0.20;
    } else {
      taxOld = 112500 + (taxableOld - 1000000) * 0.30;
    }
    if (taxableOld <= 500000) {
      taxOld = 0;
    }
    const cessOld = taxOld * 0.04;
    const totalTaxOld = Math.round(taxOld + cessOld);

    return {
      taxNew: totalTaxNew,
      taxOld: totalTaxOld,
      savings: Math.abs(totalTaxOld - totalTaxNew),
      recommended: totalTaxNew <= totalTaxOld ? 'New Tax Regime' : 'Old Tax Regime',
    };
  }, [taxIncome, tax80C, tax80D]);

  // GST Calculation
  const gstResult = useMemo(() => {
    const rate = gstRate / 100;
    if (gstMode === 'exclusive') {
      const gstVal = gstAmount * rate;
      return {
        base: gstAmount,
        cgst: gstVal / 2,
        sgst: gstVal / 2,
        totalGst: gstVal,
        totalAmount: gstAmount + gstVal,
      };
    } else {
      const base = gstAmount / (1 + rate);
      const gstVal = gstAmount - base;
      return {
        base: Math.round(base),
        cgst: Math.round(gstVal / 2),
        sgst: Math.round(gstVal / 2),
        totalGst: Math.round(gstVal),
        totalAmount: gstAmount,
      };
    }
  }, [gstAmount, gstRate, gstMode]);

  // CGPA to Percentage
  const cgpaPercentage = useMemo(() => {
    const pct = Math.min(100, Math.max(0, cgpaValue * cgpaMultiplier));
    let division = '1st Division (Honours / Distinction)';
    if (pct < 45) division = 'Pass / 3rd Division';
    else if (pct < 60) division = '2nd Division';
    else if (pct < 75) division = '1st Division';
    return {
      percentage: Number(pct.toFixed(2)),
      division,
    };
  }, [cgpaValue, cgpaMultiplier]);

  // Percentage Marks Calculation
  const percentageMarksResult = useMemo(() => {
    if (totalMarks <= 0) return { percentage: 0, status: 'Invalid Total' };
    const pct = (obtainedMarks / totalMarks) * 100;
    return {
      percentage: Number(pct.toFixed(2)),
      status: pct >= 33 ? 'Passed' : 'Failed',
    };
  }, [obtainedMarks, totalMarks]);

  // Age Calculator
  const ageResult = useMemo(() => {
    const birth = new Date(dob);
    const cut = new Date(cutoffDate);
    if (isNaN(birth.getTime()) || isNaN(cut.getTime())) {
      return { years: 0, months: 0, days: 0, isEligible: true, maxAgeAllowed: 37 };
    }

    let years = cut.getFullYear() - birth.getFullYear();
    let months = cut.getMonth() - birth.getMonth();
    let days = cut.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(cut.getFullYear(), cut.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    let maxAgeAllowed = 37;
    if (examCategory === 'OBC' || examCategory === 'EBC') maxAgeAllowed = 40;
    else if (examCategory === 'SC' || examCategory === 'ST') maxAgeAllowed = 42;
    else if (examCategory === 'EWS') maxAgeAllowed = 37;

    const isEligible = years >= 18 && years <= maxAgeAllowed;

    return {
      years: Math.max(0, years),
      months: Math.max(0, months),
      days: Math.max(0, days),
      isEligible,
      maxAgeAllowed,
    };
  }, [dob, cutoffDate, examCategory]);

  // BMI Calculation
  const bmiResult = useMemo(() => {
    const hMeters = bmiHeightCm / 100;
    if (hMeters <= 0) return { bmi: 0, category: 'Normal', color: 'bg-emerald-50 text-emerald-800' };
    const bmi = Number((bmiWeightKg / (hMeters * hMeters)).toFixed(1));
    let category = 'Normal Weight';
    let color = 'bg-emerald-50 border-emerald-200 text-emerald-800';
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'bg-amber-50 border-amber-200 text-amber-800';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'bg-orange-50 border-orange-200 text-orange-800';
    } else if (bmi >= 30) {
      category = 'Obese';
      color = 'bg-rose-50 border-rose-200 text-rose-800';
    }

    const minHeightRequired = bmiGender === 'Male' ? 165 : 155;
    const policeEligible = bmiHeightCm >= minHeightRequired && bmi >= 18.5 && bmi <= 28;

    return {
      bmi,
      category,
      color,
      minHeightRequired,
      policeEligible,
    };
  }, [bmiHeightCm, bmiWeightKg, bmiGender]);

  // Land Units Calculation
  const landResult = useMemo(() => {
    let sqFt = 0;
    if (landUnitFrom === 'Bigha') sqFt = landValue * 27225;
    else if (landUnitFrom === 'Katha') sqFt = landValue * 1361.25;
    else if (landUnitFrom === 'Dhur') sqFt = landValue * 68.06;
    else if (landUnitFrom === 'Acre') sqFt = landValue * 43560;
    else if (landUnitFrom === 'Decimal') sqFt = landValue * 435.6;

    return {
      sqFt: Number(sqFt.toFixed(2)),
      bigha: Number((sqFt / 27225).toFixed(3)),
      katha: Number((sqFt / 1361.25).toFixed(2)),
      dhur: Number((sqFt / 68.06).toFixed(2)),
      acre: Number((sqFt / 43560).toFixed(4)),
      decimal: Number((sqFt / 435.6).toFixed(2)),
    };
  }, [landValue, landUnitFrom]);

  // Currency Conversion
  const currencyRates: Record<string, number> = {
    USD: 87.25,
    EUR: 94.80,
    GBP: 111.40,
    AED: 23.75,
    CAD: 64.10,
    AUD: 57.30,
  };
  const convertedInr = useMemo(() => {
    const rate = currencyRates[currencyFrom] || 87.25;
    return Math.round(currencyAmount * rate);
  }, [currencyAmount, currencyFrom]);

  // Filtered tools list
  const filteredTools = useMemo(() => {
    return POPULAR_TOOLS_DATA.filter((tool) => {
      const matchesCat = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastText && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center space-x-3 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastText}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-black uppercase tracking-wider">
            <span>🧮 100% FREE CITIZEN CALCULATORS & TOOLS</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            BharatSeva Popular Tools Hub
          </h1>

          <p className="text-xs sm:text-sm text-indigo-200/90 max-w-2xl leading-relaxed font-medium">
            Photo Resizer (20KB-50KB), Loan EMI, Tax Regime Comparison, SIP Growth, Age Eligibility, CGPA to Percentage, and Police Physical Standards.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar Tools List + Active Tool Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tools Selector Menu */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="space-y-3">
            <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
              Select Calculator or Tool
            </h3>

            {/* Quick Category Filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Govt & Career', 'Finance', 'Academic', 'Health', 'Utility'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Tool */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. photo, emi, tax, age)..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-900"
            />
          </div>

          {/* Tools List */}
          <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveToolId(tool.id)}
                className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  activeToolId === tool.id
                    ? 'bg-blue-50 border-blue-900 text-blue-950 font-black shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800'
                }`}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-base shrink-0">
                    {tool.icon}
                  </span>
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{tool.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">{tool.category}</div>
                  </div>
                </div>
                {tool.isPopular && (
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                    POPULAR
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Interactive Workspace */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs">
          {/* ✂️ 1. PHOTO & SIGNATURE RESIZER (FULL INLINE WORKING CANVAS) */}
          {activeToolId === 'photo-resizer' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold">
                      ✂️
                    </span>
                    Sarkari Exam Photo & Signature Resizer
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Auto-resize, compress to 20KB-50KB, add Name & Date stamp for SSC, BPSC, NTA, IBPS, CSBC & UPSC forms.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                  100% Client-Side
                </span>
              </div>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                  1. Select Target Exam Requirement:
                </label>
                <select
                  value={selectedPreset.id}
                  onChange={(e) => {
                    const found = PHOTO_PRESETS.find((p) => p.id === e.target.value);
                    if (found) setSelectedPreset(found);
                  }}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-900 focus:ring-1 focus:ring-blue-900"
                >
                  {PHOTO_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.minKb}KB - {p.maxKb}KB | {p.widthPx}×{p.heightPx}px)
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-indigo-600 font-medium">
                  📌 Requirement: {selectedPreset.description}
                </p>
              </div>

              {/* File Upload Box */}
              {!uploadedImageSrc ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-blue-900 rounded-3xl p-8 sm:p-12 text-center cursor-pointer bg-slate-50/60 hover:bg-blue-50/30 transition-all space-y-3"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    className="hidden"
                  />
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-100 text-blue-900 flex items-center justify-center">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Upload Photo or Signature Image
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Supports JPG, PNG, WEBP from Mobile or PC (Drag & Drop or Click to browse)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white font-bold rounded-xl text-xs shadow-xs"
                  >
                    Select File from Device
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Image Adjustments Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Live Preview Canvas */}
                    <div className="bg-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center border border-slate-200 space-y-3">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Live Preview ({selectedPreset.widthPx} × {selectedPreset.heightPx} px)
                      </span>

                      {processedDataUrl ? (
                        <div className="relative border-2 border-dashed border-slate-400 rounded-lg p-1 bg-white shadow-sm max-w-full">
                          <img
                            src={processedDataUrl}
                            alt="Processed Result"
                            className="max-h-64 object-contain rounded"
                          />
                        </div>
                      ) : (
                        <div className="h-48 flex items-center justify-center text-xs text-slate-400">
                          Processing Image...
                        </div>
                      )}

                      {/* File Size Status Box */}
                      <div className="w-full bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">Estimated Output Size:</span>
                        <div className="flex items-center gap-1.5 font-black">
                          <span
                            className={
                              processedKb >= selectedPreset.minKb && processedKb <= selectedPreset.maxKb
                                ? 'text-emerald-600'
                                : 'text-amber-600'
                            }
                          >
                            {processedKb} KB
                          </span>
                          <span className="text-slate-400 font-normal">
                            (Allowed: {selectedPreset.minKb}-{selectedPreset.maxKb} KB)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Controls & Name Strip Options */}
                    <div className="space-y-4">
                      {/* Zoom Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Zoom & Crop</span>
                          <span>{Math.round(zoom * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.05"
                          value={zoom}
                          onChange={(e) => setZoom(parseFloat(e.target.value))}
                          className="w-full accent-blue-900"
                        />
                      </div>

                      {/* Brightness Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Brightness</span>
                          <span>{brightness}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          step="5"
                          value={brightness}
                          onChange={(e) => setBrightness(parseInt(e.target.value))}
                          className="w-full accent-blue-900"
                        />
                      </div>

                      {/* Contrast Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold text-slate-700">
                          <span>Contrast</span>
                          <span>{contrast}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="150"
                          step="5"
                          value={contrast}
                          onChange={(e) => setContrast(parseInt(e.target.value))}
                          className="w-full accent-blue-900"
                        />
                      </div>

                      {/* Rotate & Reset Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setRotation((r) => (r + 90) % 360)}
                          className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Rotate 90°</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setZoom(1);
                            setBrightness(100);
                            setContrast(100);
                            setRotation(0);
                          }}
                          className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>

                      {/* Name & Date Strip on Photo (Mandatory for SSC / NTA) */}
                      <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-indigo-950 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={includeNameDateStrip}
                            onChange={(e) => setIncludeNameDateStrip(e.target.checked)}
                            className="rounded text-indigo-900"
                          />
                          <span>Add Name & Date Strip at Bottom (SSC/NTA)</span>
                        </label>

                        {includeNameDateStrip && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            <input
                              type="text"
                              value={candidateName}
                              onChange={(e) => setCandidateName(e.target.value)}
                              placeholder="Candidate Full Name"
                              className="p-2 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none"
                            />
                            <input
                              type="text"
                              value={photoDate}
                              onChange={(e) => setPhotoDate(e.target.value)}
                              placeholder="Date (e.g. 15-08-2026)"
                              className="p-2 text-xs bg-white border border-indigo-200 rounded-lg focus:outline-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Download & Change Photo */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-slate-100">
                    <button
                      onClick={handleDownloadPhoto}
                      disabled={!processedDataUrl || isProcessing}
                      className="w-full sm:flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black rounded-2xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Ready JPG ({processedKb} KB)</span>
                    </button>

                    <button
                      onClick={() => {
                        setUploadedImageSrc(null);
                        setProcessedDataUrl(null);
                      }}
                      className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition cursor-pointer"
                    >
                      Upload Another Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 💰 2. EMI CALCULATOR */}
          {activeToolId === 'emi-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                      ₹
                    </span>
                    Home & Personal Loan EMI Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculate monthly installment, total interest payable, and amortization breakdown.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Loan Amount (₹)</label>
                  <input
                    type="number"
                    value={emiPrincipal}
                    onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                  <input
                    type="range"
                    min="50000"
                    max="10000000"
                    step="50000"
                    value={emiPrincipal}
                    onChange={(e) => setEmiPrincipal(Number(e.target.value))}
                    className="w-full accent-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Interest Rate (% p.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={emiRate}
                    onChange={(e) => setEmiRate(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="0.25"
                    value={emiRate}
                    onChange={(e) => setEmiRate(Number(e.target.value))}
                    className="w-full accent-blue-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Loan Tenure (Years)</label>
                  <input
                    type="number"
                    value={emiYears}
                    onChange={(e) => setEmiYears(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={emiYears}
                    onChange={(e) => setEmiYears(Number(e.target.value))}
                    className="w-full accent-blue-900"
                  />
                </div>
              </div>

              {/* Result Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-5 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl shadow-sm">
                  <span className="text-xs font-medium text-blue-200">Monthly EMI Payable</span>
                  <div className="text-2xl sm:text-3xl font-black mt-1">
                    ₹{emiResult.emi.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-blue-300">Principal + Interest</span>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-medium text-slate-500">Total Interest Amount</span>
                  <div className="text-xl sm:text-2xl font-black text-rose-600 mt-1">
                    ₹{emiResult.totalInterest.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-slate-400">Over {emiYears} Years</span>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-medium text-slate-500">Total Loan Repayment</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    ₹{emiResult.totalPayment.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-slate-400">Principal + Interest</span>
                </div>
              </div>
            </div>
          )}

          {/* 📈 3. SIP CALCULATOR */}
          {activeToolId === 'sip-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                      📈
                    </span>
                    Mutual Fund Systematic Investment Plan (SIP) Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculate expected wealth creation and compounding returns from monthly SIPs.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Monthly Investment (₹)</label>
                  <input
                    type="number"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Expected Annual Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                  <input
                    type="range"
                    min="6"
                    max="25"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Time Period (Years)</label>
                  <input
                    type="number"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                  <input
                    type="range"
                    min="1"
                    max="35"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-medium text-slate-500">Total Invested Amount</span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                    ₹{sipResult.invested.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-medium text-slate-500">Estimated Returns Gain</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">
                    ₹{sipResult.returns.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-emerald-800 to-teal-950 text-white rounded-2xl shadow-sm">
                  <span className="text-xs font-medium text-emerald-200">Expected Maturity Wealth</span>
                  <div className="text-2xl sm:text-3xl font-black mt-1">
                    ₹{sipResult.total.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🏛️ 4. INCOME TAX CALCULATOR */}
          {activeToolId === 'income-tax-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                      🏛️
                    </span>
                    Income Tax Regime Comparison (FY 2025-26)
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Compare New vs Old Tax Regime with ₹75,000 Standard Deduction and 80C exemptions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Gross Annual Income (₹)</label>
                  <input
                    type="number"
                    value={taxIncome}
                    onChange={(e) => setTaxIncome(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Section 80C Deductions (₹)</label>
                  <input
                    type="number"
                    value={tax80C}
                    onChange={(e) => setTax80C(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Section 80D Health Insurance (₹)</label>
                  <input
                    type="number"
                    value={tax80D}
                    onChange={(e) => setTax80D(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl">
                  <span className="text-xs font-bold text-blue-900">New Tax Regime</span>
                  <div className="text-2xl font-black text-blue-950 mt-1">
                    ₹{taxResult.taxNew.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-blue-700">Standard Deduction ₹75k included</span>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-bold text-slate-700">Old Tax Regime</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">
                    ₹{taxResult.taxOld.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[11px] text-slate-500">With 80C + 80D deductions</span>
                </div>

                <div className="p-5 bg-emerald-900 text-white rounded-2xl">
                  <span className="text-xs font-bold text-emerald-200">Recommended Option</span>
                  <div className="text-xl font-black mt-1">{taxResult.recommended}</div>
                  <span className="text-[11px] text-emerald-300">
                    Saves you ₹{taxResult.savings.toLocaleString('en-IN')} in tax
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 🎓 5. CGPA TO PERCENTAGE */}
          {activeToolId === 'cgpa-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-teal-100 text-teal-900 flex items-center justify-center font-bold">
                      🎓
                    </span>
                    CGPA to Percentage Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Convert university CGPA into exact percentage and division for CBSE, AICTE, and State Boards.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Enter Your CGPA (out of 10)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={cgpaValue}
                    onChange={(e) => setCgpaValue(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xl text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Conversion Standard / Multiplier</label>
                  <select
                    value={cgpaMultiplier}
                    onChange={(e) => setCgpaMultiplier(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs sm:text-sm text-slate-900"
                  >
                    <option value={9.5}>CBSE / State Boards (CGPA × 9.5)</option>
                    <option value={10}>AICTE / Technical Universities (CGPA × 10)</option>
                    <option value={9.0}>AKTU / Special University Formula (CGPA × 9.0)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-2xl shadow-sm">
                  <span className="text-xs font-medium text-teal-200">Converted Percentage</span>
                  <div className="text-4xl font-black mt-1">{cgpaPercentage.percentage}%</div>
                  <span className="text-xs text-teal-300 mt-1 block font-medium">
                    Formula: {cgpaValue} × {cgpaMultiplier}
                  </span>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-center">
                  <span className="text-xs font-medium text-slate-500">Degree Division Classification</span>
                  <div className="text-xl font-black text-slate-900 mt-1">{cgpaPercentage.division}</div>
                  <span className="text-xs text-slate-500 mt-1">Valid for Govt Exam eligibility forms</span>
                </div>
              </div>
            </div>
          )}

          {/* 🕒 6. AGE CALCULATOR FOR GOVT EXAMS */}
          {activeToolId === 'age-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                      🕒
                    </span>
                    Age Eligibility Calculator for Govt Exams
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Calculate exact age in years, months, days on notification cutoff date with category relaxation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Date of Birth (DOB)</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Notification Cutoff Date</label>
                  <input
                    type="date"
                    value={cutoffDate}
                    onChange={(e) => setCutoffDate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Reservation Category</label>
                  <select
                    value={examCategory}
                    onChange={(e) => setExamCategory(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  >
                    <option value="General">General / UR (Max 37 Yrs)</option>
                    <option value="OBC">OBC / BC (+3 Yrs Relaxation = 40)</option>
                    <option value="EBC">EBC Bihar (+3 Yrs Relaxation = 40)</option>
                    <option value="SC">SC / ST (+5 Yrs Relaxation = 42)</option>
                    <option value="EWS">EWS (Standard 37 Yrs)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-sm">
                  <span className="text-xs font-medium text-slate-300">Exact Age on Cutoff Date</span>
                  <div className="text-2xl font-black mt-1">
                    {ageResult.years} Yrs, {ageResult.months} Mos, {ageResult.days} Days
                  </div>
                  <span className="text-[11px] text-slate-400">Down to exact calendar day</span>
                </div>

                <div
                  className={`p-5 rounded-2xl border ${
                    ageResult.isEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-600">Recruitment Age Eligibility Status</span>
                  <div
                    className={`text-xl font-black mt-1 ${
                      ageResult.isEligible ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {ageResult.isEligible ? '✅ ELIGIBLE' : '❌ OVERAGE / INELIGIBLE'}
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    Upper age limit for {examCategory}: {ageResult.maxAgeAllowed} Years
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ❤️ 7. BMI & PHYSICAL STANDARDS */}
          {activeToolId === 'bmi-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-900 flex items-center justify-center font-bold">
                      ❤️
                    </span>
                    BMI & Police Physical Standards Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Check height, weight, and BMI physical fitness for Bihar Police (Daroga/Constable), SSC GD, and Defence exams.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Height (in cm)</label>
                  <input
                    type="number"
                    value={bmiHeightCm}
                    onChange={(e) => setBmiHeightCm(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Weight (in kg)</label>
                  <input
                    type="number"
                    value={bmiWeightKg}
                    onChange={(e) => setBmiWeightKg(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Gender</label>
                  <select
                    value={bmiGender}
                    onChange={(e) => setBmiGender(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
                  >
                    <option value="Male">Male (Min 165 cm)</option>
                    <option value="Female">Female (Min 155 cm)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className={`p-5 rounded-2xl border ${bmiResult.color}`}>
                  <span className="text-xs font-bold">Calculated BMI Score</span>
                  <div className="text-3xl font-black mt-1">{bmiResult.bmi} kg/m²</div>
                  <span className="text-xs font-bold mt-1 inline-block">Category: {bmiResult.category}</span>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-xs font-medium text-slate-500">Police/Defence Physical Qualification</span>
                  <div
                    className={`text-xl font-black mt-1 ${
                      bmiResult.policeEligible ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {bmiResult.policeEligible ? '✅ Height & BMI Qualified' : '⚠️ Height / Weight Warning'}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Min height requirement: {bmiResult.minHeightRequired} cm
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 🧾 8. GST CALCULATOR */}
          {activeToolId === 'gst-calc' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                      🧾
                    </span>
                    GST Calculator
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Add or remove GST (5%, 12%, 18%, 28%) with CGST and SGST bifurcation.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Amount (₹)</label>
                  <input
                    type="number"
                    value={gstAmount}
                    onChange={(e) => setGstAmount(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">GST Slab (%)</label>
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value={5}>5% (Essential Goods)</option>
                    <option value={12}>12% (Standard Goods)</option>
                    <option value={18}>18% (Services & IT)</option>
                    <option value={28}>28% (Luxury & Auto)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Calculation Mode</label>
                  <select
                    value={gstMode}
                    onChange={(e) => setGstMode(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="exclusive">Add GST (Exclusive)</option>
                    <option value="inclusive">Remove GST (Inclusive)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Base Net Amount</span>
                  <div className="text-lg font-black text-slate-900 mt-1">
                    ₹{gstResult.base.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">CGST ({gstRate / 2}%)</span>
                  <div className="text-lg font-black text-blue-700 mt-1">
                    ₹{gstResult.cgst.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">SGST ({gstRate / 2}%)</span>
                  <div className="text-lg font-black text-blue-700 mt-1">
                    ₹{gstResult.sgst.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="p-4 bg-blue-900 text-white rounded-2xl">
                  <span className="text-[11px] text-blue-200">Total Invoice Amount</span>
                  <div className="text-lg font-black mt-1">
                    ₹{gstResult.totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 📏 9. UNIT CONVERTER (LAND MEASUREMENTS) */}
          {activeToolId === 'unit-converter' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                      📏
                    </span>
                    Indian Land Unit Converter
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Convert Bigha, Katha, Dhur, Decimal (Dismil), Acre, and Square Feet measurements.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Enter Value</label>
                  <input
                    type="number"
                    value={landValue}
                    onChange={(e) => setLandValue(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">From Land Unit</label>
                  <select
                    value={landUnitFrom}
                    onChange={(e) => setLandUnitFrom(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Bigha">Bigha (20 Katha / 27,225 sq ft)</option>
                    <option value="Katha">Katha (20 Dhur / 1,361 sq ft)</option>
                    <option value="Dhur">Dhur (68.06 sq ft)</option>
                    <option value="Acre">Acre (43,560 sq ft)</option>
                    <option value="Decimal">Decimal (435.6 sq ft)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Square Feet</span>
                  <div className="text-lg font-black text-slate-900 mt-1">{landResult.sqFt} sq ft</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Bigha Equivalent</span>
                  <div className="text-lg font-black text-slate-900 mt-1">{landResult.bigha} Bigha</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Katha Equivalent</span>
                  <div className="text-lg font-black text-slate-900 mt-1">{landResult.katha} Katha</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Dhur Equivalent</span>
                  <div className="text-lg font-black text-slate-900 mt-1">{landResult.dhur} Dhur</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Decimal (Dismil)</span>
                  <div className="text-lg font-black text-slate-900 mt-1">{landResult.decimal} Decimal</div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <span className="text-[11px] text-slate-500">Acre Equivalent</span>
                  <div className="text-lg font-black text-slate-900 mt-1">{landResult.acre} Acre</div>
                </div>
              </div>
            </div>
          )}

          {/* 💱 10. CURRENCY CONVERTER */}
          {activeToolId === 'currency-converter' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                      💱
                    </span>
                    Currency Converter (INR Exchange Rate)
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Convert USD, EUR, GBP, AED, CAD to Indian Rupees with live exchange rates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Foreign Currency Amount</label>
                  <input
                    type="number"
                    value={currencyAmount}
                    onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">From Currency</label>
                  <select
                    value={currencyFrom}
                    onChange={(e) => setCurrencyFrom(e.target.value as any)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="USD">USD ($ United States Dollar)</option>
                    <option value="EUR">EUR (€ Euro)</option>
                    <option value="GBP">GBP (£ British Pound)</option>
                    <option value="AED">AED (د.إ UAE Dirham)</option>
                    <option value="CAD">CAD (C$ Canadian Dollar)</option>
                    <option value="AUD">AUD (A$ Australian Dollar)</option>
                  </select>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl shadow-sm text-center">
                <span className="text-xs font-medium text-blue-200">Converted Value in Indian Rupees (INR)</span>
                <div className="text-3xl sm:text-4xl font-black mt-2">
                  ₹{convertedInr.toLocaleString('en-IN')}
                </div>
                <span className="text-[11px] text-blue-300 mt-1 block">
                  1 {currencyFrom} ≈ ₹{currencyRates[currencyFrom]} INR
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
