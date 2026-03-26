import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { stockHistory, stockPrices } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

const symbols = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'TSLA'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 14px' }}>
        <p style={{ color: '#00f5d4', fontWeight: 700, fontSize: '14px' }}>${payload[0].value.toFixed(2)}</p>
        <p style={{ color: '#718096', fontSize: '12px' }}>{payload[0].payload.date}</p>
      </div>
    );
  }
  return null;
};

export default function StockChart() {
  const [active, setActive] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const info = stockPrices[active];
  const data = stockHistory[active];
  const isUp = info.changePct >= 0;

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <motion.div className="glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
      {/* Loading bar */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading-bar"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: 0, left: 0,
              height: '2px', background: '#00f5d4', zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      {/* Symbol tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {symbols.map((s) => (
          <motion.button
            key={s}
            onClick={() => setActive(s)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              border: active === s ? '1px solid #00f5d4' : '1px solid rgba(255,255,255,0.1)',
              background: active === s ? '#00f5d420' : 'transparent',
              color: active === s ? '#00f5d4' : '#718096',
            }}
          >{s}</motion.button>
        ))}
      </div>

      {/* Price header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <div>
          <div style={{ color: '#718096', fontSize: '13px', marginBottom: '4px' }}>{active} · 30D Chart</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '32px', fontWeight: 800, color: '#fff', fontFamily: 'monospace' }}
            >
              ${info.price.toFixed(2)}
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 14px', borderRadius: '10px',
          background: isUp ? '#10b98115' : '#ef444415',
          border: `1px solid ${isUp ? '#10b98130' : '#ef444430'}`,
          color: isUp ? '#10b981' : '#ef4444', fontWeight: 700, fontSize: '14px',
        }}>
          {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {isUp ? '+' : ''}{info.changePct}%
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0.25} />
              <stop offset="95%" stopColor={isUp ? '#10b981' : '#ef4444'} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
          <YAxis tick={{ fill: '#4a5568', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} width={60} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="price" stroke={isUp ? '#10b981' : '#ef4444'} strokeWidth={2} fill="url(#grad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
