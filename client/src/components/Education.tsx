'use client';
import { FaGraduationCap, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { EducationItem } from '@/types/resume';

interface EducationProps {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
}

export default function Education({ data, onChange }: EducationProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addEntry = () => {
    onChange([...data, { school: '', degree: '', field: '', startDate: '', endDate: '' }]);
  };

  const removeEntry = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof EducationItem, value: string) => {
    const updated = data.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    onChange(updated);
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="section-icon"><FaGraduationCap /></div>
        <h3>Education</h3>
        <span className={`section-toggle ${isOpen ? 'open' : ''}`}><FaChevronDown /></span>
      </div>
      {isOpen && (
        <div className="section-content">
          {data.map((entry, index) => (
            <div key={index} className="entry-card">
              <button className="remove-entry-btn" onClick={() => removeEntry(index)}>
                <FaTrash />
              </button>
              <div className="form-row">
                <div className="form-group">
                  <label>School / University</label>
                  <input
                    type="text"
                    placeholder="MIT"
                    value={entry.school}
                    onChange={(e) => updateEntry(index, 'school', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    placeholder="Bachelor of Science"
                    value={entry.degree}
                    onChange={(e) => updateEntry(index, 'degree', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group full-width" style={{ marginTop: '14px' }}>
                <label>Field of Study</label>
                <input
                  type="text"
                  placeholder="Computer Science"
                  value={entry.field}
                  onChange={(e) => updateEntry(index, 'field', e.target.value)}
                />
              </div>
              <div className="form-row" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    placeholder="Sep 2016"
                    value={entry.startDate}
                    onChange={(e) => updateEntry(index, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    placeholder="Jun 2020"
                    value={entry.endDate}
                    onChange={(e) => updateEntry(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button className="add-entry-btn" onClick={addEntry}>
            <FaPlus /> Add Education
          </button>
        </div>
      )}
    </div>
  );
}
