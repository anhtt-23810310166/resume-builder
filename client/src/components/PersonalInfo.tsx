'use client';
import { FaUser, FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import { ResumeData } from '@/types/resume';

interface PersonalInfoProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

export default function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (field: keyof ResumeData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="section-icon"><FaUser /></div>
        <h3>Personal Information</h3>
        <span className={`section-toggle ${isOpen ? 'open' : ''}`}><FaChevronDown /></span>
      </div>
      {isOpen && (
        <div className="section-content">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                value={data.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Senior Software Engineer"
                value={data.jobTitle || ''}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={data.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={data.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="New York, NY"
                value={data.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="text"
                placeholder="linkedin.com/in/johndoe"
                value={data.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>Website</label>
            <input
              type="text"
              placeholder="johndoe.dev"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
          <div className="form-group full-width">
            <label>Professional Summary</label>
            <textarea
              placeholder="A brief summary of your professional background, key skills, and career objectives..."
              value={data.summary || ''}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      )}
    </div>
  );
}
