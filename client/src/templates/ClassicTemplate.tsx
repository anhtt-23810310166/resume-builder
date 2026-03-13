import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: TemplateProps) {
  return (
    <div className="cv-template classic-template">
      {/* Header */}
      <div className="cv-header">
        <div className="cv-name">{data.fullName || 'Your Name'}</div>
        {data.jobTitle && <div className="cv-title">{data.jobTitle}</div>}
        <div className="cv-contact">
          {data.email && <span><FaEnvelope /> {data.email}</span>}
          {data.phone && <span><FaPhone /> {data.phone}</span>}
          {data.address && <span><FaMapMarkerAlt /> {data.address}</span>}
          {data.linkedin && <span><FaLinkedin /> {data.linkedin}</span>}
          {data.website && <span><FaGlobe /> {data.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="cv-section">
          <div className="cv-section-title">Professional Summary</div>
          <div className="cv-summary">{data.summary}</div>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="cv-section">
          <div className="cv-section-title">Work Experience</div>
          {data.experience.map((exp, i) => (
            <div key={i} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <span className="cv-entry-title">{exp.position || 'Position'}</span>
                  {exp.company && <span className="cv-entry-subtitle"> — {exp.company}</span>}
                </div>
                <span className="cv-entry-date">
                  {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                </span>
              </div>
              {exp.description && (
                <div className="cv-entry-description">{exp.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="cv-section">
          <div className="cv-section-title">Education</div>
          {data.education.map((edu, i) => (
            <div key={i} className="cv-entry">
              <div className="cv-entry-header">
                <div>
                  <span className="cv-entry-title">{edu.degree || 'Degree'}</span>
                  {edu.field && <span className="cv-entry-subtitle"> in {edu.field}</span>}
                  {edu.school && <span className="cv-entry-subtitle"> — {edu.school}</span>}
                </div>
                <span className="cv-entry-date">
                  {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div className="cv-section">
          <div className="cv-section-title">Projects</div>
          {data.projects.map((proj, i) => (
            <div key={i} className="cv-entry">
              <div className="cv-entry-header">
                <span className="cv-entry-title">{proj.name || 'Project'}</span>
                {proj.link && <span className="cv-entry-date">{proj.link}</span>}
              </div>
              {proj.techStack && (
                <div className="cv-entry-subtitle" style={{ marginBottom: '4px' }}>
                  Tech: {proj.techStack}
                </div>
              )}
              {proj.description && (
                <div className="cv-entry-description">{proj.description}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <div className="cv-section">
          <div className="cv-section-title">Skills</div>
          <div className="cv-skills-list">
            {data.skills.map((skill, i) => (
              <span key={i} className="cv-skill-tag">
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages?.length > 0 && (
        <div className="cv-section">
          <div className="cv-section-title">Languages</div>
          <div className="cv-languages-list">
            {data.languages.map((lang, i) => (
              <span key={i} className="cv-language-item">
                <span className="lang-name">{lang.name}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
