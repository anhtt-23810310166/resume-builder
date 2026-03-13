'use client';

import { useState, useEffect } from 'react';
import { FaFilePdf, FaSave, FaMagic, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import PersonalInfo from '@/components/PersonalInfo';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Languages from '@/components/Languages';
import ClassicTemplate from '@/templates/ClassicTemplate';
import ModernTemplate from '@/templates/ModernTemplate';
import MinimalTemplate from '@/templates/MinimalTemplate';
import ProfessionalTemplate from '@/templates/ProfessionalTemplate';
import { exportToPdf } from '@/utils/pdfExport';
import { ResumeData } from '@/types/resume';
import { initialData, sampleData, templates } from '@/constants/resumeData';
import ThemeToggle from './ThemeToggle';
import '@/components/FormStyles.css';
import '@/templates/TemplateStyles.css';
import './page.css';

interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeTemplate, setActiveTemplate] = useState('classic');
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [loadId, setLoadId] = useState('');
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resume_builder_data');
    const savedTemplate = localStorage.getItem('resume_builder_template');
    const savedId = localStorage.getItem('resume_builder_id');
    
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (e) {
        console.error('Failed to parse saved data', e);
      }
    }
    
    if (savedTemplate) {
      setActiveTemplate(savedTemplate);
    }

    if (savedId) {
      setResumeId(savedId);
    }
  }, []);

  // 2. Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (resumeData !== initialData) {
      localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
    }
    localStorage.setItem('resume_builder_template', activeTemplate);
    if (resumeId) {
      localStorage.setItem('resume_builder_id', resumeId);
    }
  }, [resumeData, activeTemplate, resumeId]);

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      const filename = `${resumeData.fullName || 'resume'}_${activeTemplate}.pdf`;
      await exportToPdf('cv-preview', filename);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
      const isUpdate = !!resumeId;
      const url = isUpdate ? `${apiUrl}/api/resumes/${resumeId}` : `${apiUrl}/api/resumes`;
      
      const res = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...resumeData, template: activeTemplate }),
      });

        if (res.ok) {
          const data = await res.json();
          const newId = data.shortId || data.id;
          if (!isUpdate && newId) {
            setResumeId(newId);
          }
          showToast(isUpdate ? 'Hồ sơ đã được cập nhật thành công!' : `Đã lưu hồ sơ thành công! ID: ${newId}`, 'success');
        }
      } catch (error) {
        showToast('Server offline — dữ liệu được lưu tạm ở máy', 'error');
      } finally {
        setIsSaving(false);
      }
    };

    const handleLoadById = async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!loadId.trim()) return;

      setIsSaving(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';
        const res = await fetch(`${apiUrl}/api/resumes/${loadId.trim().toUpperCase()}`);
        if (res.ok) {
          const data = await res.json();
          // Remove DB specific fields if any, or just set data
          const { id, shortId, createdAt, updatedAt, ...rest } = data;
          setResumeData(rest.data || rest); // Support both nested data and flat data if changed
          setResumeId(shortId || id);
          if (data.template) setActiveTemplate(data.template);
          if (data.data?.template) setActiveTemplate(data.data.template);
          showToast('Đã tải hồ sơ thành công!', 'success');
          setLoadId('');
        } else {
          showToast('Không tìm thấy hồ sơ với ID này!', 'error');
        }
      } catch (error) {
        showToast('Không thể kết nối tới máy chủ', 'error');
      } finally {
        setIsSaving(false);
      }
    };

  const handleLoadSample = () => {
    setResumeData(sampleData);
  };

  const handleClear = () => {
    setShowClearConfirm(true);
  };

  const confirmClear = () => {
    setResumeData(initialData);
    setResumeId(null);
    localStorage.removeItem('resume_builder_data');
    localStorage.removeItem('resume_builder_template');
    localStorage.removeItem('resume_builder_id');
    setShowClearConfirm(false);
  };

  const renderTemplate = () => {
    const props = { data: resumeData };
    switch (activeTemplate) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'minimal': return <MinimalTemplate {...props} />;
      case 'professional': return <ProfessionalTemplate {...props} />;
      default: return <ClassicTemplate {...props} />;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="header-logo">
            <h1>ResumeBuilder</h1>
          </div>
          {resumeId && (
            <div className="id-badge-inline">
              <span>ID:</span> <strong>{resumeId}</strong>
            </div>
          )}
        </div>
        <div className="header-actions">
          <ThemeToggle />
          
          <form className="load-form" onSubmit={handleLoadById}>
            <input 
              type="text" 
              placeholder="Load ID..." 
              value={loadId}
              onChange={(e) => setLoadId(e.target.value)}
              className="load-input"
            />
            <button type="submit" className="btn btn-ghost btn-sm">Load</button>
          </form>

          <div className="divider-v"></div>

          <button className="btn btn-ghost" onClick={handleClear}>
            <span>Clear</span>
          </button>
          <button className="btn btn-ghost" onClick={handleLoadSample}>
            <FaMagic /> <span>Sample</span>
          </button>
          <button className="btn btn-secondary" onClick={handleSave} disabled={isSaving}>
            <FaSave /> <span>{isSaving ? 'Saving...' : (resumeId ? 'Update' : 'Save')}</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportPdf} disabled={isExporting}>
            <FaFilePdf /> <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
        {toast && (
          <div className={`toast-container toast-${toast.type}`}>
            {toast.type === 'success' && <FaCheckCircle />}
            {toast.type === 'error' && <FaExclamationCircle />}
            {toast.type === 'info' && <FaInfoCircle />}
            <span>{toast.message}</span>
          </div>
        )}
      </header>

      {/* Mobile View Toggle */}
      <div className="mobile-view-toggle">
        <button 
          className={mobileView === 'edit' ? 'active' : ''} 
          onClick={() => setMobileView('edit')}
        >
          Editor
        </button>
        <button 
          className={mobileView === 'preview' ? 'active' : ''} 
          onClick={() => setMobileView('preview')}
        >
          Preview
        </button>
      </div>

      {/* Main Content */}
      <div className={`app-main view-${mobileView}`}>
        {/* Left Panel - Form */}
        <div className={`panel-form ${mobileView === 'edit' ? 'show-mobile' : 'hide-mobile'}`}>
          <PersonalInfo
            data={resumeData}
            onChange={(personalData) => setResumeData({ ...resumeData, ...personalData })}
          />
          <Experience
            data={resumeData.experience}
            onChange={(experience) => setResumeData({ ...resumeData, experience })}
          />
          <Education
            data={resumeData.education}
            onChange={(education) => setResumeData({ ...resumeData, education })}
          />
          <Skills
            data={resumeData.skills}
            onChange={(skills) => setResumeData({ ...resumeData, skills })}
          />
          <Projects
            data={resumeData.projects}
            onChange={(projects) => setResumeData({ ...resumeData, projects })}
          />
          <Languages
            data={resumeData.languages}
            onChange={(languages) => setResumeData({ ...resumeData, languages })}
          />
        </div>

        {/* Right Panel - Preview */}
        <div className={`panel-preview ${mobileView === 'preview' ? 'show-mobile' : 'hide-mobile'}`}>
          {/* Template Selector */}
          <div className="template-selector">
            <div className="template-tabs">
              {templates.map((t) => (
                <button
                  key={t.id}
                  className={`template-tab ${activeTemplate === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTemplate(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* CV Preview */}
          <div className="preview-scroll">
            <div id="cv-preview">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Clear All Data?</h2>
              <p>This will permanently remove your current draft and all entered information. This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowClearConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmClear}>
                Clear Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
