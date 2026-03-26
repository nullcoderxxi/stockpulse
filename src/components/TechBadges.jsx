const techs = ['React.js', 'Python', 'Flask', 'Recharts', 'Framer Motion', 'Tailwind CSS', 'REST API', 'Chart.js'];

export default function TechBadges() {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      background: '#0a0e1a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '8px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      overflowX: 'auto',
      height: '44px',
      flexShrink: 0,
    }}>
      <span style={{
        color: '#4a5568',
        fontSize: '12px',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        Tech Stack:
      </span>
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {techs.map((tech) => (
          <span key={tech} style={{
            background: 'rgba(0,245,212,0.1)',
            color: '#00f5d4',
            border: '1px solid rgba(0,245,212,0.2)',
            borderRadius: '20px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
