export default function BottomNav({ currentPage, onChange }) {
  const tabs = [
    { id: 'home',    icon: '☕', label: 'Home'    },
    { id: 'journal', icon: '📓', label: 'Journal' },
    { id: 'journey', icon: '🗺️', label: 'Journey' },
  ];

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#0f0a08cc',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid #2c1810',
      display: 'flex',
      zIndex: 200,
    }}>
      {tabs.map(tab => {
        const active = currentPage === tab.id;
        return (
          <button key={tab.id} onClick={() => onChange(tab.id)}
            style={{
              flex: 1, padding: '10px 0 14px',
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 4,
            }}>
            <span style={{
              fontSize: 20,
              filter: active ? 'none' : 'grayscale(1) opacity(0.4)',
              transition: 'filter 0.2s',
            }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: 10, fontWeight: 600,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: active ? '#c4956a' : '#3d2215',
              transition: 'color 0.2s',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
