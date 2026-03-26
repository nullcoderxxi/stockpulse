import { motion } from 'framer-motion';
import { portfolio, stockPrices } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function Holdings() {
  const { isMobile } = useWindowSize();

  // Mobile: hide "Shares" column → 2fr 1fr 1fr 1fr (Stock, Price, Change, Value)
  // Desktop: full 5-column → 2fr 1fr 1fr 1fr 1fr
  const gridCols = isMobile ? '2fr 1fr 1fr 1fr' : '2fr 1fr 1fr 1fr 1fr';

  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: isMobile ? '16px' : '24px' }}
    >
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Holdings</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          gap: '8px',
          padding: '8px 12px',
          color: '#4a5568',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          <span>Stock</span>
          <span style={{ textAlign: 'right' }}>Price</span>
          <span style={{ textAlign: 'right' }}>Change</span>
          {!isMobile && <span style={{ textAlign: 'right' }}>Shares</span>}
          <span style={{ textAlign: 'right' }}>Value</span>
        </div>

        {portfolio.map((s, i) => {
          const info = stockPrices[s.symbol];
          const value = info.price * s.shares;
          const isUp = info.changePct >= 0;
          const pnl = (info.price - s.avgPrice) * s.shares;
          return (
            <motion.div
              key={s.symbol}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 25 }}
              style={{
                display: 'grid',
                gridTemplateColumns: gridCols,
                gap: '8px',
                padding: isMobile ? '10px' : '12px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background 0.2s',
                background: 'rgba(255,255,255,0.02)',
              }}
              whileHover={{ background: 'rgba(0,245,212,0.04)' }}
            >
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: isMobile ? '13px' : '14px' }}>{s.symbol}</div>
                <div style={{ color: '#4a5568', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
              </div>

              <div style={{
                textAlign: 'right', color: '#fff', fontWeight: 600,
                fontSize: isMobile ? '13px' : '14px', fontFamily: 'monospace',
              }}>
                ${info.price.toFixed(2)}
              </div>

              <div style={{
                textAlign: 'right', display: 'flex', alignItems: 'center',
                justifyContent: 'flex-end', gap: '3px',
                color: isUp ? '#10b981' : '#ef4444',
                fontSize: '13px', fontWeight: 600,
              }}>
                {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {isUp ? '+' : ''}{info.changePct}%
              </div>

              {!isMobile && (
                <div style={{ textAlign: 'right', color: '#a0aec0', fontSize: '13px' }}>{s.shares}</div>
              )}

              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '13px', fontFamily: 'monospace' }}>
                  ${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div style={{ color: pnl >= 0 ? '#10b981' : '#ef4444', fontSize: '11px' }}>
                  {pnl >= 0 ? '+' : ''}${pnl.toFixed(0)}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
