import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const schedule = [
  { day: 'Monday', time: '08:00', duration: 2, name: 'Optimization Techniques + Lab', type: 'Lab', venue: 'G201', color: 'from-orange-500 to-red-500' },
  { day: 'Monday', time: '11:20', duration: 1, name: 'Optimization Techniques', type: 'L', venue: 'LT302', color: 'from-orange-400 to-orange-600' },
  { day: 'Monday', time: '12:10', duration: 1, name: 'Theory of Computation', type: 'L', venue: 'LT302', color: 'from-blue-400 to-blue-600' },
  { day: 'Monday', time: '15:30', duration: 2, name: 'UCSXX1 P Lab', type: 'Lab', venue: 'GC-1', color: 'from-green-400 to-emerald-600' },

  { day: 'Tuesday', time: '08:00', duration: 1, name: 'Microprocessor-based Systems', type: 'L', venue: 'LT301', color: 'from-green-500 to-teal-500' },
  { day: 'Tuesday', time: '08:50', duration: 1, name: 'Theory of Computation', type: 'L', venue: 'LT301', color: 'from-blue-400 to-blue-600' },
  { day: 'Tuesday', time: '09:40', duration: 2, name: 'Test Automation', type: 'L', venue: 'LT301', color: 'from-cyan-400 to-cyan-600' },
  { day: 'Tuesday', time: '11:20', duration: 2, name: 'Microprocessor-based Systems + Lab', type: 'Lab', venue: 'ES-1', color: 'from-green-500 to-teal-500' },

  { day: 'Wednesday', time: '08:00', duration: 2, name: 'Test Automation + Lab', type: 'Lab', venue: 'SE-2', color: 'from-cyan-400 to-cyan-600' },
  { day: 'Wednesday', time: '09:40', duration: 2, name: 'Data Engineering + Lab', type: 'Lab', venue: 'SE-2', color: 'from-yellow-300 to-yellow-500' },
  { day: 'Wednesday', time: '15:30', duration: 2, name: 'Optimization & Microprocessor Design', type: 'L', venue: 'B-304', color: 'from-orange-400 to-yellow-500' },

  { day: 'Thursday', time: '08:50', duration: 1, name: 'Theory of Computation T', type: 'T', venue: 'E312', color: 'from-blue-400 to-blue-600' },
  { day: 'Thursday', time: '09:40', duration: 1, name: 'Innovation & Entrepreneurship', type: 'L', venue: 'LT301', color: 'from-purple-400 to-purple-600' },
  { day: 'Thursday', time: '10:30', duration: 2, name: 'Data Engineering', type: 'L', venue: 'LT301', color: 'from-yellow-300 to-yellow-500' },
  { day: 'Thursday', time: '15:30', duration: 2, name: 'Innovation & Entrepreneurship P', type: 'Lab', venue: 'F-302', color: 'from-purple-400 to-purple-600' },

  { day: 'Friday', time: '13:00', duration: 1, name: 'Optimization Techniques L', type: 'L', venue: 'LT302', color: 'from-orange-400 to-orange-600' },
  { day: 'Friday', time: '13:50', duration: 1, name: 'Microprocessor-based Systems', type: 'L', venue: 'LT302', color: 'from-green-500 to-teal-500' },
  { day: 'Friday', time: '14:40', duration: 1, name: 'Theory of Computation', type: 'L', venue: 'LT302', color: 'from-blue-400 to-blue-600' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const slots = [
  '08:00', '08:50', '09:40', '10:30', '11:20', '12:10',
  '13:00', '13:50', '14:40', '15:30', '16:20', '17:10'
];

const minutesPerSlot = 50;
const addMinutes = (time, mins) => {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  const hh = String(Math.floor(total / 60)).padStart(2, '0');
  const mm = String(total % 60).padStart(2, '0');
  return `${hh}:${mm}`;
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06
    }
  }
};

// Parse subject string into name, type (L/T/Lab) and venue
const parseEntry = (subjectStr) => {
  const venueMatch = subjectStr.match(/\(([^)]+)\)/);
  const venue = venueMatch ? venueMatch[1] : '';
  const name = subjectStr.replace(/\s*\([^)]*\)/, '').trim();

  let type = '';
  if (/lab/i.test(subjectStr)) {
    type = 'Lab';
  } else if (venue) {
    const up = venue.toUpperCase();
    if (up.includes('LT') || (up.includes('L') && up.includes('T'))) type = 'L/T';
    else if (up.includes('L')) type = 'L';
    else if (up.includes('T')) type = 'T';
  } else {
    // fallback - search name for L or T tokens
    if (/\bL\b/i.test(name)) type = 'L';
    else if (/\bT\b/i.test(name)) type = 'T';
  }

  return { name, type, venue };
};

const getParsed = (s) => {
  if (s.name || s.type || s.venue) return { name: s.name || '', type: s.type || '', venue: s.venue || '' };
  return parseEntry(s.subject || s.name || '');
};

const item = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }
};

export default function AdvancedTimetable() {
  // group schedule by day for mobile stacked view
  const scheduleByDay = days.reduce((acc, d) => {
    acc[d] = schedule
      .filter(s => s.day === d)
      .sort((a, b) => a.time.localeCompare(b.time));
    return acc;
  }, {});

  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem('tt-theme') || 'light');
  const isDark = theme === 'dark';
  useEffect(() => { localStorage.setItem('tt-theme', theme); }, [theme]);

  return (
    <div className={`min-h-screen p-6 sm:p-8 font-roboto ${isDark ? 'bg-gradient-to-b from-slate-900 to-black text-slate-100' : 'bg-gradient-to-b from-white to-slate-50 text-slate-900'}`}>
      <div className="max-w-6xl mx-auto">
        <header className="relative mb-6 pt-3">
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <h1 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>3C33 Timetable</h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Clean · Spacious · Accessible</p>
          </div>

          <div className="relative flex items-center justify-end gap-3">
            <button
              aria-pressed={isDark}
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-700'}`}
            >
              {isDark ? '🌙 Dark' : '☀️ Light'}
            </button>
            <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'} hidden sm:block`}>08:00 — 17:10</div>
          </div>
        </header>

        {/* Mobile stacked-day view */}
        <div className="md:hidden">
          <motion.div initial="hidden" animate="show" variants={container} className="space-y-4">
            {days.map((day, dIdx) => (
              <motion.section
                key={day}
                variants={item}
                className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'} rounded-xl shadow-sm p-4`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">{day}</h3>
                  <div className="text-xs text-slate-500">{scheduleByDay[day].length} classes</div>
                </div>
                <div className="mt-3 space-y-3">
                  {scheduleByDay[day].map((s, idx) => {
                    const parsed = getParsed(s);
                    return (
                      <motion.div
                        key={`${day}-${s.time}-${idx}`}
                        whileHover={{ scale: 1.02 }}
                        className={`rounded-lg p-3 ${isDark ? 'bg-slate-700 border-slate-700 text-slate-100 shadow-subtle' : 'bg-white border border-slate-100 shadow-subtle'} relative`}
                      >
                        <div className="flex items-start justify-between">
                          <div className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{parsed.name}</div>
                          {/* Type badge top-right */}
                          {parsed.type && (
                            <div className={`${isDark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-700'} ml-3 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium`}>{parsed.type}</div>
                          )}
                        </div>

                        <div className="mt-2 text-xs text-slate-500">{s.time} • {s.duration} slot{ s.duration>1 ? 's' : ''}</div>

                        <div className="mt-3 relative">
                          <span className={`inline-block h-2 w-16 rounded-full bg-gradient-to-r ${s.color} opacity-95`} />
                          {parsed.venue && (
                            <div className="absolute right-0 bottom-0 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                              {parsed.venue}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            ))}
          </motion.div>
        </div>

        {/* Desktop grid view */}
        <div className="hidden md:block">
          <div
            className="relative grid gap-3 rounded-xl p-4"
            style={{
              gridTemplateColumns: '120px repeat(5, 1fr)',
              background: 'linear-gradient(180deg, rgba(15,23,42,0.02), rgba(255,255,255,0.6))',
              boxShadow: '0 6px 20px rgba(2,6,23,0.06)',
              gridAutoRows: '4.2rem'
            }}
          >
            {/* Header row */}
            <div className="col-span-1 border-r border-slate-200" />
            {days.map((d) => (
              <div key={d} className={`flex items-center justify-center text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {d}
              </div>
            ))}

            {/* Time labels & subtle grid */}
            {slots.map((slot, sIdx) => (
              <React.Fragment key={slot}>
                <div
                  style={{ gridColumnStart: 1, gridRowStart: sIdx + 2 }}
                  className={`md:sticky md:left-0 md:z-20 ${isDark ? 'md:bg-slate-900/95' : 'md:bg-white/95'} flex items-center justify-start text-xs font-mono ${isDark ? 'text-slate-300 border-slate-800/20' : 'text-slate-600 border-slate-200'} border-t border-r pl-4`}
                >
                  {slot}
                </div>

                {days.map((d, dIdx) => (
                  <div
                    key={`${d}-${slot}`}
                    style={{ gridColumnStart: dIdx + 2, gridRowStart: sIdx + 2 }}
                    className="border-t border-slate-200/60"
                  />
                ))}
              </React.Fragment>
            ))}

            {/* Schedule cards */}
            <motion.div variants={container} initial="hidden" animate="show" className="contents">
              {schedule.map((s, idx) => {
                const dayIndex = days.indexOf(s.day);
                const slotIndex = slots.findIndex((x) => x === s.time);
                if (dayIndex === -1 || slotIndex === -1) return null;

                const colStart = dayIndex + 2; // col 1 is time labels
                const rowStart = slotIndex + 2; // row 1 header
                const span = s.duration === 2 ? 2 : 1;
                const rowSpanClass = span === 2 ? 'row-span-2' : 'row-span-1';

                const start = s.time;
                const end = addMinutes(start, span * minutesPerSlot);

                const parsed = getParsed(s);

                return (
                  <motion.div
                    key={`${s.day}-${s.time}-${idx}`}
                    variants={item}
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 30px rgba(99,102,241,0.08), 0 2px 8px rgba(15,23,42,0.06)' }}
                    className={`z-10 pointer-events-auto cursor-pointer rounded-xl p-4 text-sm relative ${rowSpanClass} ${isDark ? 'text-slate-100 bg-slate-800/80 border border-slate-700 shadow-sm' : 'text-slate-900 bg-white/95 border border-slate-200 shadow-sm'}`}
                    style={{
                      gridColumnStart: colStart,
                      gridColumnEnd: `span 1`,
                      gridRowStart: rowStart
                    }}
                    aria-label={`${parsed.name} on ${s.day} at ${s.time}`}
                  >
                    <div className={`absolute -top-3 -right-3 px-2 py-0.5 rounded-md text-xs font-medium ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100 shadow-sm' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>{parsed.type}</div>
                    <div className={`absolute -top-1 -left-1 right-1 h-1.5 rounded-t-xl bg-gradient-to-r ${s.color} opacity-95`} style={{ mixBlendMode: 'screen' }} />

                    <div className="relative h-full flex flex-col justify-between gap-3">
                      <div className="flex items-start justify-between">
                        <div className="text-sm font-semibold leading-tight">{parsed.name}</div>
                        {/* small time indicator hidden (we show time below) */}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="bg-white/6 px-2 py-0.5 rounded-md text-xs">{start} — {end}</div>
                        <div className="text-xs text-slate-500 font-medium">{s.day}</div>
                      </div>

                      {parsed.venue && (
                        <div className={`absolute -bottom-3 -right-3 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${isDark ? 'bg-slate-700 border-slate-600 text-slate-100 shadow-sm' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
                          {parsed.venue}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className={`mt-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className="mr-3">🔧 <strong>Note:</strong> Hover any card to see the glow and scale effect; use Tailwind JIT for dynamic classes and enable `backdrop-blur`.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
