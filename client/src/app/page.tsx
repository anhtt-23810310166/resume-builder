'use client';

import { useState } from 'react';
import { FaFilePdf, FaSave, FaMagic } from 'react-icons/fa';
import PersonalInfo from '@/components/PersonalInfo';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Languages from '@/components/Languages';
import ClassicTemplate from '@/templates/ClassicTemplate';
import ModernTemplate from '@/templates/ModernTemplate';
import MinimalTemplate from '@/templates/MinimalTemplate';
import { exportToPdf } from '@/utils/pdfExport';
import { ResumeData } from '@/types/resume';
import { initialData, sampleData, templates } from '@/constants/resumeData';
import ThemeToggle from './ThemeToggle';
import '@/components/FormStyles.css';
import '@/templates/TemplateStyles.css';
import './page.css';

export default function HomePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeTemplate, setActiveTemplate] = useState('classic');
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

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
    setSaveMessage('');
    try {
      const res = await fetch('http://localhost:3002/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...resumeData, template: activeTemplate }),
      });
      if (res.ok) {
        const data = await res.json();
        setSaveMessage(`Saved! ID: ${data.id}`);
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      setSaveMessage('Server offline — data kept locally');
      setTimeout(() => setSaveMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadSample = () => {
    setResumeData(sampleData);
  };

  const handleClear = () => {
    setResumeData(initialData);
  };

  const renderTemplate = () => {
    const props = { data: resumeData };
    switch (activeTemplate) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'minimal': return <MinimalTemplate {...props} />;
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
        </div>
        <div className="header-actions">
          <ThemeToggle />
          <button className="btn btn-ghost" onClick={handleClear}>
            <span>Clear</span>
          </button>
          <button className="btn btn-ghost" onClick={handleLoadSample}>
            <FaMagic /> <span>Load Sample</span>
          </button>
          <button className="btn btn-secondary" onClick={handleSave} disabled={isSaving}>
            <FaSave /> <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          <button className="btn btn-primary" onClick={handleExportPdf} disabled={isExporting}>
            <FaFilePdf /> <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
        {saveMessage && <div className="save-toast">{saveMessage}</div>}
      </header>

      {/* Main Content */}
      <div className="app-main">
        {/* Left Panel - Form */}
        <div className="panel-form">
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
        <div className="panel-preview">
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
    </div>
  );
}
