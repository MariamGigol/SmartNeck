import React, { useState, useEffect } from "react";
import {
  Home,
  Info,
  BarChart3,
  UserRound,
  ShoppingBag,
  Bluetooth,
  RotateCcw,
  Gauge,
  Flame,
  AlertTriangle,
  Battery,
  Vibrate,
  Bell,
  Check,
  Cpu,
  Magnet,
  BatteryCharging,
  Quote,
  Clock,
  ShieldCheck,
  Sparkles,
  Feather,
  Package,
  Truck,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./index.css";

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */
const GOLD = "#D4AF37";
const GOLD_BRIGHT = "#F4C542";
const AMBER = "#C9814A";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */
function GlassCard({ children, className = "" }) {
  return <div className={`sn-card ${className}`}>{children}</div>;
}
function Eyebrow({ children }) {
  return <div className="sn-eyebrow">{children}</div>;
}
function Toggle({ checked, onChange }) {
  return (
    <button
      className={`sn-toggle ${checked ? "sn-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className="sn-toggle-knob" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Spine visual — layered SVG + CSS 3D, live posture representation   */
/* ------------------------------------------------------------------ */
function SpineVisual({ angle, good }) {
  const glow = good ? GOLD_BRIGHT : AMBER;
  return (
    <div className="sn-spine-stage">
      <div
        className="sn-spine-rotor"
        style={{ transform: `rotateY(-16deg) rotateX(6deg) rotateZ(${angle * 0.35}deg)` }}
      >
        <svg viewBox="0 0 220 320" width="230" height="330" className="sn-spine-svg">
          <defs>
            <radialGradient id="haloGrad" cx="50%" cy="34%" r="60%">
              <stop offset="0%" stopColor={glow} stopOpacity="0.5" />
              <stop offset="55%" stopColor={glow} stopOpacity="0.1" />
              <stop offset="100%" stopColor={glow} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="vertGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={glow} />
              <stop offset="100%" stopColor="#453f30" />
            </linearGradient>
          </defs>
          <circle cx="110" cy="86" r="118" fill="url(#haloGrad)" />
          <ellipse cx="110" cy="46" rx="30" ry="34" fill="none" stroke={glow} strokeWidth="1.4" opacity="0.85" />
          {Array.from({ length: 9 }).map((_, i) => {
            const y = 80 + i * 20;
            const shift = Math.sin(i * 0.5) * (angle * 0.85);
            return (
              <g key={i} transform={`translate(${shift},0)`}>
                <circle cx="110" cy={y} r={5 - i * 0.15} fill="url(#vertGrad)" opacity={0.95} />
                <line x1="110" y1={y} x2="110" y2={y + 20} stroke={glow} strokeWidth="0.6" opacity="0.32" />
              </g>
            );
          })}
          <line x1="42" y1="150" x2="178" y2="150" stroke={glow} strokeWidth="1.2" opacity="0.38" />
        </svg>
      </div>
      <div className="sn-spine-floor" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HOME                                                                */
/* ------------------------------------------------------------------ */
function HomePage() {
  const [angle, setAngle] = useState(6);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setAngle((a) => {
        const next = Math.max(-4, Math.min(38, a + (Math.random() - 0.55) * 6));
        return Math.round(next * 10) / 10;
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const score = Math.max(38, Math.round(100 - angle * 1.6));
  const good = angle < 18;
  const risk = angle < 12 ? "დაბალი" : angle < 24 ? "საშუალო" : "მაღალი";
  const riskColor = angle < 12 ? GOLD_BRIGHT : angle < 24 ? AMBER : "#D96A4A";

  return (
    <div className="sn-page">
      <div className="sn-hero-grid">
        <GlassCard className="sn-hero-card">
          <div className="sn-hero-top">
            <Eyebrow>რეალურ დროში · პოზის მოდელი</Eyebrow>
            <span className={`sn-pill ${good ? "sn-pill--good" : "sn-pill--warn"}`}>
              <span className="sn-pulse-dot" />
              {good ? "სწორი პოზიცია" : "საჭიროებს კორექციას"}
            </span>
          </div>

          <div className="sn-hero-body">
            <SpineVisual angle={angle} good={good} />
            <div className="sn-score-block">
              <div className="sn-score-number">
                {score}
                <span className="sn-score-max">/100</span>
              </div>
              <div className="sn-score-label">პოზის ქულა</div>
              <div className="sn-mini-stat">
                <Gauge size={15} strokeWidth={1.6} />
                <span>დახრის კუთხე</span>
                <b style={{ color: riskColor }}>{angle.toFixed(1)}°</b>
              </div>
              <div className="sn-mini-stat">
                <Flame size={15} strokeWidth={1.6} />
                <span>დაღლილობის რისკი</span>
                <b style={{ color: riskColor }}>{risk}</b>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="sn-hero-side">
          <GlassCard className="sn-quick-card">
            <Eyebrow>სენსორი</Eyebrow>
            <button
              className={`sn-btn ${connected ? "sn-btn--gold" : "sn-btn--outline"}`}
              onClick={() => setConnected((c) => !c)}
            >
              <Bluetooth size={16} strokeWidth={1.8} />
              {connected ? "დაკავშირებულია" : "სენსორის დაკავშირება"}
            </button>
            <button className="sn-btn sn-btn--outline">
              <RotateCcw size={16} strokeWidth={1.8} />
              კალიბრაცია
            </button>
            <div className="sn-divider" />
            <div className="sn-device-row">
              <Battery size={16} strokeWidth={1.7} />
              <span>ბატარეა</span>
              <b>81%</b>
            </div>
            <div className="sn-device-row">
              <Bluetooth size={16} strokeWidth={1.7} />
              <span>სტატუსი</span>
              <b style={{ color: connected ? GOLD_BRIGHT : "#8B8880" }}>
                {connected ? "აქტიური" : "გათიშული"}
              </b>
            </div>
          </GlassCard>

          <GlassCard className="sn-quote-card">
            <Quote size={20} color={GOLD} strokeWidth={1.5} />
            <p>
              „კისრის სწორი პოზა ჩნდება არა ძალისხმევით, არამედ მუდმივი, ჩუმი
              შეხსენებით."
            </p>
          </GlassCard>
        </div>
      </div>

      <div className="sn-stats-row">
        <GlassCard className="sn-stat">
          <div className="sn-stat-icon"><Clock size={18} strokeWidth={1.6} /></div>
          <div>
            <div className="sn-stat-value">5<span className="sn-stat-unit">სთ 42წთ</span></div>
            <div className="sn-stat-label">დღევანდელი სწორი პოზა</div>
          </div>
        </GlassCard>
        <GlassCard className="sn-stat">
          <div className="sn-stat-icon"><Gauge size={18} strokeWidth={1.6} /></div>
          <div>
            <div className="sn-stat-value">{angle.toFixed(1)}<span className="sn-stat-unit">°</span></div>
            <div className="sn-stat-label">კისრის დახრის კუთხე</div>
          </div>
        </GlassCard>
        <GlassCard className="sn-stat">
          <div className="sn-stat-icon"><AlertTriangle size={18} strokeWidth={1.6} /></div>
          <div>
            <div className="sn-stat-value" style={{ color: riskColor }}>{risk}</div>
            <div className="sn-stat-label">დაჭიმულობის რისკი</div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                               */
/* ------------------------------------------------------------------ */
const TEAM = [
  { name: "ლუკა", role: "იდეის ავტორი" },
  { name: "მარიამი", role: "საიტი · პრეზენტაცია" },
  { name: "ანასტასია", role: "Hardware" },
  { name: "ლინდა", role: "Hardware · პრეზენტაცია" },
  { name: "ტასო", role: "პრეზენტაცია" },
  { name: "ლილე", role: "გუნდის წევრი" },
  { name: "ლევანი", role: "გუნდის წევრი" },
  { name: "ზურა", role: "გუნდის წევრი" },
  { name: "ლედი", role: "გუნდის წევრი" },
];

const TECH = [
  { icon: Cpu, title: "6-ღერძიანი MPU-6050 სენსორი", text: "მაღალი სიზუსტის აქსელერომეტრი და გიროსკოპი, რომელიც აღიქვამს კისრის ყოველ მიკრო-მოძრაობას მილიწამებში." },
  { icon: Magnet, title: "უხილავი მაგნიტური სამაგრი", text: "ტანსაცმელზე მაგრდება კვალის გარეშე — არც ხრახნი, არც წნევა კანზე." },
  { icon: BatteryCharging, title: "35+ საათიანი ბატარეა", text: "ერთი დატენვა გყოფნით სრული სამუშაო კვირისთვის, 4-გრამიან, მინიმალისტურ კორპუსში." },
];

function AboutPage() {
  return (
    <div className="sn-page">
      <GlassCard className="sn-about-hero">
        <Eyebrow>ჩვენი მისია</Eyebrow>
        <h2 className="sn-serif-h">
          შევქმენით ასისტენტი,
          <br /> რომელსაც <span className="sn-gold-text">ვერასდროს შეამჩნევთ</span>.
        </h2>
        <p className="sn-body-text">
          Smart Neck დაიბადა მარტივი დაკვირვებით — თანამედროვე ცხოვრება მუდმივად
          გვახრილავს ეკრანისკენ, ჩუმად და შეუმჩნევლად. ჩვენ ავაშენეთ გაჯეტი,
          რომელიც ისეთივე შეუმჩნევლად, მაგრამ ინტელექტუალურად გიბრუნებთ სწორ
          პოზაში — რეალურ დროში, მონაცემებზე დაფუძნებული სიზუსტით.
        </p>
      </GlassCard>

      <div className="sn-tech-grid">
        {TECH.map((t) => (
          <GlassCard key={t.title} className="sn-tech-card">
            <div className="sn-tech-icon"><t.icon size={22} strokeWidth={1.5} color={GOLD} /></div>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="sn-investor-card">
        <Eyebrow>ინვესტორებისთვის</Eyebrow>
        <h3 className="sn-serif-h sn-serif-h--sm">ინოვაციური მიდგომა ჯანმრთელობის ტექნოლოგიებში</h3>
        <div className="sn-investor-grid">
          <div className="sn-investor-item">
            <ShieldCheck size={18} color={GOLD} strokeWidth={1.6} />
            <span>პრევენციული ჯანდაცვა — მონაცემზე დაფუძნებული, არა რეაქციული</span>
          </div>
          <div className="sn-investor-item">
            <Sparkles size={18} color={GOLD} strokeWidth={1.6} />
            <span>Wearable-ჯანმრთელობის ბაზრის სწრაფი ზრდა და მზარდი მოთხოვნა</span>
          </div>
          <div className="sn-investor-item">
            <Feather size={18} color={GOLD} strokeWidth={1.6} />
            <span>მსუბუქი, მასშტაბირებადი hardware — დაბალი წარმოების ბარიერი</span>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="sn-team-card">
        <Eyebrow>გუნდი</Eyebrow>
        <div className="sn-team-grid">
          {TEAM.map((m) => (
            <div className="sn-team-member" key={m.name}>
              <div className="sn-team-avatar">{m.name.charAt(0)}</div>
              <div>
                <div className="sn-team-name">{m.name}</div>
                <div className="sn-team-role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANALYTICS                                                           */
/* ------------------------------------------------------------------ */
const WEEKLY = [
  { day: "ორშ", ქულა: 78 },
  { day: "სამ", ქულა: 84 },
  { day: "ოთხ", ქულა: 71 },
  { day: "ხუთ", ქულა: 89 },
  { day: "პარ", ქულა: 65 },
  { day: "შაბ", ქულა: 92 },
  { day: "კვი", ქულა: 95 },
];
const MONTHLY = [
  { week: "1-ლი კვირა", ქულა: 74 },
  { week: "2-ე კვირა", ქულა: 79 },
  { week: "3-ე კვირა", ქულა: 83 },
  { week: "4-ე კვირა", ქულა: 88 },
];
const HOURLY_ALERTS = [
  { hour: "08", გაფრთხილება: 1 },
  { hour: "10", გაფრთხილება: 2 },
  { hour: "12", გაფრთხილება: 4 },
  { hour: "14", გაფრთხილება: 6 },
  { hour: "16", გაფრთხილება: 8 },
  { hour: "18", გაფრთხილება: 3 },
  { hour: "20", გაფრთხილება: 1 },
];
const RECS = [
  { title: "კისრის გვერდითი დაჭიმვა", text: "30 წამი თითო მხარეს — ყოველ 2 საათში." },
  { title: "მხრების როლი უკან", text: "10 გამეორება, სუნთქვასთან სინქრონში." },
  { title: "მოკლე შესვენება 16:00-ზე", text: "თქვენი გაფრთხილებების პიკი — დადეთ შეხსენება." },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="sn-tooltip">
      <div className="sn-tooltip-label">{label}</div>
      <div className="sn-tooltip-value">{payload[0].value}</div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="sn-page">
      <div className="sn-analytics-grid">
        <GlassCard className="sn-chart-card">
          <Eyebrow>კვირის დინამიკა</Eyebrow>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={WEEKLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" stroke="#8B8880" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8B8880" fontSize={12} tickLine={false} axisLine={false} width={30} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="ქულა" stroke={GOLD_BRIGHT} strokeWidth={2} fill="url(#goldFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard className="sn-chart-card">
          <Eyebrow>თვის დინამიკა</Eyebrow>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="week" stroke="#8B8880" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8B8880" fontSize={12} tickLine={false} axisLine={false} width={30} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="ქულა" stroke={GOLD_BRIGHT} strokeWidth={2} fill="url(#goldFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <GlassCard className="sn-chart-card">
        <Eyebrow>Bad Posture Alerts — საათობრივი ისტორია</Eyebrow>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={HOURLY_ALERTS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid stroke="#2A2A2A" strokeDasharray="3 5" vertical={false} />
            <XAxis dataKey="hour" stroke="#8B8880" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#8B8880" fontSize={12} tickLine={false} axisLine={false} width={30} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="გაფრთხილება" fill={AMBER} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="sn-hint-text">ყველაზე ხშირი გაფრთხილებები — 16:00–17:00 საათებში.</p>
      </GlassCard>

      <GlassCard className="sn-rec-card">
        <Eyebrow>რეკომენდაციები</Eyebrow>
        <div className="sn-rec-list">
          {RECS.map((r) => (
            <div className="sn-rec-item" key={r.title}>
              <div className="sn-rec-check"><Check size={14} strokeWidth={2.2} /></div>
              <div>
                <div className="sn-rec-title">{r.title}</div>
                <div className="sn-rec-text">{r.text}</div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROFILE                                                             */
/* ------------------------------------------------------------------ */
function ProfilePage() {
  const [vibration, setVibration] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [sensitivity, setSensitivity] = useState(2); // 0 low - 2 high
  const levels = ["დაბალი", "საშუალო", "მაღალი"];

  return (
    <div className="sn-page">
      <div className="sn-profile-grid">
        <GlassCard className="sn-profile-card">
          <Eyebrow>პირადი მონაცემები</Eyebrow>
          <div className="sn-profile-head">
            <div className="sn-avatar-lg">გ</div>
            <div>
              <div className="sn-profile-name">გიორგი მაისურაძე</div>
              <div className="sn-profile-sub">Smart Neck-ის მომხმარებელი</div>
            </div>
          </div>
          <div className="sn-field-grid">
            <div className="sn-field">
              <span>სახელი</span>
              <b>გიორგი მაისურაძე</b>
            </div>
            <div className="sn-field">
              <span>ასაკი</span>
              <b>29</b>
            </div>
            <div className="sn-field">
              <span>სამუშაო რეჟიმი</span>
              <b>დისტანციური · მჯდომარე</b>
            </div>
            <div className="sn-field">
              <span>დღიური მიზანი</span>
              <b>7 საათი სწორ პოზაში</b>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="sn-profile-card">
          <Eyebrow>დაკავშირებული გაჯეტი</Eyebrow>
          <div className="sn-device-row">
            <Battery size={16} strokeWidth={1.7} />
            <span>ბატარეა</span>
            <b>81%</b>
          </div>
          <div className="sn-battery-track">
            <div className="sn-battery-fill" style={{ width: "81%" }} />
          </div>
          <div className="sn-device-row">
            <Bluetooth size={16} strokeWidth={1.7} />
            <span>Bluetooth</span>
            <b style={{ color: GOLD_BRIGHT }}>დაკავშირებულია</b>
          </div>
          <div className="sn-device-row">
            <Clock size={16} strokeWidth={1.7} />
            <span>ბოლო სინქრონიზაცია</span>
            <b>2 წუთის წინ</b>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="sn-settings-card">
        <Eyebrow>შეტყობინებების მორგება</Eyebrow>

        <div className="sn-setting-row">
          <div className="sn-setting-label">
            <Vibrate size={18} strokeWidth={1.6} />
            <div>
              <div>ვიბრაციის შეხსენება</div>
              <span>ვიბრაცია მცდარი პოზის დროს</span>
            </div>
          </div>
          <Toggle checked={vibration} onChange={setVibration} />
        </div>

        <div className="sn-setting-row">
          <div className="sn-setting-label">
            <Bell size={18} strokeWidth={1.6} />
            <div>
              <div>გაფრთხილების შეტყობინებები</div>
              <span>Push შეტყობინება აპლიკაციაში</span>
            </div>
          </div>
          <Toggle checked={alerts} onChange={setAlerts} />
        </div>

        <div className="sn-setting-row sn-setting-row--stack">
          <div className="sn-setting-label">
            <Gauge size={18} strokeWidth={1.6} />
            <div>
              <div>მგრძნობელობის დონე</div>
              <span>რამდენად სწრაფად შეგატყობინოთ გადახრაზე</span>
            </div>
          </div>
          <div className="sn-segment">
            {levels.map((l, i) => (
              <button
                key={l}
                className={`sn-segment-btn ${sensitivity === i ? "sn-segment-btn--active" : ""}`}
                onClick={() => setSensitivity(i)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  STORE                                                               */
/* ------------------------------------------------------------------ */
function StorePage() {
  const [ordered, setOrdered] = useState(false);
  return (
    <div className="sn-page">
      <GlassCard className="sn-store-card">
        <div className="sn-store-visual">
          <div className="sn-store-halo" />
          <svg viewBox="0 0 200 200" width="180" height="180">
            <defs>
              <linearGradient id="deviceGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={GOLD_BRIGHT} />
                <stop offset="100%" stopColor="#8a6f22" />
              </linearGradient>
            </defs>
            <path
              d="M40 110 Q 40 40 100 40 Q 160 40 160 110"
              fill="none"
              stroke="url(#deviceGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <circle cx="40" cy="115" r="9" fill={GOLD_BRIGHT} />
            <circle cx="160" cy="115" r="9" fill={GOLD_BRIGHT} />
          </svg>
        </div>

        <div className="sn-store-info">
          <Eyebrow>Pre-order · შეზღუდული სერია</Eyebrow>
          <h2 className="sn-serif-h sn-serif-h--sm">Smart Neck — ინტელექტუალური ასისტენტი</h2>
          <p className="sn-body-text">
            ულტრა-მსუბუქი, უხილავი მოწყობილობა, რომელიც 6-ღერძიანი სენსორით
            აკონტროლებს კისრის პოზას და რეალურ დროში გიგზავნით მონაცემებს
            თქვენს პროფილში.
          </p>

          <div className="sn-price-row">
            <span className="sn-price">89 ₾</span>
            <span className="sn-price-note">დაფარავს პირველ 500 შეკვეთას</span>
          </div>

          <ul className="sn-feature-list">
            <li><Check size={14} strokeWidth={2.2} color={GOLD} /> 35+ საათიანი ბატარეა</li>
            <li><Check size={14} strokeWidth={2.2} color={GOLD} /> უხილავი მაგნიტური სამაგრი</li>
            <li><Check size={14} strokeWidth={2.2} color={GOLD} /> 12 თვიანი გარანტია</li>
            <li><Check size={14} strokeWidth={2.2} color={GOLD} /> უფასო მიწოდება საქართველოში</li>
          </ul>

          <button className="sn-btn sn-btn--gold sn-btn--wide" onClick={() => setOrdered(true)} disabled={ordered}>
            <Package size={16} strokeWidth={1.8} />
            {ordered ? "შეკვეთა მიღებულია" : "შეკვეთის გაფორმება"}
          </button>

          <div className="sn-store-meta">
            <div><Truck size={14} strokeWidth={1.7} /> მიწოდება 5–7 სამუშაო დღეში</div>
            <div><ShieldCheck size={14} strokeWidth={1.7} /> 30-დღიანი დაბრუნების გარანტია</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP SHELL                                                           */
/* ------------------------------------------------------------------ */
const NAV = [
  { id: "home", label: "მთავარი", short: "მთავარი", icon: Home, Comp: HomePage },
  { id: "about", label: "ჩვენ შესახებ", short: "შესახებ", icon: Info, Comp: AboutPage },
  { id: "analytics", label: "ანალიტიკა", short: "სტატისტიკა", icon: BarChart3, Comp: AnalyticsPage },
  { id: "profile", label: "პროფილი", short: "პროფილი", icon: UserRound, Comp: ProfilePage },
  { id: "store", label: "მაღაზია", short: "მაღაზია", icon: ShoppingBag, Comp: StorePage },
];

export default function App() {
  const [tab, setTab] = useState("home");
  const Active = NAV.find((n) => n.id === tab)?.Comp || HomePage;

  return (
    <div className="sn-root">
      <div className="sn-shell">
        <aside className="sn-sidebar">
          <div className="sn-brand">
            <div className="sn-brand-mark">SN</div>
            <div className="sn-brand-text">
              <div className="sn-brand-title">Smart Neck</div>
              <div className="sn-brand-sub">უხილავი ასისტენტი</div>
            </div>
          </div>

          <nav className="sn-nav">
            {NAV.map((n) => (
              <button
                key={n.id}
                className={`sn-nav-btn ${tab === n.id ? "sn-nav-btn--active" : ""}`}
                onClick={() => setTab(n.id)}
              >
                <n.icon size={18} strokeWidth={1.7} />
                <span>{n.label}</span>
                {tab === n.id && <ChevronRight size={14} className="sn-nav-chevron" />}
              </button>
            ))}
          </nav>

          <div className="sn-sidebar-footer">
            <div className="sn-tagline">
              ინტელექტუალური და უხილავი <br /> ასისტენტი თქვენი კისრისთვის.
            </div>
          </div>
        </aside>

        <main className="sn-main">
          <header className="sn-topbar">
            <div className="sn-topbar-brand">
              <div className="sn-brand-mark sn-brand-mark--sm">SN</div>
              <div className="sn-topbar-title">
                {NAV.find((n) => n.id === tab)?.label}
              </div>
            </div>
            <div className="sn-topbar-right">
              <CalendarDays size={15} strokeWidth={1.6} />
              <span>{new Date().toLocaleDateString("ka-GE", { day: "numeric", month: "long" })}</span>
            </div>
          </header>
          <Active />
        </main>
      </div>

      {/* mobile bottom nav */}
      <nav className="sn-mobile-nav">
        {NAV.map((n) => (
          <button
            key={n.id}
            className={`sn-mobile-btn ${tab === n.id ? "sn-mobile-btn--active" : ""}`}
            onClick={() => setTab(n.id)}
          >
            <n.icon size={20} strokeWidth={1.7} />
            <span>{n.short}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
