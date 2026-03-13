'use client';
import { FaBriefcase, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { ExperienceItem } from '@/types/resume';

interface ExperienceProps {
  data: ExperienceItem[];
  onChange: (data: ExperienceItem[]) => void;
}

export default function Experience({ data, onChange }: ExperienceProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addEntry = () => {
    onChange([...data, { company: '', position: '', startDate: '', endDate: '', description: '' }]);
  };

  const removeEntry = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof ExperienceItem, value: string) => {
    const updated = data.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    onChange(updated);
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="section-icon"><FaBriefcase /></div>
        <h3>Work Experience</h3>
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
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Google Inc."
                    value={entry.company}
                    onChange={(e) => updateEntry(index, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    placeholder="Senior Developer"
                    value={entry.position}
                    onChange={(e) => updateEntry(index, 'position', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-row" style={{ marginTop: '14px' }}>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="text"
                    placeholder="Jan 2020"
                    value={entry.startDate}
                    onChange={(e) => updateEntry(index, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="text"
                    placeholder="Present"
                    value={entry.endDate}
                    onChange={(e) => updateEntry(index, 'endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group full-width" style={{ marginTop: '14px' }}>
                <label>Description</label>
                <textarea
                  placeholder="Key responsibilities and achievements..."
                  value={entry.description}
                  onChange={(e) => updateEntry(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}
          <button className="add-entry-btn" onClick={addEntry}>
            <FaPlus /> Add Experience
          </button>
        </div>
      )}
    </div>
  );
}
