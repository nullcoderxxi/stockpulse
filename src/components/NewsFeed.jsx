import { motion } from 'framer-motion';
import { news } from '../data/mockData';
import { Newspaper } from 'lucide-react';

export default function NewsFeed() {
  return (
    <motion.div className="glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <Newspaper size={16} color="#00f5d4" />
        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>Market News</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {news.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            style={{
              borderBottom: i < news.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              paddingBottom: i < news.length - 1 ? '16px' : '0',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700,
                background: n.tag === 'MACRO' ? '#81cf8820' : '#00f5d420',
                color: n.tag === 'MACRO' ? '#10b981' : '#00f5d4',
                border: `1px solid ${n.tag === 'MACRO' ? '#10b98130' : '#00f5d430'}`,
              }}>{n.tag}</span>
              <span style={{
                padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                background: n.sentiment === 'positive' ? '#10b98115' : '#ef444415',
                color: n.sentiment === 'positive' ? '#10b981' : '#ef4444',
              }}>{n.sentiment}</span>
            </div>
            <p style={{ color: '#e2e8f0', fontSize: '13px', lineHeight: 1.5, marginBottom: '4px' }}>{n.title}</p>
            <span style={{ color: '#4a5568', fontSize: '11px' }}>{n.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
