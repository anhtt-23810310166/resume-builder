import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: TemplateProps) {
  return (
    <div className="cv-template professional-template">
      {/* Header */}
      <div className="pro-header">
        <h1 className="pro-name">{data.fullName || 'YOUR NAME'}</h1>
        <p className="pro-job-title">{data.jobTitle || 'JOB TITLE'}</p>
        
        <div className="pro-contact-grid">
          {data.email && (
            <span className="pro-contact-item"><FaEnvelope /> {data.email}</span>
          )}
          {data.phone && (
            <span className="pro-contact-item"><FaPhone /> {data.phone}</span>
          )}
          {data.address && (
            <span className="pro-contact-item"><FaMapMarkerAlt /> {data.address}</span>
          )}
          {data.linkedin && (
            <span className="pro-contact-item"><FaLinkedin /> {data.linkedin}</span>
          )}
          {data.website && (
            <span className="pro-contact-item"><FaGlobe /> {data.website}</span>
          )}
        </div>
      </div>

      <div className="pro-content">
        {/* Left Column */}
        <div className="pro-main">
          {/* Summary */}
          {data.summary && (
            <div className="pro-section">
              <h2 className="pro-section-title">Professional Summary</h2>
              <div className="pro-summary">{data.summary}</div>
            </div>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <div className="pro-section">
              <h2 className="pro-section-title">Work Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={i} className="pro-entry">
                  <div className="pro-entry-header">
                    <span className="pro-entry-role">{exp.position}</span>
                    <span className="pro-entry-date">{exp.startDate} — {exp.endDate || 'Present'}</span>
                  </div>
                  <div className="pro-entry-company">{exp.company}</div>
                  {exp.description && (
                    <div className="pro-entry-desc">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <div className="pro-section">
              <h2 className="pro-section-title">Education</h2>
              {data.education.map((edu, i) => (
                <div key={i} className="pro-entry">
                  <div className="pro-entry-header">
                    <span className="pro-entry-role">{edu.degree} in {edu.field}</span>
                    <span className="pro-entry-date">{edu.startDate} — {edu.endDate || 'Present'}</span>
                  </div>
                  <div className="pro-entry-company">{edu.school}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column / Sidebar Area */}
        <div className="pro-sidebar">
          {/* Skills */}
          {data.skills?.length > 0 && (
            <div className="pro-section">
              <h2 className="pro-section-title">Skills</h2>
              <div className="pro-skills-grid">
                {data.skills.map((skill, i) => (
                  <span key={i} className="pro-skill-tag">{skill.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <div className="pro-section">
              <h2 className="pro-section-title">Languages</h2>
              <div className="pro-languages-list">
                {data.languages.map((lang, i) => (
                  <div key={i} className="pro-lang-item">
                    <strong>{lang.name}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <div className="pro-section">
              <h2 className="pro-section-title">Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={i} className="pro-entry compact">
                  <div className="pro-entry-role small">{proj.name}</div>
                  {proj.techStack && <div className="pro-entry-company small">{proj.techStack}</div>}
                  {proj.description && <div className="pro-entry-desc small">{proj.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
