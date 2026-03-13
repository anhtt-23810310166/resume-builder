'use client';
import { FaProjectDiagram, FaChevronDown, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { ProjectItem } from '@/types/resume';

interface ProjectsProps {
  data: ProjectItem[];
  onChange: (data: ProjectItem[]) => void;
}

export default function Projects({ data, onChange }: ProjectsProps) {
  const [isOpen, setIsOpen] = useState(true);

  const addEntry = () => {
    onChange([...data, { name: '', description: '', techStack: '', link: '' }]);
  };

  const removeEntry = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof ProjectItem, value: string) => {
    const updated = data.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    onChange(updated);
  };

  return (
    <div className="form-section">
      <div className="section-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="section-icon"><FaProjectDiagram /></div>
        <h3>Projects</h3>
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
                  <label>Project Name</label>
                  <input
                    type="text"
                    placeholder="E-commerce Platform"
                    value={entry.name}
                    onChange={(e) => updateEntry(index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Tech Stack</label>
                  <input
                    type="text"
                    placeholder="React, Node.js, MongoDB"
                    value={entry.techStack}
                    onChange={(e) => updateEntry(index, 'techStack', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group full-width" style={{ marginTop: '14px' }}>
                <label>Description</label>
                <textarea
                  placeholder="Brief description of the project..."
                  value={entry.description}
                  onChange={(e) => updateEntry(index, 'description', e.target.value)}
                  rows={2}
                />
              </div>
              <div className="form-group full-width" style={{ marginTop: '14px' }}>
                <label>Link</label>
                <input
                  type="text"
                  placeholder="https://github.com/..."
                  value={entry.link}
                  onChange={(e) => updateEntry(index, 'link', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="add-entry-btn" onClick={addEntry}>
            <FaPlus /> Add Project
          </button>
        </div>
      )}
    </div>
  );
}
