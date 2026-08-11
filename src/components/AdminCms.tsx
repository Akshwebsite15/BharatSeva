import React, { useState, useMemo } from 'react';
import {
  Lock,
  LogOut,
  ShieldCheck,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  Ban,
  FileText,
  UploadCloud,
  FileDown,
  LayoutDashboard,
  Briefcase,
  Award,
  CreditCard,
  Key,
  BookOpen,
  Bell,
  Eye,
  Calendar,
  X,
  Sparkles,
  ExternalLink,
  Check,
} from 'lucide-react';

import {
  CMSPublishStatus,
  CMSJobItem,
  CMSResultItem,
  CMSAdmitCardItem,
  CMSAnswerKeyItem,
  CMSPyqItem,
  CMSNoticeItem,
  SampleQuestion,
} from '../types';

export interface AdminCmsProps {
  onCloseAdmin?: () => void;
  // Shared CMS State & Handlers
  jobs: CMSJobItem[];
  setJobs: React.Dispatch<React.SetStateAction<CMSJobItem[]>>;
  results: CMSResultItem[];
  setResults: React.Dispatch<React.SetStateAction<CMSResultItem[]>>;
  admitCards: CMSAdmitCardItem[];
  setAdmitCards: React.Dispatch<React.SetStateAction<CMSAdmitCardItem[]>>;
  answerKeys: CMSAnswerKeyItem[];
  setAnswerKeys: React.Dispatch<React.SetStateAction<CMSAnswerKeyItem[]>>;
  pyqs: CMSPyqItem[];
  setPyqs: React.Dispatch<React.SetStateAction<CMSPyqItem[]>>;
  notices: CMSNoticeItem[];
  setNotices: React.Dispatch<React.SetStateAction<CMSNoticeItem[]>>;
}

export type AdminSubTab =
  | 'dashboard'
  | 'jobs'
  | 'results'
  | 'admit-cards'
  | 'answer-keys'
  | 'pyqs'
  | 'notices';

export const AdminCms: React.FC<AdminCmsProps> = ({
  onCloseAdmin,
  jobs,
  setJobs,
  results,
  setResults,
  admitCards,
  setAdmitCards,
  answerKeys,
  setAnswerKeys,
  pyqs,
  setPyqs,
  notices,
  setNotices,
}) => {
  // Auth & Security Credentials State
  const [storedUsername, setStoredUsername] = useState<string>(
    () => localStorage.getItem('bharatseva_cms_user') || 'admin'
  );
  const [storedPassword, setStoredPassword] = useState<string>(
    () => localStorage.getItem('bharatseva_cms_pass') || 'bharatseva2026'
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem('bharatseva_admin_token') === 'authenticated_2026'
  );
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('bharatseva2026');
  const [authError, setAuthError] = useState('');

  // Password Change Modal State
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [securitySuccessMsg, setSecuritySuccessMsg] = useState('');

  // Active View Tab
  const [activeTab, setActiveTab] = useState<AdminSubTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CMSPublishStatus | 'All'>('All');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // PDF Drag & Drop Upload State inside Form
  const [uploadedPdfName, setUploadedPdfName] = useState<string>('');
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string>('');

  // Generic Form Inputs
  const [formFields, setFormFields] = useState<Record<string, any>>({});

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      usernameInput.trim().toLowerCase() === storedUsername.trim().toLowerCase() &&
      passwordInput === storedPassword
    ) {
      setIsAuthenticated(true);
      localStorage.setItem('bharatseva_admin_token', 'authenticated_2026');
      setAuthError('');
    } else {
      setAuthError('Invalid credentials! Check your Username and Password.');
    }
  };

  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsernameInput.trim() || !newPasswordInput.trim()) return;

    localStorage.setItem('bharatseva_cms_user', newUsernameInput.trim());
    localStorage.setItem('bharatseva_cms_pass', newPasswordInput.trim());
    setStoredUsername(newUsernameInput.trim());
    setStoredPassword(newPasswordInput.trim());
    setSecuritySuccessMsg('Admin credentials updated successfully!');
    setTimeout(() => {
      setSecuritySuccessMsg('');
      setIsSecurityModalOpen(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('bharatseva_admin_token');
  };

  // Status Badge Colors & Icons
  const renderStatusBadge = (status: CMSPublishStatus) => {
    switch (status) {
      case 'Published':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" />
            <span>Published</span>
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3 h-3" />
            <span>Scheduled</span>
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
            <Ban className="w-3 h-3" />
            <span>Expired</span>
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-500/10 text-slate-600 border border-slate-500/20">
            <FileText className="w-3 h-3" />
            <span>Draft</span>
          </span>
        );
    }
  };

  // Helper for Status Actions
  const updateStatus = (
    module: AdminSubTab,
    id: string,
    newStatus: CMSPublishStatus,
    scheduledDate?: string
  ) => {
    const today = new Date().toISOString().split('T')[0];
    if (module === 'jobs') {
      setJobs((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                publishStatus: newStatus,
                scheduledPublishDate: scheduledDate || item.scheduledPublishDate,
                updatedAt: today,
              }
            : item
        )
      );
    } else if (module === 'results') {
      setResults((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                publishStatus: newStatus,
                scheduledPublishDate: scheduledDate || item.scheduledPublishDate,
                updatedAt: today,
              }
            : item
        )
      );
    } else if (module === 'admit-cards') {
      setAdmitCards((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                publishStatus: newStatus,
                scheduledPublishDate: scheduledDate || item.scheduledPublishDate,
                updatedAt: today,
              }
            : item
        )
      );
    } else if (module === 'answer-keys') {
      setAnswerKeys((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                publishStatus: newStatus,
                scheduledPublishDate: scheduledDate || item.scheduledPublishDate,
                updatedAt: today,
              }
            : item
        )
      );
    } else if (module === 'pyqs') {
      setPyqs((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                publishStatus: newStatus,
                scheduledPublishDate: scheduledDate || item.scheduledPublishDate,
                updatedAt: today,
              }
            : item
        )
      );
    } else if (module === 'notices') {
      setNotices((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                publishStatus: newStatus,
                scheduledPublishDate: scheduledDate || item.scheduledPublishDate,
                updatedAt: today,
              }
            : item
        )
      );
    }
  };

  // Helper for Delete Item
  const deleteItem = (module: AdminSubTab, id: string) => {
    if (!window.confirm('Are you sure you want to delete this record permanently?')) return;
    if (module === 'jobs') setJobs((prev) => prev.filter((i) => i.id !== id));
    if (module === 'results') setResults((prev) => prev.filter((i) => i.id !== id));
    if (module === 'admit-cards') setAdmitCards((prev) => prev.filter((i) => i.id !== id));
    if (module === 'answer-keys') setAnswerKeys((prev) => prev.filter((i) => i.id !== id));
    if (module === 'pyqs') setPyqs((prev) => prev.filter((i) => i.id !== id));
    if (module === 'notices') setNotices((prev) => prev.filter((i) => i.id !== id));
  };

  // PDF File Upload Handler inside Modal
  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPdfName(file.name);
      // Create Object URL for client-side blob download
      const objectUrl = URL.createObjectURL(file);
      setUploadedPdfUrl(objectUrl);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setModalMode('add');
    setEditingItemId(null);
    setUploadedPdfName('');
    setUploadedPdfUrl('');
    setFormFields({
      title: '',
      organization: '',
      conductingBody: '',
      category: 'BPSC',
      type: 'Bihar',
      vacancy: '',
      qualification: 'Graduate',
      dates: `Application Active | Deadline: In 15 Days`,
      deadlineDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      publishStatus: 'Published',
      scheduledPublishDate: '',
      officialWebsite: 'https://bpsc.bih.nic.in',
      details: '',
      examName: '',
      releaseDate: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      examDate: 'Upcoming Schedule',
      year: 2026,
      tier: 'Prelims',
      subject: 'General Studies',
      totalQuestions: 150,
      durationMinutes: 120,
      urgency: 'Normal',
      summary: '',
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (item: any) => {
    setModalMode('edit');
    setEditingItemId(item.id);
    setUploadedPdfName(item.pdfName || '');
    setUploadedPdfUrl(item.pdfUrl || item.meritListPdfUrl || item.noticePdfUrl || '');
    setFormFields({ ...item });
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    if (activeTab === 'jobs') {
      const jobData: CMSJobItem = {
        id: editingItemId || `cms-job-${Date.now()}`,
        title: formFields.title || 'Untitled Government Job',
        organization: formFields.organization || 'Selection Board',
        type: formFields.type || 'Bihar',
        qualification: formFields.qualification || 'Graduate',
        vacancy: formFields.vacancy || 'Various Vacancies',
        age: formFields.age || '18 - 37 Years',
        dates: formFields.dates || 'Active Application Window',
        deadlineDate: formFields.deadlineDate || today,
        startDate: formFields.startDate || today,
        fee: formFields.fee || '₹500 (General)',
        salary: formFields.salary || 'Govt Pay Matrix',
        selection: formFields.selection || 'Written Exam -> DV.',
        documents: formFields.documents || ['Educational Certificates', 'Photo ID', 'Domicile Certificate'],
        notification: formFields.notification || 'Official Recruitment Notice 2026',
        appLink: formFields.appLink || 'https://bpsc.bih.nic.in',
        verificationStatus: 'Verified Official Govt Portal Entry',
        minAge: Number(formFields.minAge) || 18,
        maxAgeGen: Number(formFields.maxAgeGen) || 37,
        reqQualificationLevel: formFields.reqQualificationLevel || 'Graduate',
        publishStatus: formFields.publishStatus || 'Published',
        scheduledPublishDate: formFields.scheduledPublishDate,
        pdfUrl: uploadedPdfUrl || formFields.pdfUrl,
        pdfName: uploadedPdfName || formFields.pdfName || 'Official_Notification.pdf',
        createdAt: formFields.createdAt || today,
        updatedAt: today,
      };

      setJobs((prev) =>
        modalMode === 'add'
          ? [jobData, ...prev]
          : prev.map((j) => (j.id === editingItemId ? jobData : j))
      );
    } else if (activeTab === 'results') {
      const resData: CMSResultItem = {
        id: editingItemId || `cms-res-${Date.now()}`,
        title: formFields.title || 'Official Exam Result',
        examName: formFields.examName || formFields.title,
        conductingBody: formFields.conductingBody || 'Government Selection Board',
        category: formFields.category || 'BPSC',
        releaseDate: formFields.releaseDate || today,
        details: formFields.details || 'Merit list and cut-off marks published.',
        officialPortalUrl: formFields.officialPortalUrl || 'https://bpsc.bih.nic.in',
        publishStatus: formFields.publishStatus || 'Published',
        scheduledPublishDate: formFields.scheduledPublishDate,
        meritListPdfUrl: uploadedPdfUrl || formFields.meritListPdfUrl,
        pdfName: uploadedPdfName || formFields.pdfName || 'Merit_List.pdf',
        createdAt: formFields.createdAt || today,
        updatedAt: today,
      };

      setResults((prev) =>
        modalMode === 'add'
          ? [resData, ...prev]
          : prev.map((r) => (r.id === editingItemId ? resData : r))
      );
    } else if (activeTab === 'admit-cards') {
      const acData: CMSAdmitCardItem = {
        id: editingItemId || `cms-ac-${Date.now()}`,
        category: formFields.category || 'BPSC',
        examName: formFields.examName || formFields.title || 'Recruitment Exam 2026',
        admitCardName: formFields.admitCardName || formFields.title || 'E-Admit Card & Hall Ticket',
        organization: formFields.organization || formFields.conductingBody || 'Selection Board',
        releaseDate: formFields.releaseDate || today,
        examDate: formFields.examDate || 'As per official schedule',
        downloadUrl: formFields.downloadUrl || 'https://bpsc.bih.nic.in',
        instructions: formFields.instructions || [
          'Carry downloaded copy of Hall Ticket & Original ID proof.',
          'Arrive at exam center 60 minutes prior to gate closing.',
        ],
        status: formFields.status || 'Active Download',
        publishStatus: formFields.publishStatus || 'Published',
        scheduledPublishDate: formFields.scheduledPublishDate,
        pdfUrl: uploadedPdfUrl || formFields.pdfUrl,
        pdfName: uploadedPdfName || formFields.pdfName || 'Admit_Card_Notice.pdf',
        createdAt: formFields.createdAt || today,
        updatedAt: today,
      };

      setAdmitCards((prev) =>
        modalMode === 'add'
          ? [acData, ...prev]
          : prev.map((ac) => (ac.id === editingItemId ? acData : ac))
      );
    } else if (activeTab === 'answer-keys') {
      const akData: CMSAnswerKeyItem = {
        id: editingItemId || `cms-ak-${Date.now()}`,
        title: formFields.title || 'Official Answer Key 2026',
        examName: formFields.examName || formFields.title,
        conductingBody: formFields.conductingBody || 'Recruitment Commission',
        category: formFields.category || 'BPSC',
        releaseDate: formFields.releaseDate || today,
        objectionDeadline: formFields.objectionDeadline || 'In 7 Days',
        objectionFee: formFields.objectionFee || '₹50 per question',
        portalUrl: formFields.portalUrl || 'https://bpsc.bih.nic.in',
        answerKeyPdfUrl: uploadedPdfUrl || formFields.answerKeyPdfUrl,
        pdfName: uploadedPdfName || formFields.pdfName || 'Answer_Key.pdf',
        publishStatus: formFields.publishStatus || 'Published',
        scheduledPublishDate: formFields.scheduledPublishDate,
        createdAt: formFields.createdAt || today,
        updatedAt: today,
      };

      setAnswerKeys((prev) =>
        modalMode === 'add'
          ? [akData, ...prev]
          : prev.map((ak) => (ak.id === editingItemId ? akData : ak))
      );
    } else if (activeTab === 'pyqs') {
      const pyqData: CMSPyqItem = {
        id: editingItemId || `cms-pyq-${Date.now()}`,
        title: formFields.title || 'Previous Year Solved Question Paper',
        examName: formFields.examName || 'Competitive Entrance Exam',
        category: formFields.category || 'BPSC',
        conductingBody: formFields.conductingBody || 'Exam Board',
        year: Number(formFields.year) || 2025,
        tier: formFields.tier || 'Prelims',
        subject: formFields.subject || 'General Studies',
        totalQuestions: Number(formFields.totalQuestions) || 150,
        durationMinutes: Number(formFields.durationMinutes) || 120,
        pdfUrl: uploadedPdfUrl || formFields.pdfUrl,
        pdfName: uploadedPdfName || formFields.pdfName || 'PYQ_Question_Paper.pdf',
        sampleQuestions: formFields.sampleQuestions || [
          {
            id: 'sample-1',
            questionText: 'Sample Practice Question for this PYQ Set?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswerIndex: 0,
            explanation: 'Official solution explanation verified by subject expert.',
            subjectCategory: 'General Studies',
          },
        ],
        publishStatus: formFields.publishStatus || 'Published',
        scheduledPublishDate: formFields.scheduledPublishDate,
        createdAt: formFields.createdAt || today,
        updatedAt: today,
      };

      setPyqs((prev) =>
        modalMode === 'add'
          ? [pyqData, ...prev]
          : prev.map((p) => (p.id === editingItemId ? pyqData : p))
      );
    } else if (activeTab === 'notices') {
      const noticeData: CMSNoticeItem = {
        id: editingItemId || `cms-not-${Date.now()}`,
        title: formFields.title || 'Official Government Notice',
        issuingBody: formFields.issuingBody || 'Govt Department',
        releaseDate: formFields.releaseDate || today,
        urgency: formFields.urgency || 'Normal',
        summary: formFields.summary || 'Important official instructions published.',
        category: formFields.category || 'General Notice',
        noticePdfUrl: uploadedPdfUrl || formFields.noticePdfUrl,
        pdfName: uploadedPdfName || formFields.pdfName || 'Official_Notice.pdf',
        officialUrl: formFields.officialUrl || 'https://bpsc.bih.nic.in',
        publishStatus: formFields.publishStatus || 'Published',
        scheduledPublishDate: formFields.scheduledPublishDate,
        createdAt: formFields.createdAt || today,
        updatedAt: today,
      };

      setNotices((prev) =>
        modalMode === 'add'
          ? [noticeData, ...prev]
          : prev.map((n) => (n.id === editingItemId ? noticeData : n))
      );
    }

    setIsModalOpen(false);
  };

  // Dashboard Stats Calculations
  const stats = useMemo(() => {
    const allItems = [
      ...jobs,
      ...results,
      ...admitCards,
      ...answerKeys,
      ...pyqs,
      ...notices,
    ];
    return {
      total: allItems.length,
      published: allItems.filter((i) => i.publishStatus === 'Published').length,
      draft: allItems.filter((i) => i.publishStatus === 'Draft').length,
      scheduled: allItems.filter((i) => i.publishStatus === 'Scheduled').length,
      expired: allItems.filter((i) => i.publishStatus === 'Expired').length,
      jobsCount: jobs.length,
      resultsCount: results.length,
      admitCardsCount: admitCards.length,
      answerKeysCount: answerKeys.length,
      pyqsCount: pyqs.length,
      noticesCount: notices.length,
    };
  }, [jobs, results, admitCards, answerKeys, pyqs, notices]);

  // LOGIN SCREEN (If not authenticated)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl" />
          <div className="text-center space-y-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-teal-500/20">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">BharatSeva CMS Portal</h1>
            <p className="text-xs text-slate-400">
              Authorized Government Content Management System for Bihar & Central Portals
            </p>
          </div>

          {/* Default Credentials Notice */}
          <div className="mb-6 p-3.5 bg-teal-500/10 border border-teal-500/30 rounded-2xl text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 font-bold text-teal-400">
                <Key className="w-3.5 h-3.5" />
                <span>Default Admin Credentials:</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setUsernameInput('admin');
                  setPasswordInput('bharatseva2026');
                }}
                className="text-[10px] font-extrabold px-2 py-0.5 bg-teal-500 text-slate-950 rounded-md hover:bg-teal-400 transition"
              >
                Auto-fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-300 flex justify-between pt-1 border-t border-teal-500/20">
              <span>User: <strong className="text-white">admin</strong></span>
              <span>Pass: <strong className="text-white">bharatseva2026</strong></span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-400 font-medium text-center">
                {authError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-teal-500 font-mono text-slate-200"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-teal-500 font-mono text-slate-200"
                placeholder="••••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Login to BharatSeva CMS</span>
            </button>
          </form>

          {onCloseAdmin && (
            <div className="mt-6 text-center">
              <button
                onClick={onCloseAdmin}
                className="text-xs text-slate-400 hover:text-white transition underline"
              >
                ← Back to Candidate Public Portal
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // MAIN ADMIN CMS DASHBOARD
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-40 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-teal-500 text-slate-950 font-extrabold rounded-xl flex items-center justify-center text-sm shadow-xs">
              CMS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-sm sm:text-base text-white">
                  BharatSeva CMS Studio
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  ADMIN v2.6
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Manage Jobs, Results, Admit Cards, Answer Keys, PYQs & Notices
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {onCloseAdmin && (
              <button
                onClick={onCloseAdmin}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center space-x-1"
              >
                <Eye className="w-3.5 h-3.5 mr-1 text-teal-400" />
                <span>View Public Site</span>
              </button>
            )}

            <button
              onClick={() => {
                setNewUsernameInput(storedUsername);
                setNewPasswordInput(storedPassword);
                setIsSecurityModalOpen(true);
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/20 text-xs font-bold rounded-xl transition flex items-center space-x-1"
              title="Change Admin Username & Password"
            >
              <Key className="w-3.5 h-3.5 mr-1" />
              <span className="hidden sm:inline">Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold rounded-xl transition flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Sub-Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-2.5 space-y-1">
            <p className="text-[10px] uppercase font-extrabold text-slate-400 px-3 py-2 tracking-wider">
              CMS NAVIGATION
            </p>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'dashboard'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.total}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'jobs'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4" />
                <span>/admin/jobs</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.jobsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'results'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>/admin/results</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.resultsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('admit-cards')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'admit-cards'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>/admin/admit-cards</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.admitCardsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('answer-keys')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'answer-keys'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4" />
                <span>/admin/answer-keys</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.answerKeysCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pyqs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'pyqs'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>/admin/pyqs</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.pyqsCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === 'notices'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>/admin/notices</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-black/20">
                {stats.noticesCount}
              </span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <p className="font-extrabold text-teal-400 uppercase tracking-wider text-[11px]">
              📌 Quick Publishing Rules
            </p>
            <ul className="text-slate-400 text-[11px] space-y-1.5 list-disc pl-3">
              <li>
                <strong className="text-emerald-400">Published:</strong> Immediately visible to candidates.
              </li>
              <li>
                <strong className="text-amber-400">Scheduled:</strong> Auto-publishes on specified date.
              </li>
              <li>
                <strong className="text-slate-300">Draft:</strong> Hidden from public site.
              </li>
              <li>
                <strong className="text-rose-400">Expired:</strong> Archived from active listings.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-4 space-y-6">
          {/* DASHBOARD TAB OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 border border-slate-800 rounded-3xl p-6">
                <div>
                  <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                    <span>BharatSeva System Overview</span>
                    <Sparkles className="w-5 h-5 text-teal-400" />
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Live publication control across Bihar State & Central recruitment channels
                  </p>
                </div>
                <button
                  onClick={openAddModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center space-x-2 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish New Record</span>
                </button>
              </div>

              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-xs font-extrabold uppercase">Published</span>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-white">{stats.published}</div>
                  <p className="text-[10px] text-slate-400">Active on Public Portal</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-amber-400">
                    <span className="text-xs font-extrabold uppercase">Scheduled</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-white">{stats.scheduled}</div>
                  <p className="text-[10px] text-slate-400">Pending Timed Release</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-extrabold uppercase">Drafts</span>
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-white">{stats.draft}</div>
                  <p className="text-[10px] text-slate-400">Internal Preparation</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1">
                  <div className="flex items-center justify-between text-rose-400">
                    <span className="text-xs font-extrabold uppercase">Expired</span>
                    <Ban className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-black text-white">{stats.expired}</div>
                  <p className="text-[10px] text-slate-400">Archived Notifications</p>
                </div>
              </div>

              {/* Module Summary Cards */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-extrabold uppercase text-slate-300 tracking-wider">
                  Active Content Repositories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div
                    onClick={() => setActiveTab('jobs')}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">/admin/jobs</span>
                      <Briefcase className="w-4 h-4 text-teal-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">{stats.jobsCount}</div>
                  </div>

                  <div
                    onClick={() => setActiveTab('results')}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">/admin/results</span>
                      <Award className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">{stats.resultsCount}</div>
                  </div>

                  <div
                    onClick={() => setActiveTab('admit-cards')}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">/admin/admit-cards</span>
                      <CreditCard className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      {stats.admitCardsCount}
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('answer-keys')}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">/admin/answer-keys</span>
                      <Key className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      {stats.answerKeysCount}
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab('pyqs')}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">/admin/pyqs</span>
                      <BookOpen className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">{stats.pyqsCount}</div>
                  </div>

                  <div
                    onClick={() => setActiveTab('notices')}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:border-teal-500/50 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-200">/admin/notices</span>
                      <Bell className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="text-xl font-extrabold text-white">{stats.noticesCount}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE LIST VIEWS (JOBS, RESULTS, ADMIT-CARDS, ANSWER-KEYS, PYQS, NOTICES) */}
          {activeTab !== 'dashboard' && (
            <div className="space-y-6">
              {/* Header with Search & Add button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950 border border-slate-800 rounded-3xl p-6">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-teal-500/20 text-teal-400 border border-teal-500/30 uppercase tracking-widest">
                      CMS MODULE
                    </span>
                    <h2 className="text-xl font-black text-white capitalize">
                      /admin/{activeTab}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage entries, publish schedules, expire old items & attach official PDFs
                  </p>
                </div>

                <button
                  onClick={openAddModal}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center space-x-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Record</span>
                </button>
              </div>

              {/* Search Bar & Status Filter Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search records by title, body, or organ..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Filter Status Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {(['All', 'Published', 'Draft', 'Scheduled', 'Expired'] as const).map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          statusFilter === status
                            ? 'bg-teal-500 text-slate-950 shadow-xs'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Records Table / List */}
              <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="p-4">Title & Info</th>
                        <th className="p-4">Category / Body</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Official PDF</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {/* JOBS RENDER */}
                      {activeTab === 'jobs' &&
                        jobs
                          .filter((j) => {
                            const matchSearch =
                              j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              j.organization.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus =
                              statusFilter === 'All' || j.publishStatus === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((job) => (
                            <tr key={job.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-4 space-y-1">
                                <div className="font-extrabold text-white text-sm line-clamp-1">
                                  {job.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Vacancy: {job.vacancy} | Deadline: {job.deadlineDate || job.dates}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-teal-400">{job.organization}</span>
                                <div className="text-[10px] text-slate-400">{job.type} Govt</div>
                              </td>
                              <td className="p-4">{renderStatusBadge(job.publishStatus)}</td>
                              <td className="p-4">
                                {job.pdfUrl ? (
                                  <a
                                    href={job.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-teal-400 hover:underline font-medium text-[11px]"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span className="truncate max-w-[120px]">
                                      {job.pdfName || 'Download PDF'}
                                    </span>
                                  </a>
                                ) : (
                                  <span className="text-slate-600 text-[11px]">No PDF</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateStatus('jobs', job.id, 'Published')}
                                    title="Publish Instantly"
                                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => updateStatus('jobs', job.id, 'Expired')}
                                    title="Mark Expired"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Ban className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openEditModal(job)}
                                    title="Edit Item"
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItem('jobs', job.id)}
                                    title="Delete Record"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                      {/* RESULTS RENDER */}
                      {activeTab === 'results' &&
                        results
                          .filter((r) => {
                            const matchSearch =
                              r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              r.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus =
                              statusFilter === 'All' || r.publishStatus === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((res) => (
                            <tr key={res.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-4 space-y-1">
                                <div className="font-extrabold text-white text-sm line-clamp-1">
                                  {res.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Release Date: {res.releaseDate}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-emerald-400">{res.conductingBody}</span>
                              </td>
                              <td className="p-4">{renderStatusBadge(res.publishStatus)}</td>
                              <td className="p-4">
                                {res.meritListPdfUrl ? (
                                  <a
                                    href={res.meritListPdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-teal-400 hover:underline font-medium text-[11px]"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span>{res.pdfName || 'Merit List PDF'}</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-600 text-[11px]">No PDF</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateStatus('results', res.id, 'Published')}
                                    title="Publish Instantly"
                                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openEditModal(res)}
                                    title="Edit Item"
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItem('results', res.id)}
                                    title="Delete Record"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                      {/* ADMIT CARDS RENDER */}
                      {activeTab === 'admit-cards' &&
                        admitCards
                          .filter((ac) => {
                            const matchSearch =
                              ac.admitCardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              ac.organization.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus =
                              statusFilter === 'All' || ac.publishStatus === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((ac) => (
                            <tr key={ac.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-4 space-y-1">
                                <div className="font-extrabold text-white text-sm line-clamp-1">
                                  {ac.admitCardName}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Exam Date: {ac.examDate}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-purple-400">{ac.organization}</span>
                              </td>
                              <td className="p-4">{renderStatusBadge(ac.publishStatus)}</td>
                              <td className="p-4">
                                {ac.pdfUrl ? (
                                  <a
                                    href={ac.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-teal-400 hover:underline font-medium text-[11px]"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span>{ac.pdfName || 'Notice PDF'}</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-600 text-[11px]">No PDF</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateStatus('admit-cards', ac.id, 'Published')}
                                    title="Publish Instantly"
                                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openEditModal(ac)}
                                    title="Edit Item"
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItem('admit-cards', ac.id)}
                                    title="Delete Record"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                      {/* ANSWER KEYS RENDER */}
                      {activeTab === 'answer-keys' &&
                        answerKeys
                          .filter((ak) => {
                            const matchSearch =
                              ak.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              ak.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus =
                              statusFilter === 'All' || ak.publishStatus === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((ak) => (
                            <tr key={ak.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-4 space-y-1">
                                <div className="font-extrabold text-white text-sm line-clamp-1">
                                  {ak.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Objection Deadline: {ak.objectionDeadline}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-amber-400">{ak.conductingBody}</span>
                              </td>
                              <td className="p-4">{renderStatusBadge(ak.publishStatus)}</td>
                              <td className="p-4">
                                {ak.answerKeyPdfUrl ? (
                                  <a
                                    href={ak.answerKeyPdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-teal-400 hover:underline font-medium text-[11px]"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span>{ak.pdfName || 'Answer Key PDF'}</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-600 text-[11px]">No PDF</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateStatus('answer-keys', ak.id, 'Published')}
                                    title="Publish Instantly"
                                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openEditModal(ak)}
                                    title="Edit Item"
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItem('answer-keys', ak.id)}
                                    title="Delete Record"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                      {/* PYQS RENDER */}
                      {activeTab === 'pyqs' &&
                        pyqs
                          .filter((pyq) => {
                            const matchSearch =
                              pyq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              pyq.conductingBody.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus =
                              statusFilter === 'All' || pyq.publishStatus === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((pyq) => (
                            <tr key={pyq.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-4 space-y-1">
                                <div className="font-extrabold text-white text-sm line-clamp-1">
                                  {pyq.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Year: {pyq.year} | Tier: {pyq.tier} | Questions: {pyq.totalQuestions}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-blue-400">{pyq.conductingBody}</span>
                              </td>
                              <td className="p-4">{renderStatusBadge(pyq.publishStatus)}</td>
                              <td className="p-4">
                                {pyq.pdfUrl ? (
                                  <a
                                    href={pyq.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-teal-400 hover:underline font-medium text-[11px]"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span>{pyq.pdfName || 'PYQ Paper PDF'}</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-600 text-[11px]">No PDF</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateStatus('pyqs', pyq.id, 'Published')}
                                    title="Publish Instantly"
                                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openEditModal(pyq)}
                                    title="Edit Item"
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItem('pyqs', pyq.id)}
                                    title="Delete Record"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                      {/* NOTICES RENDER */}
                      {activeTab === 'notices' &&
                        notices
                          .filter((not) => {
                            const matchSearch =
                              not.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              not.issuingBody.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus =
                              statusFilter === 'All' || not.publishStatus === statusFilter;
                            return matchSearch && matchStatus;
                          })
                          .map((not) => (
                            <tr key={not.id} className="hover:bg-slate-900/40 transition">
                              <td className="p-4 space-y-1">
                                <div className="font-extrabold text-white text-sm line-clamp-1">
                                  {not.title}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  Urgency: {not.urgency} | Date: {not.releaseDate}
                                </div>
                              </td>
                              <td className="p-4">
                                <span className="font-bold text-rose-400">{not.issuingBody}</span>
                              </td>
                              <td className="p-4">{renderStatusBadge(not.publishStatus)}</td>
                              <td className="p-4">
                                {not.noticePdfUrl ? (
                                  <a
                                    href={not.noticePdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-teal-400 hover:underline font-medium text-[11px]"
                                  >
                                    <FileDown className="w-3.5 h-3.5" />
                                    <span>{not.pdfName || 'Notice PDF'}</span>
                                  </a>
                                ) : (
                                  <span className="text-slate-600 text-[11px]">No PDF</span>
                                )}
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <button
                                    onClick={() => updateStatus('notices', not.id, 'Published')}
                                    title="Publish Instantly"
                                    className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openEditModal(not)}
                                    title="Edit Item"
                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => deleteItem('notices', not.id)}
                                    title="Delete Record"
                                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADD / EDIT RECORD MODAL (WITH PDF UPLOAD, STATUS SELECTION & SCHEDULING) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-teal-500/20 text-teal-400 border border-teal-500/30 uppercase">
                  {modalMode === 'add' ? 'NEW ENTRY' : 'EDIT ENTRY'}
                </span>
                <h3 className="text-lg font-black text-white capitalize">
                  {modalMode === 'add' ? `Add /admin/${activeTab}` : `Edit /admin/${activeTab}`}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Title / Headline *</label>
                <input
                  type="text"
                  value={formFields.title || formFields.admitCardName || ''}
                  onChange={(e) =>
                    setFormFields((f) => ({
                      ...f,
                      title: e.target.value,
                      admitCardName: e.target.value,
                    }))
                  }
                  required
                  placeholder="e.g. BPSC 71st CCE Official Notification 2026"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Organization / Conducting Body *
                  </label>
                  <input
                    type="text"
                    value={
                      formFields.organization ||
                      formFields.conductingBody ||
                      formFields.issuingBody ||
                      ''
                    }
                    onChange={(e) =>
                      setFormFields((f) => ({
                        ...f,
                        organization: e.target.value,
                        conductingBody: e.target.value,
                        issuingBody: e.target.value,
                      }))
                    }
                    required
                    placeholder="e.g. Bihar Public Service Commission (BPSC)"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category / Board</label>
                  <select
                    value={formFields.category || formFields.type || 'BPSC'}
                    onChange={(e) =>
                      setFormFields((f) => ({
                        ...f,
                        category: e.target.value,
                        type: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
                  >
                    <option value="BPSC">BPSC</option>
                    <option value="BSSC">BSSC</option>
                    <option value="Bihar Police">Bihar Police</option>
                    <option value="Bihar Teacher">Bihar Teacher (TRE)</option>
                    <option value="UPSC">UPSC</option>
                    <option value="SSC">SSC</option>
                    <option value="Railways">Railways (RRB)</option>
                    <option value="Banking">Banking (IBPS/SBI)</option>
                  </select>
                </div>
              </div>

              {/* Status & Schedule Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 border border-slate-800 rounded-2xl">
                <div>
                  <label className="block font-bold text-teal-400 mb-1">Publish Status 📌</label>
                  <select
                    value={formFields.publishStatus || 'Published'}
                    onChange={(e) =>
                      setFormFields((f) => ({ ...f, publishStatus: e.target.value as any }))
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 font-bold focus:outline-none focus:border-teal-500"
                  >
                    <option value="Published">📌 Published (Visible Now)</option>
                    <option value="Draft">📄 Draft (Hidden)</option>
                    <option value="Scheduled">⏰ Scheduled (Timed Release)</option>
                    <option value="Expired">⛔ Expired (Archived)</option>
                  </select>
                </div>

                {formFields.publishStatus === 'Scheduled' && (
                  <div>
                    <label className="block font-bold text-amber-400 mb-1">
                      Scheduled Release Date ⏰
                    </label>
                    <input
                      type="date"
                      value={
                        formFields.scheduledPublishDate || new Date().toISOString().split('T')[0]
                      }
                      onChange={(e) =>
                        setFormFields((f) => ({ ...f, scheduledPublishDate: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                )}
              </div>

              {/* PDF FILE UPLOAD SECTION */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-300">
                  Attach Official PDF Document 📄
                </label>
                <div className="border-2 border-dashed border-slate-800 hover:border-teal-500/60 rounded-2xl p-4 bg-slate-950 text-center transition space-y-2">
                  <UploadCloud className="w-8 h-8 text-teal-400 mx-auto" />
                  <div className="text-slate-300 font-medium">
                    {uploadedPdfName ? (
                      <span className="text-teal-400 font-bold">Attached: {uploadedPdfName}</span>
                    ) : (
                      <span>Drag & Drop official PDF here, or click to browse</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfFileChange}
                    className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-500 file:text-slate-950 cursor-pointer"
                  />
                </div>
              </div>

              {/* Module-Specific Extra Fields */}
              {activeTab === 'jobs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Vacancy Count</label>
                    <input
                      type="text"
                      value={formFields.vacancy || ''}
                      onChange={(e) => setFormFields((f) => ({ ...f, vacancy: e.target.value }))}
                      placeholder="e.g. 1,950 Posts"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">
                      Application Deadline Date
                    </label>
                    <input
                      type="date"
                      value={formFields.deadlineDate || ''}
                      onChange={(e) =>
                        setFormFields((f) => ({ ...f, deadlineDate: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 font-mono"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'pyqs' && (
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Exam Year</label>
                    <input
                      type="number"
                      value={formFields.year || 2025}
                      onChange={(e) =>
                        setFormFields((f) => ({ ...f, year: Number(e.target.value) }))
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Tier / Phase</label>
                    <input
                      type="text"
                      value={formFields.tier || 'Prelims'}
                      onChange={(e) => setFormFields((f) => ({ ...f, tier: e.target.value }))}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Total Questions</label>
                    <input
                      type="number"
                      value={formFields.totalQuestions || 150}
                      onChange={(e) =>
                        setFormFields((f) => ({ ...f, totalQuestions: Number(e.target.value) }))
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-extrabold rounded-xl shadow-lg transition cursor-pointer"
                >
                  Save & Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* SECURITY / CHANGE CREDENTIALS MODAL */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Key className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white">Change Admin Credentials</h3>
              </div>
              <button
                onClick={() => setIsSecurityModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {securitySuccessMsg && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 font-bold text-center">
                {securitySuccessMsg}
              </div>
            )}

            <form onSubmit={handleUpdateCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  New Admin Username
                </label>
                <input
                  type="text"
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-200 focus:outline-none focus:border-amber-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  New Admin Password
                </label>
                <input
                  type="password"
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-slate-200 focus:outline-none focus:border-amber-400"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Credentials will be saved in your browser storage.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsSecurityModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition"
                >
                  Update Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
