import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabaseConfigured } from '../lib/supabase';

export default function LoginPage() {
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password);
        setSuccess('Check your email to confirm your account.');
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100svh', background: '#0f0a08',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #3d2215, #2c1810)',
            border: '1px solid #8b5e3c',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26,
          }}>
            ☕
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, fontWeight: 700, color: '#f5e6d3', margin: '0 0 6px',
          }}>
            Elevated Espresso
          </h1>
          <p style={{ fontSize: 13, color: '#5a3a25', margin: 0 }}>
            Your daily habit elevation journey
          </p>
        </div>

        {!supabaseConfigured && (
          <div style={{
            background: '#2c1810', border: '1px solid #8b5e3c',
            borderRadius: 12, padding: '12px 16px', marginBottom: 24,
            fontSize: 12, color: '#c4956a', textAlign: 'center',
          }}>
            Supabase not configured — add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable auth.
          </div>
        )}

        {/* Card */}
        <div style={{
          background: 'linear-gradient(145deg, #1e1008, #2c1810)',
          border: '1px solid #3d2215',
          borderRadius: 20, padding: '32px 28px',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', background: '#1a0f0a', borderRadius: 10,
            padding: 4, marginBottom: 28,
          }}>
            {[['signin', 'Sign In'], ['signup', 'Create Account']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                style={{
                  flex: 1, padding: '8px 0', borderRadius: 8, border: 'none',
                  background: mode === m ? '#3d2215' : 'transparent',
                  color: mode === m ? '#f5e6d3' : '#5a3a25',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Email" type="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            <Field label="Password" type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••"
              hint={mode === 'signup' ? 'Minimum 6 characters' : ''} />

            {error && (
              <div style={{ fontSize: 12, color: '#ff6b6b', background: '#2a1010',
                borderRadius: 8, padding: '8px 12px', border: '1px solid #6b2222' }}>
                {error}
              </div>
            )}
            {success && (
              <div style={{ fontSize: 12, color: '#6aaa6a', background: '#0f2a0f',
                borderRadius: 8, padding: '8px 12px', border: '1px solid #2a6b2a' }}>
                {success}
              </div>
            )}

            <button type="submit" disabled={loading || !supabaseConfigured}
              style={{
                background: 'linear-gradient(135deg, #8b5e3c, #c4956a)',
                border: 'none', borderRadius: 12, padding: '14px 0',
                color: '#f5e6d3', fontSize: 15, fontWeight: 700,
                cursor: loading || !supabaseConfigured ? 'not-allowed' : 'pointer',
                opacity: loading || !supabaseConfigured ? 0.6 : 1,
                transition: 'opacity 0.2s',
                marginTop: 4,
              }}>
              {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, hint }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, color: '#a07850',
        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        required autoComplete={type === 'password' ? 'current-password' : 'email'}
        style={{
          width: '100%', background: '#1a0f0a', border: '1px solid #3d2215',
          borderRadius: 10, padding: '11px 14px', color: '#f5e6d3',
          fontSize: 14, outline: 'none', boxSizing: 'border-box',
          fontFamily: 'Inter, sans-serif',
        }}
        onFocus={e => e.target.style.borderColor = '#8b5e3c'}
        onBlur={e => e.target.style.borderColor = '#3d2215'}
      />
      {hint && <p style={{ fontSize: 11, color: '#5a3a25', margin: '4px 0 0' }}>{hint}</p>}
    </div>
  );
}
