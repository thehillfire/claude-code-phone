import { useState, useEffect } from 'react';
import { supabase, supabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const MOODS = [
  { emoji: '😤', label: 'Struggling' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😊', label: 'Good' },
  { emoji: '🔥', label: 'On fire' },
];

export default function JournalPage({ currentTier, level, streak }) {
  const { user } = useAuth();
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [pastEntries, setPastEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadPastEntries();
    checkTodayEntry();
  }, [user]);

  async function loadPastEntries() {
    if (!supabaseConfigured || !user) return;
    setLoadingEntries(true);
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) setPastEntries(data);
    setLoadingEntries(false);
  }

  async function checkTodayEntry() {
    if (!supabaseConfigured || !user) return;
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('entry_date', today)
      .maybeSingle();
    if (data) {
      setAiResponse(data.ai_response || '');
      setSubmitted(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!entry.trim()) return;
    setLoading(true);
    setAiResponse('');

    try {
      // Get AI response from Vercel API route
      const res = await fetch('/api/journal-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          journalEntry: entry,
          currentTier: currentTier?.name,
          level,
          streak,
          mood: mood?.label,
        }),
      });

      let aiText = '';
      if (res.ok) {
        const data = await res.json();
        aiText = data.response;
      } else {
        aiText = "Keep going — every entry is a step forward. Your consistency is building something real. 🌱";
      }

      setAiResponse(aiText);

      // Save to Supabase
      if (supabaseConfigured && user) {
        const today = new Date().toISOString().slice(0, 10);
        await supabase.from('journal_entries').upsert({
          user_id: user.id,
          content: entry,
          ai_response: aiText,
          entry_date: today,
        }, { onConflict: 'user_id,entry_date' });
        loadPastEntries();
      }

      setSubmitted(true);
    } catch {
      setAiResponse("Every word you write here is an act of self-care. Keep showing up. ☕");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function resetForNewEntry() {
    setEntry('');
    setMood(null);
    setAiResponse('');
    setSubmitted(false);
  }

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header card */}
      <div style={{
        background: 'linear-gradient(145deg, #1e1008, #2c1810)',
        border: '1px solid #3d2215', borderRadius: 24, padding: '24px 22px',
      }}>
        <div style={{ fontSize: 11, color: '#5a3a25', letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: 6 }}>
          Daily Reflection
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22,
          fontWeight: 600, color: '#f5e6d3', margin: '0 0 4px' }}>
          Journal
        </h2>
        <p style={{ fontSize: 13, color: '#5a3a25', margin: 0 }}>{today}</p>
      </div>

      {/* Entry form or response */}
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Mood */}
          <div style={{
            background: '#1a0f0a', border: '1px solid #2c1810',
            borderRadius: 20, padding: '20px 18px',
          }}>
            <div style={{ fontSize: 11, color: '#a07850', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 14 }}>
              How are you feeling?
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              {MOODS.map(m => (
                <button key={m.label} type="button" onClick={() => setMood(m)}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 12, border: 'none',
                    background: mood?.label === m.label ? '#3d2215' : '#1a0f0a',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 4,
                    boxShadow: mood?.label === m.label ? '0 0 10px rgba(196,149,106,0.2)' : 'none',
                    transition: 'all 0.15s',
                  }}>
                  <span style={{ fontSize: 22 }}>{m.emoji}</span>
                  <span style={{ fontSize: 9, color: mood?.label === m.label ? '#c4956a' : '#5a3a25',
                    letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Text area */}
          <div style={{
            background: '#1a0f0a', border: '1px solid #2c1810',
            borderRadius: 20, padding: '20px 18px',
          }}>
            <div style={{ fontSize: 11, color: '#a07850', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: 12 }}>
              What's on your mind today?
            </div>
            <textarea
              value={entry}
              onChange={e => setEntry(e.target.value)}
              placeholder="Write freely — how did your habits go? What challenged you? What felt good?..."
              rows={6}
              style={{
                width: '100%', background: 'transparent', border: 'none',
                color: '#f5e6d3', fontSize: 14, lineHeight: 1.7,
                resize: 'none', outline: 'none', fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginTop: 12, borderTop: '1px solid #2c1810', paddingTop: 12 }}>
              <span style={{ fontSize: 11, color: '#3d2215' }}>
                {entry.length > 0 ? `${entry.length} chars` : 'Write anything — no judgment here'}
              </span>
              <button type="submit" disabled={loading || !entry.trim()}
                style={{
                  background: 'linear-gradient(135deg, #8b5e3c, #c4956a)',
                  border: 'none', borderRadius: 10, padding: '10px 20px',
                  color: '#f5e6d3', fontSize: 13, fontWeight: 700,
                  cursor: loading || !entry.trim() ? 'not-allowed' : 'pointer',
                  opacity: loading || !entry.trim() ? 0.5 : 1,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                {loading ? (
                  <>
                    <span style={{ display: 'inline-block', width: 12, height: 12,
                      border: '2px solid #f5e6d360', borderTopColor: '#f5e6d3',
                      borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    Thinking…
                  </>
                ) : '☕ Submit'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{
          background: 'linear-gradient(145deg, #1a1a0f, #2c2810)',
          border: '1px solid #4a3d15', borderRadius: 20, padding: '24px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 20 }}>✨</span>
            <div style={{ fontSize: 11, color: '#c4956a', letterSpacing: '0.1em',
              textTransform: 'uppercase', fontWeight: 700 }}>
              Your Companion Responds
            </div>
          </div>
          {mood && (
            <div style={{ fontSize: 13, color: '#5a3a25', marginBottom: 12 }}>
              Mood: {mood.emoji} {mood.label}
            </div>
          )}
          <p style={{ fontSize: 15, color: '#f5e6d3', lineHeight: 1.8,
            fontStyle: 'italic', margin: '0 0 20px', fontFamily: "'Playfair Display', serif" }}>
            "{aiResponse}"
          </p>
          <div style={{ fontSize: 12, color: '#5a3a25', borderTop: '1px solid #3d2215',
            paddingTop: 14 }}>
            Your entry has been saved.{' '}
            <button onClick={resetForNewEntry}
              style={{ background: 'none', border: 'none', color: '#8b5e3c',
                fontSize: 12, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
              Write another
            </button>
          </div>
        </div>
      )}

      {/* Past entries */}
      {pastEntries.length > 0 && (
        <div style={{
          background: '#1a0f0a', border: '1px solid #2c1810',
          borderRadius: 20, padding: '20px 18px',
        }}>
          <div style={{ fontSize: 11, color: '#a07850', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: 16 }}>
            Past Entries
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {pastEntries.map(e => (
              <div key={e.id} style={{
                borderBottom: '1px solid #2c1810', paddingBottom: 14,
              }}>
                <div style={{ fontSize: 11, color: '#5a3a25', marginBottom: 6 }}>
                  {new Date(e.created_at).toLocaleDateString('en-US', {
                    weekday: 'short', month: 'short', day: 'numeric'
                  })}
                </div>
                <p style={{ fontSize: 13, color: '#a07850', margin: '0 0 8px',
                  lineHeight: 1.6, WebkitLineClamp: 2, overflow: 'hidden',
                  display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                  {e.content}
                </p>
                {e.ai_response && (
                  <p style={{ fontSize: 12, color: '#5a3a25', margin: 0,
                    fontStyle: 'italic', lineHeight: 1.5 }}>
                    ✨ {e.ai_response.slice(0, 120)}{e.ai_response.length > 120 ? '…' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
