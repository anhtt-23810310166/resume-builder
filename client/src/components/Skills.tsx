'use client';
import { FaCogs, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { SkillItem } from '@/types/resume';

interface SkillsProps {
  data: SkillItem[];
  onChange: (data: SkillItem[]) => void;
}

export default function Skills({ data, onChange }: SkillsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addEntry = () => {
    onChange([...data, { name: '' }]);
  };

  const removeEntry = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, value: string) => {
    const updated = data.map((entry, i) =>
      i === index ? { ...entry, name: value } : entry
    );
    onChange(updated);
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="section-icon"><FaCogs /></div>
        <h3>Skills</h3>
        <span className={`section-toggle ${isOpen ? 'open' : ''}`}><FaChevronDown /></span>
      </div>
      
      {isOpen && (
        <div className="section-content">
          <div className="skills-clean-grid">
            {data.map((entry, index) => (
              <div key={index} className="form-group">
                <div className="input-with-remove">
                  <input
                    type="text"
                    placeholder="e.g. React.js"
                    value={entry.name}
                    onChange={(e) => updateEntry(index, e.target.value)}
                  />
                  <button
                    className="input-remove-btn"
                    onClick={() => removeEntry(index)}
                    title="Remove Skill"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add-entry-btn" onClick={addEntry}>
            <FaPlus /> Add Skill
          </button>
        </div>
      )}
    </div>
  );
}
