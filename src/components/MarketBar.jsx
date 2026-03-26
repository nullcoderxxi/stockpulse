import { motion } from 'framer-motion';
import { marketIndices } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function MarketBar() {
  const { isMobile } = useWindowSize();

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: isMobile ? '8px 16px' : '10px 24px',
      display: 'flex',
      gap: isMobile ? '20px' : '32px',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      alignItems: 'center',
    }}>
      {/* Live market status dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span className="blink" style={{
          display: 'inline-block', width: '7px', height: '7px',
          borderRadius: '50%', background: '#10b981',
        }} />
        <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 600 }}>Open</span>
      </div>

      {marketIndices.map((idx, i) => (
        <motion.div
          key={idx.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}
        >
          <span style={{ color: '#718096', fontSize: isMobile ? '11px' : '12px', fontWeight: 600, letterSpacing: '0.5px' }}>{idx.name}</span>
          <span style={{ color: '#fff', fontSize: isMobile ? '12px' : '13px', fontWeight: 700 }}>{idx.value}</span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            color: idx.up ? '#10b981' : '#ef4444',
            fontSize: isMobile ? '11px' : '12px',
            fontWeight: 600,
          }}>
            {idx.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {idx.change}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
