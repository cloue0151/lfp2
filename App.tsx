import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Home,
  LogOut,
  Menu,
  Music2,
  Play,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';

type Page = 'dashboard' | 'progress' | 'lessons' | 'quizzes';

const navItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'progress', label: 'Progress Tracker', icon: BarChart3 },
  { id: 'lessons', label: 'Guitar Lessons', icon: BookOpen },
  { id: 'quizzes', label: 'Guitar Quizzes', icon: Trophy },
];

const lessonCards = [
  { title: 'Guitar Basics', subtitle: 'Learn the essential foundations', progress: '12 lessons', tone: 'mint' },
  { title: 'Chords & Strumming', subtitle: 'Build your rhythm and flow', progress: '8 lessons', tone: 'sage' },
  { title: 'Scales & Lead', subtitle: 'Find your voice on the fretboard', progress: '10 lessons', tone: 'olive' },
];

const quizCards = [
  { title: 'Guitar Anatomy', subtitle: 'Can you name every part?', level: 'Beginner', tone: 'mint' },
  { title: 'Chord Challenge', subtitle: 'Test your chord knowledge', level: 'Intermediate', tone: 'sage' },
  { title: 'Fretboard Mastery', subtitle: 'Put your notes to the test', level: 'Advanced', tone: 'olive' },
];

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <div className="brand-mark">LFP</div>
      <div className="brand-name">LUMEN FRET PATH</div>
    </div>
  );
}

function NoteDecor({ className = '' }: { className?: string }) {
  return <Music2 className={`note-decor ${className}`} strokeWidth={1.8} />;
}

function Calendar({ compact = false }: { compact?: boolean }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const numbers = ['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '01'];
  return (
    <div className={`calendar ${compact ? 'calendar-compact' : ''}`}>
      <div className="browser-bar"><span /><span /><span /><i /></div>
      <div className="calendar-top"><strong>Month Year</strong><div className="calendar-arrows"><ChevronLeft /><span /><ChevronRight /></div></div>
      <div className="weekdays">{days.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid">{numbers.map((number, index) => <button key={`${number}-${index}`} className={index === 17 ? 'selected' : ''}>{number}</button>)}</div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<Page | 'login'>('login');
  const [loginMode, setLoginMode] = useState<'login' | 'signup'>('login');
  const [mobileOpen, setMobileOpen] = useState(false);

  if (page === 'login') {
    return <Login mode={loginMode} onModeChange={setLoginMode} onEnter={() => setPage('dashboard')} />;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-top"><Brand compact /><button className="close-nav" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button></div>
        <nav>
          {navItems.map(({ id, label, icon: Icon }) => <button className={page === id ? 'active' : ''} key={id} onClick={() => { setPage(id); setMobileOpen(false); }}><Icon /><span>{label}</span></button>)}
        </nav>
        <button className="logout" onClick={() => setPage('login')}><LogOut /><span>Log out</span></button>
      </aside>
      <main className="main-content">
        <button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
        <NoteDecor className="decor-one" /><NoteDecor className="decor-two" /><NoteDecor className="decor-three" />
        {page === 'dashboard' && <Dashboard onNavigate={setPage} />}
        {page === 'progress' && <Progress />}
        {page === 'lessons' && <Collection type="lessons" onNavigate={setPage} />}
        {page === 'quizzes' && <Collection type="quizzes" onNavigate={setPage} />}
      </main>
    </div>
  );
}

function Login({ mode, onModeChange, onEnter }: { mode: 'login' | 'signup'; onModeChange: (mode: 'login' | 'signup') => void; onEnter: () => void }) {
  return (
    <div className="login-page">
      <NoteDecor className="login-note note-a" /><NoteDecor className="login-note note-b" /><NoteDecor className="login-note note-c" />
      <div className="login-brand"><div className="hero-mark">LFP</div><div className="hero-name">LUMEN FRET PATH</div></div>
      <form className="login-card" onSubmit={(event) => { event.preventDefault(); onEnter(); }}>
        <h1>{mode === 'login' ? 'Login' : 'Create account'}</h1>
        <label>Username/Email<input type="email" required /></label>
        <label>Password<input type="password" required /></label>
        {mode === 'login' && <button type="button" className="forgot">Forgot your password?</button>}
        <button className="pill-button" type="submit">{mode === 'login' ? 'Login' : 'Sign up'}</button>
        <button type="button" className="pill-button secondary" onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Sign up' : 'Back to login'}</button>
      </form>
    </div>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) { return <h1 className="page-title">{children}</h1>; }

function Dashboard({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <div className="page dashboard-page">
    <PageTitle>Dashboard</PageTitle>
    <div className="dashboard-grid">
      <section className="welcome-card"><p className="eyebrow">YOUR MUSICAL JOURNEY</p><h2>Hi, Sasha!</h2><p>Welcome to Lumen Fret Path!</p><button onClick={() => onNavigate('lessons')} className="text-link">Continue learning <ChevronRight /></button></section>
      <Calendar compact />
    </div>
    <div className="quick-grid">
      <button className="quick-card" onClick={() => onNavigate('lessons')}><BookOpen /><span>Lessons</span><small>Keep growing</small></button>
      <button className="quick-card" onClick={() => onNavigate('progress')}><BarChart3 /><span>Progress</span><small>67% complete</small></button>
      <button className="quick-card" onClick={() => onNavigate('quizzes')}><Trophy /><span>Quizzes</span><small>Test your skills</small></button>
      <button className="quick-card practice-card" onClick={() => onNavigate('progress')}><CalendarDays /><span>Practice</span><small>Plan your week</small></button>
    </div>
  </div>;
}

function Progress() {
  return <div className="page progress-page"><div className="progress-head"><PageTitle>Progress Tracker</PageTitle><div className="profile-chip"><CircleUserRound /> Sasha</div></div><div className="progress-layout"><section className="progress-ring-card"><div className="progress-ring"><div><strong>67%</strong><span>path completed</span></div></div><h2>You're in tune.</h2><p>Keep going, your practice is paying off.</p></section><section className="schedule"><h2>Practice Schedules</h2><Calendar /><button className="customize">Customize schedule <ChevronRight /></button></section></div></div>;
}

function GuitarIllustration() {
  return <div className="guitar-art" aria-hidden="true"><div className="guitar-head"><i /><i /><i /><i /><i /><i /></div><div className="guitar-neck">{Array.from({ length: 9 }).map((_, i) => <span key={i} />)}</div><div className="guitar-body"><div className="sound-hole" /><div className="bridge" /></div></div>;
}

function Collection({ type, onNavigate }: { type: 'lessons' | 'quizzes'; onNavigate: (page: Page) => void }) {
  const isLessons = type === 'lessons';
  const cards = isLessons ? lessonCards : quizCards;
  return <div className="page collection-page"><div className="collection-title"><span>{isLessons ? 'Guitar' : 'Guitar'}</span> {isLessons ? 'Lessons' : 'Quizzes'}</div><GuitarIllustration /><div className="collection-grid">{cards.map((card, index) => <button className={`collection-card ${card.tone}`} key={card.title} onClick={() => onNavigate('progress')}><div className="card-number">0{index + 1}</div><div className="collection-card-content"><div><h2>{card.title}</h2><p>{card.subtitle}</p></div><div className="collection-card-bottom"><small>{isLessons ? card.progress : card.level}</small><span>{isLessons ? <Play /> : <Sparkles />}</span></div></div></button>)}</div></div>;
}

export default App;
