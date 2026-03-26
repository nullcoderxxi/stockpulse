import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Bell, Settings, Search, X } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function Navbar() {
  const { isMobile } = useWindowSize();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: isMobile ? '0 16px' : '0 24px',
        height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TrendingUp size={22} color="#00f5d4" />
        <span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
          Stock<span style={{ color: '#00f5d4' }}>Pulse</span>
        </span>
        {!isMobile && (
          <span className="blink" style={{
            marginLeft: '8px', padding: '2px 8px', borderRadius: '20px',
            fontSize: '10px', fontWeight: 700, background: '#00f5d420',
            color: '#00f5d4', border: '1px solid #00f5d430', letterSpacing: '1px',
          }}>LIVE</span>
        )}
      </div>

      {/* Search bar — hidden on mobile, shown on tablet/desktop */}
      {!isMobile && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px', padding: '7px 14px',
          width: '260px',
        }}>
          <Search size={14} color="#718096" />
          <input placeholder="Search stocks..." style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: '#fff', fontSize: '13px', width: '100%',
          }} />
        </div>
      )}

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '16px' }}>
        {/* Mobile search toggle */}
        {isMobile && (
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
          >
            {searchOpen ? <X size={18} color="#718096" /> : <Search size={18} color="#718096" />}
          </button>
        )}

        {!isMobile && (
          <span style={{ color: '#718096', fontSize: '13px' }}>
            Market: <span style={{ color: '#10b981', fontWeight: 600 }}>Open</span>
          </span>
        )}

        <Bell size={18} color="#718096" style={{ cursor: 'pointer' }} />
        {!isMobile && <Settings size={18} color="#718096" style={{ cursor: 'pointer' }} />}

        <div style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #00f5d4, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 700, color: '#0a0e1a', cursor: 'pointer',
          flexShrink: 0,
        }}>A</div>
      </div>

      {/* Mobile search dropdown */}
      {isMobile && searchOpen && (
        <div style={{
          position: 'absolute', top: '60px', left: 0, right: 0,
          background: 'rgba(10,14,26,0.98)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '12px 16px', zIndex: 99,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '8px 14px',
          }}>
            <Search size={14} color="#718096" />
            <input
              autoFocus
              placeholder="Search stocks..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                color: '#fff', fontSize: '13px', width: '100%',
              }}
            />
          </div>
        </div>
      )}
    </motion.nav>
  );
}
