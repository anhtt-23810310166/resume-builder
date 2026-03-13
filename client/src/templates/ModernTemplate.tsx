import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  return (
    <div className="cv-template modern-template">
      {/* Sidebar */}
      <div className="modern-sidebar">
        <div className="modern-name">{data.fullName || 'Your Name'}</div>
        {data.jobTitle && <div className="modern-title">{data.jobTitle}</div>}

        {/* Contact */}
        <div className="modern-sidebar-section">
          <div className="modern-sidebar-title">Contact</div>
          {data.email && (
            <div className="modern-contact-item"><FaEnvelope /> {data.email}</div>
          )}
          {data.phone && (
            <div className="modern-contact-item"><FaPhone /> {data.phone}</div>
          )}
          {data.address && (
            <div className="modern-contact-item"><FaMapMarkerAlt /> {data.address}</div>
          )}
          {data.linkedin && (
            <div className="modern-contact-item"><FaLinkedin /> {data.linkedin}</div>
          )}
          {data.website && (
            <div className="modern-contact-item"><FaGlobe /> {data.website}</div>
          )}
        </div>

        {/* Skills - Updated to Tag List */}
        {data.skills?.length > 0 && (
          <div className="modern-sidebar-section">
            <div className="modern-sidebar-title">Skills</div>
            <div className="modern-skills-sidebar-list">
              {data.skills.map((skill, i) => (
                <div key={i} className="modern-sidebar-skill-tag">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages - Updated to Tag List */}
        {data.languages?.length > 0 && (
          <div className="modern-sidebar-section">
            <div className="modern-sidebar-title">Languages</div>
            <div className="modern-skills-sidebar-list">
              {data.languages.map((lang, i) => (
                <div key={i} className="modern-sidebar-skill-tag">
                  {lang.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="modern-main">
        {/* Summary */}
        {data.summary && (
          <div className="modern-section">
            <div className="modern-section-title">About Me</div>
            <div className="modern-summary">{data.summary}</div>
          </div>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Experience</div>
            {data.experience.map((exp, i) => (
              <div key={i} className="modern-entry">
                <div className="modern-entry-header">
                  <span className="modern-entry-title">{exp.position || 'Position'}</span>
                  <span className="modern-entry-date">
                    {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
                  </span>
                </div>
                {exp.company && (
                  <div className="modern-entry-subtitle">{exp.company}</div>
                )}
                {exp.description && (
                  <div className="modern-entry-description">{exp.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Education</div>
            {data.education.map((edu, i) => (
              <div key={i} className="modern-entry">
                <div className="modern-entry-header">
                  <span className="modern-entry-title">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </span>
                  <span className="modern-entry-date">
                    {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ''}
                  </span>
                </div>
                {edu.school && (
                  <div className="modern-entry-subtitle">{edu.school}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Projects</div>
            {data.projects.map((proj, i) => (
              <div key={i} className="modern-entry">
                <div className="modern-entry-header">
                  <span className="modern-entry-title">{proj.name || 'Project'}</span>
                  {proj.link && <span className="modern-entry-date">{proj.link}</span>}
                </div>
                {proj.description && (
                  <div className="modern-entry-description">{proj.description}</div>
                )}
                {proj.techStack && (
                  <div style={{ marginTop: '6px' }}>
                    {proj.techStack.split(',').map((tech, j) => (
                      <span key={j} className="modern-tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .modern-skills-sidebar-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .modern-sidebar-skill-tag {
          font-size: 8pt;
          background: rgba(255, 255, 255, 0.1);
          color: #ccd6f6;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
