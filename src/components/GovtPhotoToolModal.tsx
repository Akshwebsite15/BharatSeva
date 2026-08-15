import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  Sparkles,
  Sliders,
  Maximize2,
  RotateCw,
  FileCheck,
  AlertCircle,
  Camera,
  Scissors,
} from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  type: 'Photo' | 'Signature' | 'Thumb' | 'Document';
  widthPx: number;
  heightPx: number;
  minKb: number;
  maxKb: number;
  description: string;
}

const EXAM_PRESETS: Preset[] = [
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
    description: 'Postcard/Passport size with name & date plate, 10 - 200 KB',
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
    description: 'Passport photo with clear ears visible, 20 KB - 50 KB',
  },
];

interface GovtPhotoToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  showToast?: (msg: string) => void;
}

export const GovtPhotoToolModal: React.FC<GovtPhotoToolModalProps> = ({
  isOpen,
  onClose,
  showToast,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(EXAM_PRESETS[0]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [processedDataUrl, setProcessedDataUrl] = useState<string | null>(null);
  const [processedKb, setProcessedKb] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [targetKb, setTargetKb] = useState<number>(selectedPreset.maxKb - 5);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update target KB when preset changes
  useEffect(() => {
    setTargetKb(Math.floor((selectedPreset.minKb + selectedPreset.maxKb) / 2));
  }, [selectedPreset]);

  // Process image when parameters change
  useEffect(() => {
    if (!imageSrc) return;
    processImage();
  }, [imageSrc, selectedPreset, zoom, brightness, contrast, targetKb]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setZoom(1);
      setBrightness(100);
      setContrast(100);
    };
    reader.readAsDataURL(file);
  };

  const processImage = () => {
    if (!imageSrc) return;
    setIsProcessing(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = selectedPreset.widthPx;
      canvas.height = selectedPreset.heightPx;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill white background for signatures/photos
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Filters
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      // Scale & Center
      const aspectImg = img.width / img.height;
      const aspectCanvas = canvas.width / canvas.height;
      let drawWidth = canvas.width * zoom;
      let drawHeight = canvas.height * zoom;

      if (aspectImg > aspectCanvas) {
        drawWidth = canvas.height * aspectImg * zoom;
      } else {
        drawHeight = (canvas.width / aspectImg) * zoom;
      }

      const drawX = (canvas.width - drawWidth) / 2;
      const drawY = (canvas.height - drawHeight) / 2;

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

      // Iterative Compression to hit target KB
      let quality = 0.92;
      let outputData = canvas.toDataURL('image/jpeg', quality);
      let byteLength = Math.round((outputData.length * 3) / 4) - (outputData.indexOf(',') + 1);
      let kb = Math.round(byteLength / 1024);

      // Binary search quality adjustment
      for (let i = 0; i < 6 && (kb > selectedPreset.maxKb || kb < selectedPreset.minKb); i++) {
        if (kb > selectedPreset.maxKb && quality > 0.1) {
          quality -= 0.12;
        } else if (kb < selectedPreset.minKb && quality < 0.95) {
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
    img.src = imageSrc;
  };

  const handleDownload = () => {
    if (!processedDataUrl) return;
    const link = document.createElement('a');
    link.href = processedDataUrl;
    link.download = `BharatSeva_${selectedPreset.id}_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) {
      showToast(`✅ Downloaded! File size: ${processedKb} KB (Compliant with ${selectedPreset.name})`);
    }
  };

  const isSizeCompliant =
    processedKb >= selectedPreset.minKb && processedKb <= selectedPreset.maxKb;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-black">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                Sarkari Exam Photo & Signature Resizer
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                100% Free, Private In-Browser Image Compressor for SSC, UPSC, BPSC & NTA Forms
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-4 space-y-4 overflow-y-auto">
          {/* Exam Preset Selector */}
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
              1. Select Target Exam Specification:
            </label>
            <select
              value={selectedPreset.id}
              onChange={(e) => {
                const found = EXAM_PRESETS.find((p) => p.id === e.target.value);
                if (found) setSelectedPreset(found);
              }}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              {EXAM_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.minKb}KB - {p.maxKb}KB)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-indigo-700 font-semibold mt-1">
              📌 {selectedPreset.description}
            </p>
          </div>

          {/* Upload Area or Preview Area */}
          {!imageSrc ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 rounded-2xl p-8 text-center cursor-pointer transition space-y-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-indigo-600">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <span className="text-sm font-extrabold text-slate-900 block">
                  Click to Upload Your Photo / Signature
                </span>
                <span className="text-xs text-slate-500">
                  Supports JPG, PNG, WEBP (No images are sent to any server; processed safely in your browser)
                </span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {/* Image Preview */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div
                  className="bg-white p-2 rounded-xl shadow-xs border border-slate-200 flex items-center justify-center overflow-hidden"
                  style={{
                    width: '180px',
                    height: selectedPreset.type === 'Signature' ? '100px' : '220px',
                  }}
                >
                  {processedDataUrl ? (
                    <img
                      src={processedDataUrl}
                      alt="Processed Preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-slate-400">Processing...</span>
                  )}
                </div>

                {/* Status Badge */}
                <div
                  className={`px-3 py-1 rounded-xl text-xs font-black flex items-center space-x-1.5 ${
                    isSizeCompliant
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {isSizeCompliant ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  )}
                  <span>
                    Size: {processedKb} KB ({selectedPreset.minKb} - {selectedPreset.maxKb} KB limit)
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3 text-xs font-bold text-slate-700">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Zoom & Crop:</span>
                    <span className="text-indigo-900">{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Brightness:</span>
                    <span className="text-indigo-900">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span>Contrast:</span>
                    <span className="text-indigo-900">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-indigo-700 font-extrabold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" /> Upload Different Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick Exam Specifications Cards */}
          <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-2xl space-y-1.5 text-xs text-slate-700">
            <span className="font-extrabold text-indigo-950 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Pro Tips for 100% Form Acceptance:
            </span>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
              <li>Ensure clear face without sunglasses, cap, or mask. Both ears should be visible.</li>
              <li>For signatures: Sign with black gel/ink pen on clean white unruled paper.</li>
              <li>All resized files download instantly as clean standardized <strong>.jpg</strong> files.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>

          {imageSrc && (
            <button
              onClick={handleDownload}
              className="py-2.5 px-6 bg-indigo-900 hover:bg-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center space-x-2 transition cursor-pointer shadow-md active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Form-Ready JPG ({processedKb} KB)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
