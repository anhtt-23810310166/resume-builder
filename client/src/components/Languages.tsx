'use client';
import { FaLanguage, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { LanguageItem } from '@/types/resume';

interface LanguagesProps {
  data: LanguageItem[];
  onChange: (data: LanguageItem[]) => void;
}

export default function Languages({ data, onChange }: LanguagesProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addEntry = () => {
    onChange([...data, { name: '', level: '' }]);
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
        <div className="section-icon"><FaLanguage /></div>
        <h3>Languages</h3>
        <span className={`section-toggle ${isOpen ? 'open' : ''}`}><FaChevronDown /></span>
      </div>
      
      {isOpen && (
        <div className="section-content">
          <div className="languages-grid">
            {data.map((entry, index) => (
              <div key={index} className="form-group">
                <div className="input-with-remove">
                  <input
                    type="text"
                    placeholder="e.g. English"
                    value={entry.name}
                    onChange={(e) => updateEntry(index, e.target.value)}
                  />
                  <button
                    className="input-remove-btn"
                    onClick={() => removeEntry(index)}
                    title="Remove Language"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="add-entry-btn" onClick={addEntry}>
            <FaPlus /> Add Language
          </button>
        </div>
      )}
    </div>
  );
}
