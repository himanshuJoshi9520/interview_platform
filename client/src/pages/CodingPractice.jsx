import React, { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import {
  BsCodeSlash, BsPlayFill, BsCheckCircleFill, BsXCircleFill,
  BsClockFill, BsChevronRight, BsTerminal, BsListUl,
  BsArrowRepeat, BsLightningChargeFill
} from 'react-icons/bs';
import { ServerUrl } from '../App';

const COMPANIES = [
  { id: 'google', name: 'Google' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'microsoft', name: 'Microsoft' },
  { id: 'meta', name: 'Meta' },
  { id: 'netflix', name: 'Netflix' },
  { id: 'apple', name: 'Apple' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'uber', name: 'Uber' },
  { id: 'twitter', name: 'Twitter/X' },
  { id: 'adobe', name: 'Adobe' },
  { id: 'flipkart', name: 'Flipkart' },
  { id: 'other', name: 'Other' },
];

const LANG_META = {
  javascript: { name: 'JavaScript', monaco: 'javascript' },
  python:     { name: 'Python',     monaco: 'python'     },
  java:       { name: 'Java',       monaco: 'java'       },
  cpp:        { name: 'C++',        monaco: 'cpp'        },
};

const TIMER_SECONDS = 30 * 60;

function pad(n) { return String(n).padStart(2, '0'); }

function DiffBadge({ diff }) {
  const map = {
    Easy:   'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Medium: 'bg-yellow-500/20  text-yellow-400  border-yellow-500/30',
    Hard:   'bg-red-500/20     text-red-400     border-red-500/30',
  };
  return (
    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${map[diff] || map.Easy}`}>
      {diff}
    </span>
  );
}

export default function CodingPractice() {
  const [selectedCompany, setSelectedCompany] = useState('google');
  const [questions, setQuestions]             = useState([]);
  const [loadingQ, setLoadingQ]               = useState(true);
  const [selectedIdx, setSelectedIdx]         = useState(0);
  const [selectedLang, setSelectedLang]       = useState('javascript');
  const [code, setCode]                       = useState('');

  // Map of "questionId:lang" -> user's unsubmitted code (so switching questions doesn't clear it)
  const userCodeMap = useRef({});

  // ── localStorage helpers – persist code across refreshes ──
  const lsKey   = (qId, lang) => `cp_${qId}:${lang}`;
  const loadCode = (q, lang)  => userCodeMap.current[lsKey(q._id, lang)] ?? localStorage.getItem(lsKey(q._id, lang)) ?? (q.snippets?.[lang] || '');
  const saveCode = (qId, lang, val) => localStorage.setItem(lsKey(qId, lang), val);
  const [activeTab, setActiveTab]             = useState('problem'); // 'problem' | 'results'
  const [isRunning, setIsRunning]             = useState(false);
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [results, setResults]                 = useState(null);  // { type:'run'|'submit', list, passedCount, total }
  const [rawOutput, setRawOutput]             = useState('');
  const [seconds, setSeconds]                 = useState(TIMER_SECONDS);
  const [timerActive, setTimerActive]         = useState(false);
  const timerRef = useRef(null);
  const editorRef = useRef(null);

  // ── Timer ──────────────────────────────────────────────
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setSeconds(s => { if (s <= 1) { clearInterval(timerRef.current); return 0; } return s - 1; });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  const timerColor = seconds < 300 ? 'text-red-400' : seconds < 600 ? 'text-yellow-400' : 'text-emerald-400';

  // ── Fetch questions ────────────────────────────────────
  useEffect(() => {
    setLoadingQ(true);
    axios.get(`${ServerUrl}/api/questions?company=${selectedCompany}`, { withCredentials: true })
      .then(res => {
        const qs = res.data.questions || [];
        setQuestions(qs);
        setSelectedIdx(0);
        if (qs[0]) setCode(loadCode(qs[0], selectedLang));
        setResults(null);
        setRawOutput('');
      })
      .catch(() => setQuestions([]))
      .finally(() => setLoadingQ(false));
  }, [selectedCompany]);

  const currentQ = questions[selectedIdx];

  const handleSelectQ = useCallback((idx) => {
    const q = questions[idx];
    if (!q) return;
    setSelectedIdx(idx);
    setCode(loadCode(q, selectedLang));
    setResults(null);
    setRawOutput('');
    setActiveTab('problem');
  }, [questions, selectedLang]);

  const handleLangChange = useCallback((lang) => {
    setSelectedLang(lang);
    if (!currentQ) return;
    setCode(loadCode(currentQ, lang));
    setResults(null);
    setRawOutput('');
  }, [currentQ]);

  const handleResetCode = useCallback(() => {
    if (!currentQ) return;
    if (window.confirm("Are you sure you want to reset the code to the default snippet? All your changes will be lost.")) {
      const defaultCode = currentQ.snippets?.[selectedLang] || '';
      setCode(defaultCode);
      delete userCodeMap.current[lsKey(currentQ._id, selectedLang)];
      localStorage.removeItem(lsKey(currentQ._id, selectedLang));
    }
  }, [currentQ, selectedLang]);

  // ── Run / Submit ───────────────────────────────────────
  const runCode = async (runType) => {
    if (isRunning || isSubmitting || !currentQ) return;
    
    if (runType === 'submit') {
      setIsSubmitting(true);
      // Only save permanently to localStorage when the user Submits
      saveCode(currentQ._id, selectedLang, code);
    } else {
      setIsRunning(true);
    }
    setResults(null);
    setRawOutput(runType === 'submit' ? 'Running all test cases…' : 'Running sample cases…');
    setActiveTab('results');

    try {
      const res = await axios.post(`${ServerUrl}/api/questions/run`, {
        questionId: currentQ._id,
        language: selectedLang,
        code,
        runType,
        filename: `main.${selectedLang === 'javascript' ? 'js' : selectedLang === 'python' ? 'py' : selectedLang === 'java' ? 'java' : 'cpp'}`,
      });

      const { output, error } = res.data;
      if (error) {
        setRawOutput(output);
        setResults(null);
        return;
      }

      try {
        const lastLine = output.trim().split('\n').pop();
        const parsed   = JSON.parse(lastLine);
        if (parsed.isTestResult) {
          const list        = parsed.results;
          const passedCount = list.filter(r => r.passed).length;
          setResults({ type: runType, list, passedCount, total: list.length });
          setRawOutput('');
          return;
        }
      } catch {}
      setRawOutput(output || 'No output.');
    } catch (err) {
      setRawOutput(`Error: ${err.message}`);
    } finally {
      setIsRunning(false);
      setIsSubmitting(false);
    }
  };

  const monacoOptions = {
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    minimap: { enabled: false },
    scrollBeyondLastLine: true,
    lineNumbers: 'on',
    renderLineHighlight: 'all',
    tabSize: 2,
    wordWrap: 'on',
    automaticLayout: true,
    padding: { top: 16, bottom: 16 },
    scrollbar: {
      vertical: 'visible',
      horizontal: 'auto',
      verticalScrollbarSize: 12,
      horizontalScrollbarSize: 12,
    },
  };

  // ── UI ─────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0b0f1a', color: '#e2e8f0', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet" />

      <Navbar />

      {/* ── Company bar ── */}
      <div style={{ background: '#111827', borderBottom: '1px solid #1e293b', padding: '10px 24px', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        {COMPANIES.map(c => (
          <button key={c.id} onClick={() => setSelectedCompany(c.id)} style={{
            padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
            border: selectedCompany === c.id ? '1px solid #10b981' : '1px solid #1e293b',
            background: selectedCompany === c.id ? 'rgba(16,185,129,.15)' : 'transparent',
            color: selectedCompany === c.id ? '#34d399' : '#64748b',
          }}>
            {c.name}
          </button>
        ))}
      </div>

      {/* ── Main 3-column layout ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 120px)' }}>

        {/* ── LEFT: Problem list sidebar ── */}
        <div style={{ width: 240, minWidth: 240, background: '#0f172a', borderRight: '1px solid #1e293b', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BsListUl style={{ color: '#10b981' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Problems</span>
            <span style={{ marginLeft: 'auto', background: '#1e293b', color: '#64748b', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 12 }}>
              {questions.length}
            </span>
          </div>
          {loadingQ ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ margin: '8px 12px', height: 44, borderRadius: 10, background: '#1e293b', opacity: 0.4 + i * 0.1 }} />
            ))
          ) : questions.map((q, idx) => {
            const dotColor = q.difficulty === 'Easy' ? '#22c55e' : q.difficulty === 'Medium' ? '#eab308' : '#ef4444';
            const active   = idx === selectedIdx;
            return (
              <button key={idx} onClick={() => handleSelectQ(idx)} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', textAlign: 'left', cursor: 'pointer',
                background: active ? 'rgba(16,185,129,.1)' : 'transparent',
                borderLeft: active ? '3px solid #10b981' : '3px solid transparent',
                border: 'none', color: active ? '#e2e8f0' : '#64748b', fontSize: 13, fontWeight: active ? 600 : 400,
                transition: 'all .15s', width: '100%',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{q.title}</span>
                {active && <BsChevronRight size={11} style={{ color: '#10b981', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>

        {/* ── MIDDLE: Problem description ── */}
        <div style={{ width: 380, minWidth: 300, background: '#0f172a', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {currentQ ? (
            <div style={{ padding: 24 }}>
              <DiffBadge diff={currentQ.difficulty} />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', margin: '12px 0 16px' }}>{currentQ.title}</h2>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{currentQ.description}</p>

              {/* Visible test cases */}
              {currentQ.testCases?.some(tc => !tc.isHidden) && (
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Examples</p>
                  {currentQ.testCases.filter(tc => !tc.isHidden).map((tc, i) => (
                    <div key={i} style={{ background: '#1e293b', borderRadius: 10, padding: 14, marginBottom: 12, border: '1px solid #334155' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#64748b', marginBottom: 8 }}>Test Case {i + 1}</p>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#94a3b8' }}>
                        <div style={{ marginBottom: 6 }}>
                          <span style={{ color: '#64748b', fontWeight: 700 }}>Input: </span>
                          <span style={{ color: '#e2e8f0' }}>{tc.input}</span>
                        </div>
                        <div>
                          <span style={{ color: '#64748b', fontWeight: 700 }}>Output: </span>
                          <span style={{ color: '#34d399' }}>{tc.expectedOutput}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155' }}>
              {loadingQ ? 'Loading…' : 'No question selected'}
            </div>
          )}
        </div>

        {/* ── RIGHT: Editor + Output ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0b0f1a' }}>

          {/* Editor toolbar */}
          <div style={{ background: '#111827', borderBottom: '1px solid #1e293b', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Language tabs */}
            {Object.entries(LANG_META).map(([key, meta]) => (
              <button key={key} onClick={() => handleLangChange(key)} style={{
                padding: '4px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .15s',
                border: selectedLang === key ? '1px solid #10b981' : '1px solid transparent',
                background: selectedLang === key ? 'rgba(16,185,129,.15)' : 'transparent',
                color: selectedLang === key ? '#34d399' : '#475569',
              }}>
                {meta.name}
              </button>
            ))}

            <div style={{ flex: 1 }} />

            {/* Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BsClockFill size={12} style={{ color: timerColor }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 700, color: timerColor }}>
                {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
              </span>
              <button onClick={() => setTimerActive(a => !a)} style={{
                padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                background: timerActive ? 'rgba(239,68,68,.2)' : 'rgba(16,185,129,.2)',
                color: timerActive ? '#f87171' : '#34d399', border: 'none',
              }}>
                {timerActive ? 'Pause' : 'Start'}
              </button>
              <button onClick={() => { setSeconds(TIMER_SECONDS); setTimerActive(false); }} style={{
                padding: '3px 8px', borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                background: 'rgba(100,116,139,.2)', color: '#64748b', border: 'none',
              }}>
                <BsArrowRepeat />
              </button>
            </div>

            {/* Reset Code */}
            <button onClick={handleResetCode} style={{
              padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: 'transparent', color: '#94a3b8', border: '1px solid transparent',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all .15s', marginRight: 4
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(148,163,184,.1)' }}
            onMouseOut={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent' }}
            title="Reset to default code"
            >
              <BsArrowRepeat /> Reset
            </button>

            {/* Run / Submit */}
            <button onClick={() => runCode('run')} disabled={isRunning || isSubmitting} style={{
              padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: isRunning ? 'rgba(71,85,105,.4)' : '#1e293b', color: isRunning ? '#475569' : '#cbd5e1',
              border: '1px solid #334155', display: 'flex', alignItems: 'center', gap: 6, transition: 'all .15s',
            }}>
              {isRunning
                ? <span style={{ width: 14, height: 14, border: '2px solid #475569', borderTopColor: '#94a3b8', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                : <BsPlayFill />}
              {isRunning ? 'Running…' : 'Run'}
            </button>

            <button onClick={() => runCode('submit')} disabled={isRunning || isSubmitting} style={{
              padding: '6px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer',
              background: isSubmitting ? 'rgba(5,150,105,.2)' : 'rgba(16,185,129,.2)',
              color: isSubmitting ? '#065f46' : '#34d399', border: '1px solid rgba(16,185,129,.35)',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all .15s',
            }}>
              {isSubmitting
                ? <span style={{ width: 14, height: 14, border: '2px solid #065f46', borderTopColor: '#34d399', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                : <BsLightningChargeFill />}
              {isSubmitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>

          {/* Monaco Editor */}
          <div style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
            <Editor
              height="100%"
              language={LANG_META[selectedLang].monaco}
              value={code}
              onChange={val => {
                const newCode = val || '';
                setCode(newCode);
                // Save to memory so switching questions doesn't lose edits
                if (currentQ) userCodeMap.current[lsKey(currentQ._id, selectedLang)] = newCode;
              }}
              theme="vs-dark"
              options={monacoOptions}
              onMount={editor => { editorRef.current = editor; }}
            />
          </div>

          {/* Bottom panel: tabs */}
          <div style={{ height: 240, background: '#0a0f1c', borderTop: '1px solid #1e293b', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #1e293b' }}>
              {['problem', 'results'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '8px 20px', fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .15s',
                  background: 'transparent', border: 'none', textTransform: 'capitalize',
                  color: activeTab === tab ? '#34d399' : '#475569',
                  borderBottom: activeTab === tab ? '2px solid #10b981' : '2px solid transparent',
                }}>
                  {tab === 'results' ? <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BsTerminal size={12} /> Console / Results</span> : null}
                  {tab === 'problem' ? 'Test Cases' : null}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
              {activeTab === 'problem' && (
                <div>
                  {currentQ?.testCases?.filter(tc => !tc.isHidden).length > 0
                    ? currentQ.testCases.filter(tc => !tc.isHidden).map((tc, i) => (
                      <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>
                        <span style={{ color: '#475569', fontWeight: 700 }}>Case {i + 1}: </span>
                        <span>Input: {tc.input}  →  Expected: {tc.expectedOutput}</span>
                      </div>
                    ))
                    : <span style={{ color: '#334155', fontSize: 13 }}>No visible test cases.</span>
                  }
                </div>
              )}

              {activeTab === 'results' && (
                <div>
                  {/* Raw output (errors / simple output) */}
                  {rawOutput && !results && (
                    <pre style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, whiteSpace: 'pre-wrap',
                      color: rawOutput.toLowerCase().includes('error') ? '#f87171' : '#94a3b8' }}>
                      {rawOutput}
                    </pre>
                  )}

                  {/* Structured test results */}
                  {results && (
                    <div>
                      {/* Summary bar */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700,
                            color: results.passedCount === results.total ? '#34d399' : '#f87171' }}>
                            {results.passedCount === results.total
                              ? '✅ All Passed!'
                              : `❌ ${results.passedCount} / ${results.total} Passed`}
                          </span>
                          <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>
                            {results.type === 'submit' ? 'Full Submit' : 'Sample Run'}
                          </span>
                        </div>
                        {/* Progress bar */}
                        <div style={{ height: 6, borderRadius: 4, background: '#1e293b', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: 4, transition: 'width .5s ease',
                            width: `${(results.passedCount / results.total) * 100}%`,
                            background: results.passedCount === results.total
                              ? 'linear-gradient(90deg,#10b981,#34d399)'
                              : 'linear-gradient(90deg,#ef4444,#f87171)',
                          }} />
                        </div>
                      </div>

                      {/* Per-test rows */}
                      {results.list.map((r, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 10px',
                          marginBottom: 6, borderRadius: 8, fontSize: 12,
                          background: r.passed ? 'rgba(16,185,129,.08)' : 'rgba(239,68,68,.08)',
                          border: `1px solid ${r.passed ? 'rgba(16,185,129,.2)' : 'rgba(239,68,68,.2)'}`,
                        }}>
                          {r.passed
                            ? <BsCheckCircleFill style={{ color: '#34d399', flexShrink: 0, marginTop: 1 }} />
                            : <BsXCircleFill    style={{ color: '#f87171', flexShrink: 0, marginTop: 1 }} />}
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', flex: 1 }}>
                            <span style={{ fontWeight: 700, color: r.passed ? '#34d399' : '#f87171' }}>
                              Case {r.index + 1}{r.isHidden ? ' (Hidden)' : ''}
                            </span>
                            {!r.passed && !r.isHidden && (
                              <div style={{ color: '#64748b', marginTop: 4 }}>
                                {r.error
                                  ? <span style={{ color: '#f87171' }}>Error: {r.error}</span>
                                  : <>
                                      <div><span style={{ color: '#475569' }}>Input:    </span>{r.input}</div>
                                      <div><span style={{ color: '#475569' }}>Expected: </span><span style={{ color: '#34d399' }}>{r.expected}</span></div>
                                      <div><span style={{ color: '#475569' }}>Actual:   </span><span style={{ color: '#f87171' }}>{r.actual}</span></div>
                                    </>
                                }
                              </div>
                            )}
                            {!r.passed && r.isHidden && (
                              <span style={{ color: '#475569', marginLeft: 8 }}>Hidden test case failed.</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!rawOutput && !results && (
                    <span style={{ color: '#334155', fontSize: 13 }}>// Run or Submit to see results here…</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0b0f1a; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #334155; }
      `}</style>
      <Footer />
    </div>
  );
}
