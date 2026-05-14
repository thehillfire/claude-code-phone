import { useAuth } from '../contexts/AuthContext';
import { supabaseConfigured } from '../lib/supabase';

export default function Header({ currentTier }) {
  const { user, signOut } = useAuth();

  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 20px",
      borderBottom: "1px solid #2c1810",
      background: "#0f0a08e0",
      backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: "linear-gradient(135deg, #3d2215, #2c1810)",
          border: "1px solid #8b5e3c",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>
          ☕
        </div>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15, fontWeight: 700, color: "#f5e6d3",
            letterSpacing: "0.02em", lineHeight: 1,
          }}>
            Elevated Espresso
          </div>
          <div style={{ fontSize: 9, color: "#5a3a25", letterSpacing: "0.1em" }}>
            HABIT ELEVATION SYSTEM
          </div>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Tier badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 7,
          background: "#2c1810", border: "1px solid #3d2215",
          borderRadius: 100, padding: "5px 12px",
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: currentTier.color,
            boxShadow: `0 0 6px ${currentTier.color}80`,
          }} />
          <span style={{ fontSize: 11, color: "#f5e6d3", fontWeight: 500 }}>
            {currentTier.name}
          </span>
        </div>

        {/* User / sign out */}
        {supabaseConfigured && user && (
          <button onClick={signOut}
            title={`Signed in as ${user.email}`}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "#2c1810", border: "1px solid #3d2215",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: 14, color: "#a07850",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#8b5e3c'; e.currentTarget.style.color = '#f5e6d3'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#3d2215'; e.currentTarget.style.color = '#a07850'; }}
          >
            ↪
          </button>
        )}
      </div>
    </header>
  );
}
