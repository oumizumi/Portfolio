'use client';

export default function ScraperDiagram() {
  return (
    <svg width="800" height="400" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
      <style>{`
        /* Light Mode */
        .bg-start { stop-color: #f8fafc; }
        .bg-end { stop-color: #f1f5f9; }
        .grid { stroke: #cbd5e1; }
        .conn { stroke: #94a3b8; }
        .card { fill: #ffffff; stroke: #e2e8f0; }
        .txt-1 { fill: #0f172a; }
        .txt-2 { fill: #64748b; }
        .stat { fill: #f8fafc; stroke: #e2e8f0; }
        .stat-txt { fill: #64748b; }
        
        /* Dark Mode */
        .dark .bg-start { stop-color: #0f172a; }
        .dark .bg-end { stop-color: #1e293b; }
        .dark .grid { stroke: #3b82f6; }
        .dark .conn { stroke: #475569; }
        .dark .card { fill: #1e293b; stroke: #334155; }
        .dark .txt-1 { fill: #e2e8f0; }
        .dark .txt-2 { fill: #64748b; }
        .dark .stat { fill: #1e293b; stroke: #334155; }
        .dark .stat-txt { fill: #94a3b8; }
      `}</style>
      
      <defs>
        <linearGradient id="bg">
          <stop offset="0%" className="bg-start"/>
          <stop offset="100%" className="bg-end"/>
        </linearGradient>
      </defs>
      
      <rect width="800" height="400" fill="url(#bg)"/>
      
      {/* Grid */}
      <g opacity="0.03">
        <line x1="0" y1="100" x2="800" y2="100" className="grid" strokeWidth="0.5"/>
        <line x1="0" y1="200" x2="800" y2="200" className="grid" strokeWidth="0.5"/>
        <line x1="0" y1="300" x2="800" y2="300" className="grid" strokeWidth="0.5"/>
        <line x1="200" y1="0" x2="200" y2="400" className="grid" strokeWidth="0.5"/>
        <line x1="400" y1="0" x2="400" y2="400" className="grid" strokeWidth="0.5"/>
        <line x1="600" y1="0" x2="600" y2="400" className="grid" strokeWidth="0.5"/>
      </g>

      {/* Connections */}
      <g className="conn" strokeWidth="2" fill="none" opacity="0.5">
        <path d="M 110 70 L 110 110"/>
        <path d="M 110 70 L 110 170"/>
        <path d="M 110 70 L 110 230"/>
        <path d="M 220 135 L 310 185"/>
        <path d="M 220 195 L 310 195"/>
        <path d="M 220 255 L 310 205"/>
        <path d="M 420 195 L 500 195"/>
      </g>

      {/* Title */}
      <text x="60" y="25" className="txt-1" fontSize="14" fontWeight="600" fontFamily="-apple-system, sans-serif">Data Collection Pipeline</text>

      {/* Schedule */}
      <g transform="translate(60, 45)">
        <rect width="100" height="50" rx="8" className="card" strokeWidth="1.5"/>
        <circle cx="20" cy="25" r="10" fill="#ef4444" opacity="0.15"/>
        <rect x="15" y="21" width="10" height="9" rx="1.5" stroke="#ef4444" strokeWidth="1.5" fill="none"/>
        <line x1="17" y1="19" x2="17" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="23" y1="19" x2="23" y2="22" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
        <text x="60" y="29" textAnchor="middle" className="txt-1" fontSize="10" fontWeight="600" fontFamily="-apple-system, sans-serif">Schedule</text>
      </g>

      {/* Course Scraper */}
      <g transform="translate(60, 110)">
        <rect width="160" height="50" rx="8" className="card" strokeWidth="1.5"/>
        <circle cx="18" cy="25" r="10" fill="#10b981" opacity="0.15"/>
        <rect x="13" y="21" width="10" height="9" rx="1.5" stroke="#10b981" strokeWidth="1.5" fill="none"/>
        <line x1="13" y1="24" x2="23" y2="24" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
        <line x1="13" y1="27" x2="23" y2="27" stroke="#10b981" strokeWidth="1" opacity="0.5"/>
        <circle cx="15.5" cy="22.5" r="0.8" fill="#10b981"/>
        <circle cx="17.5" cy="22.5" r="0.8" fill="#10b981"/>
        <text x="90" y="22" textAnchor="middle" className="txt-1" fontSize="10" fontWeight="600" fontFamily="-apple-system, sans-serif">Course Offerings</text>
        <text x="90" y="35" textAnchor="middle" className="txt-2" fontSize="7" fontFamily="-apple-system, sans-serif">Puppeteer • Playwright</text>
      </g>

      {/* Catalogue */}
      <g transform="translate(60, 170)">
        <rect width="160" height="50" rx="8" className="card" strokeWidth="1.5"/>
        <circle cx="18" cy="25" r="10" fill="#3b82f6" opacity="0.15"/>
        <path d="M 14 20 L 14 30 L 22 30 L 22 23 L 19 20 Z" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M 19 20 L 19 23 L 22 23" stroke="#3b82f6" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <line x1="16" y1="25" x2="20" y2="25" stroke="#3b82f6" strokeWidth="1"/>
        <line x1="16" y1="27.5" x2="20" y2="27.5" stroke="#3b82f6" strokeWidth="1"/>
        <text x="90" y="22" textAnchor="middle" className="txt-1" fontSize="10" fontWeight="600" fontFamily="-apple-system, sans-serif">Catalogue</text>
        <text x="90" y="35" textAnchor="middle" className="txt-2" fontSize="7" fontFamily="-apple-system, sans-serif">Descriptions</text>
      </g>

      {/* Faculty */}
      <g transform="translate(60, 230)">
        <rect width="160" height="50" rx="8" className="card" strokeWidth="1.5"/>
        <circle cx="18" cy="25" r="10" fill="#f59e0b" opacity="0.15"/>
        <circle cx="18" cy="23" r="2.5" stroke="#f59e0b" strokeWidth="1.5" fill="none"/>
        <path d="M 13 29 Q 13 26, 18 26 Q 23 26, 23 29" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <text x="90" y="22" textAnchor="middle" className="txt-1" fontSize="10" fontWeight="600" fontFamily="-apple-system, sans-serif">Faculty Directory</text>
        <text x="90" y="35" textAnchor="middle" className="txt-2" fontSize="7" fontFamily="-apple-system, sans-serif">uOttawa Official</text>
      </g>

      {/* Pipeline */}
      <g transform="translate(310, 170)">
        <rect width="110" height="50" rx="8" className="card" strokeWidth="1.5"/>
        <circle cx="20" cy="25" r="10" fill="#8b5cf6" opacity="0.15"/>
        <line x1="14" y1="22" x2="26" y2="22" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="14" y1="28" x2="26" y2="28" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="22" r="1.5" fill="#8b5cf6"/>
        <circle cx="23" cy="28" r="1.5" fill="#8b5cf6"/>
        <text x="65" y="22" textAnchor="middle" className="txt-1" fontSize="10" fontWeight="600" fontFamily="-apple-system, sans-serif">Pipeline</text>
        <text x="65" y="35" textAnchor="middle" className="txt-2" fontSize="7" fontFamily="-apple-system, sans-serif">Parse • Clean</text>
      </g>

      {/* JSON */}
      <g transform="translate(500, 170)">
        <rect width="160" height="50" rx="8" className="card" strokeWidth="1.5"/>
        <circle cx="18" cy="25" r="10" fill="#eab308" opacity="0.15"/>
        <path d="M 13 21 L 13 30 L 23 30 L 23 24 L 20 21 Z" stroke="#eab308" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M 20 21 L 20 24 L 23 24" stroke="#eab308" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <line x1="15" y1="26" x2="21" y2="26" stroke="#eab308" strokeWidth="1"/>
        <line x1="15" y1="28" x2="19" y2="28" stroke="#eab308" strokeWidth="1"/>
        <text x="90" y="22" textAnchor="middle" className="txt-1" fontSize="10" fontWeight="600" fontFamily="-apple-system, sans-serif">JSON Files</text>
        <text x="90" y="35" textAnchor="middle" className="txt-2" fontSize="7" fontFamily="monospace">courses.json</text>
      </g>

      {/* Stats */}
      <rect x="60" y="315" width="80" height="26" rx="13" className="stat" strokeWidth="1"/>
      <text x="100" y="331" textAnchor="middle" className="stat-txt" fontSize="9" fontWeight="500" fontFamily="-apple-system, sans-serif">15k Courses</text>

      <rect x="155" y="315" width="85" height="26" rx="13" className="stat" strokeWidth="1"/>
      <text x="197.5" y="331" textAnchor="middle" className="stat-txt" fontSize="9" fontWeight="500" fontFamily="-apple-system, sans-serif">160 Subjects</text>

      <rect x="255" y="315" width="95" height="26" rx="13" className="stat" strokeWidth="1"/>
      <text x="302.5" y="331" textAnchor="middle" className="stat-txt" fontSize="9" fontWeight="500" fontFamily="-apple-system, sans-serif">1,200+ Faculty</text>

      <rect x="365" y="315" width="90" height="26" rx="13" className="stat" strokeWidth="1"/>
      <text x="410" y="331" textAnchor="middle" className="stat-txt" fontSize="9" fontWeight="500" fontFamily="-apple-system, sans-serif">200 Programs</text>

      <rect x="470" y="315" width="65" height="26" rx="13" className="stat" strokeWidth="1"/>
      <text x="502.5" y="331" textAnchor="middle" className="stat-txt" fontSize="9" fontWeight="500" fontFamily="-apple-system, sans-serif">3 Terms</text>

      {/* Active */}
      <defs>
        <linearGradient id="active">
          <stop offset="0%" style={{stopColor:'#10b981'}}/>
          <stop offset="100%" style={{stopColor:'#059669'}}/>
        </linearGradient>
      </defs>
      <rect x="550" y="315" width="100" height="26" rx="13" fill="url(#active)"/>
      <text x="600" y="331" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="-apple-system, sans-serif">6 Active</text>
    </svg>
  );
}

