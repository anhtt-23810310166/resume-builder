import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: TemplateProps) {
  return (
    <div className="cv-template minimal-template">
      {/* Header */}
      <div className="minimal-header">
        <div className="minimal-name">{data.fullName || 'Your Name'}</div>
        {data.jobTitle && <div className="minimal-title">{data.jobTitle}</div>}
        <div className="minimal-contact">
          {data.email && <span><FaEnvelope /> {data.email}</span>}
          {data.phone && <span><FaPhone /> {data.phone}</span>}
          {data.address && <span><FaMapMarkerAlt /> {data.address}</span>}
          {data.linkedin && <span><FaLinkedin /> {data.linkedin}</span>}
          {data.website && <span><FaGlobe /> {data.website}</span>}
        </div>
      </div>

      <div className="minimal-divider" />

      {/* Summary - Cấu trúc lại để thẳng hàng */}
      {data.summary && (
        <>
          <div className="minimal-section">
            <div className="minimal-label">Profile</div>
            <div className="minimal-content">
              <div className="minimal-summary">{data.summary}</div>
            </div>
          </div>
          <div className="minimal-divider" />
        </>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <>
          <div className="minimal-section">
            <div className="minimal-label">Experience</div>
            <div className="minimal-content">
              {data.experience.map((exp, i) => (
                <div key={i} className="minimal-entry">
                  <div className="minimal-date">{exp.startDate} — {exp.endDate || 'Present'}</div>
                  <div className="minimal-details">
                    <div className="minimal-entry-title">{exp.position}</div>
                    <div className="minimal-entry-subtitle">{exp.company}</div>
                    {exp.description && <div className="minimal-entry-description">{exp.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="minimal-divider" />
        </>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <>
          <div className="minimal-section">
            <div className="minimal-label">Education</div>
            <div className="minimal-content">
              {data.education.map((edu, i) => (
                <div key={i} className="minimal-entry">
                  <div className="minimal-date">{edu.startDate} — {edu.endDate || 'Present'}</div>
                  <div className="minimal-details">
                    <div className="minimal-entry-title">{edu.degree} in {edu.field}</div>
                    <div className="minimal-entry-subtitle">{edu.school}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="minimal-divider" />
        </>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <>
          <div className="minimal-section">
            <div className="minimal-label">Skills</div>
            <div className="minimal-content">
              <div className="minimal-skills-list">
                {data.skills.map((skill, i) => (
                  <span key={i} className="minimal-skill-tag">{skill.name}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="minimal-divider" />
        </>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className="minimal-section">
          <div className="minimal-label">Languages</div>
          <div className="minimal-content">
            <div className="minimal-languages-list">
              {data.languages.map((lang, i) => (
                <span key={i} className="minimal-language-item">
                  <span className="minimal-language-name">{lang.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
