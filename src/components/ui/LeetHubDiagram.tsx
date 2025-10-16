'use client';

export default function LeetHubDiagram() {
  return (
    <svg width="800" height="450" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-full" preserveAspectRatio="xMidYMid meet">
      <style>{`
        /* Light Mode */
        .bg-start { stop-color: #f8fafc; }
        .bg-end { stop-color: #e2e8f0; }
        .header-start { stop-color: #4a5568; }
        .header-end { stop-color: #2d3748; }
        .window { fill: #ffffff; stroke: #e2e8f0; }
        .txt-1 { fill: #1e293b; }
        .txt-2 { fill: #64748b; }
        .txt-3 { fill: #475569; }
        .card-bg { fill: #f8fafc; stroke: #e2e8f0; }
        
        /* Dark Mode */
        .dark .bg-start { stop-color: #0f172a; }
        .dark .bg-end { stop-color: #1e293b; }
        .dark .header-start { stop-color: #1e293b; }
        .dark .header-end { stop-color: #0f172a; }
        .dark .window { fill: #1e293b; stroke: #334155; }
        .dark .txt-1 { fill: #e2e8f0; }
        .dark .txt-2 { fill: #94a3b8; }
        .dark .txt-3 { fill: #cbd5e1; }
        .dark .card-bg { fill: #0f172a; stroke: #334155; }
      `}</style>
      
      <defs>
        <linearGradient id="bg">
          <stop offset="0%" className="bg-start"/>
          <stop offset="100%" className="bg-end"/>
        </linearGradient>
        <linearGradient id="header">
          <stop offset="0%" className="header-start"/>
          <stop offset="100%" className="header-end"/>
        </linearGradient>
      </defs>
      
      <rect width="800" height="450" fill="url(#bg)"/>
      
      {/* Extension Window */}
      <g transform="translate(100, 25)">
        <rect width="600" height="400" rx="12" className="window" strokeWidth="2"/>
        
        {/* Header */}
        <rect width="600" height="70" rx="12" fill="url(#header)"/>
        <rect y="12" width="600" height="58" fill="url(#header)"/>
        <text x="300" y="32" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="700" fontFamily="-apple-system, sans-serif">LeetHub</text>
        <text x="300" y="53" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontFamily="-apple-system, sans-serif">Auto-sync your LeetCode solutions to GitHub</text>
        
        {/* Status */}
        <text x="30" y="105" className="txt-3" fontSize="12" fontWeight="600" fontFamily="-apple-system, sans-serif">Status:</text>
        <circle cx="100" cy="101" r="5" fill="#10b981"/>
        <text x="112" y="105" fill="#10b981" fontSize="12" fontWeight="600" fontFamily="-apple-system, sans-serif">Connected</text>
        
        {/* Repository */}
        <text x="30" y="130" className="txt-2" fontSize="11" fontFamily="-apple-system, sans-serif">Repository:</text>
        <text x="110" y="130" className="txt-1" fontSize="11" fontWeight="500" fontFamily="monospace">oumizumi/leetcode-solutions</text>
        
        {/* Branch */}
        <text x="30" y="150" className="txt-2" fontSize="11" fontFamily="-apple-system, sans-serif">Branch:</text>
        <rect x="90" y="140" width="50" height="16" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1"/>
        <text x="115" y="150" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="600" fontFamily="monospace">main</text>
        
        {/* Push Button */}
        <rect x="30" y="170" width="540" height="40" rx="8" fill="#2563eb"/>
        <text x="300" y="195" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="600" fontFamily="-apple-system, sans-serif">Push Current Page</text>
        
        {/* Statistics */}
        <text x="30" y="240" className="txt-1" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">STATISTICS</text>
        
        {/* Stats Cards */}
        <rect x="30" y="250" width="120" height="70" rx="8" className="card-bg" strokeWidth="2"/>
        <text x="90" y="285" textAnchor="middle" className="txt-1" fontSize="26" fontWeight="700" fontFamily="-apple-system, sans-serif">24</text>
        <text x="90" y="302" textAnchor="middle" className="txt-2" fontSize="9" fontWeight="600" fontFamily="-apple-system, sans-serif">TOTAL SOLVED</text>
        
        <rect x="165" y="250" width="120" height="70" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="2"/>
        <text x="225" y="285" textAnchor="middle" fill="#15803d" fontSize="26" fontWeight="700" fontFamily="-apple-system, sans-serif">24</text>
        <text x="225" y="302" textAnchor="middle" fill="#16a34a" fontSize="9" fontWeight="600" fontFamily="-apple-system, sans-serif">EASY</text>
        
        <rect x="300" y="250" width="120" height="70" rx="8" fill="#fef3c7" stroke="#fbbf24" strokeWidth="2"/>
        <text x="360" y="285" textAnchor="middle" fill="#92400e" fontSize="26" fontWeight="700" fontFamily="-apple-system, sans-serif">0</text>
        <text x="360" y="302" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="600" fontFamily="-apple-system, sans-serif">MEDIUM</text>
        
        <rect x="435" y="250" width="120" height="70" rx="8" fill="#fee2e2" stroke="#fca5a5" strokeWidth="2"/>
        <text x="495" y="285" textAnchor="middle" fill="#991b1b" fontSize="26" fontWeight="700" fontFamily="-apple-system, sans-serif">0</text>
        <text x="495" y="302" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="600" fontFamily="-apple-system, sans-serif">HARD</text>
        
        {/* Recent Activity */}
        <text x="30" y="345" className="txt-1" fontSize="13" fontWeight="700" fontFamily="-apple-system, sans-serif">RECENT ACTIVITY</text>
        <text x="555" y="345" textAnchor="end" fill="#3b82f6" fontSize="11" fontWeight="600" fontFamily="-apple-system, sans-serif">Refresh</text>
        
        {/* Activity Item */}
        <rect x="30" y="350" width="540" height="45" rx="8" className="card-bg" strokeWidth="2"/>
        <circle cx="50" cy="372.5" r="12" fill="#10b981"/>
        <path d="M 47.5 372.5 L 49.5 374.5 L 53 371" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="75" y="369" className="txt-1" fontSize="12" fontWeight="600" fontFamily="-apple-system, sans-serif">Pushed: Two Sum</text>
        <text x="75" y="383" className="txt-2" fontSize="9" fontFamily="-apple-system, sans-serif">Easy • Array • Hash Table</text>
        <text x="555" y="375" textAnchor="end" className="txt-2" fontSize="10" fontFamily="-apple-system, sans-serif">2d ago</text>
      </g>
    </svg>
  );
}

