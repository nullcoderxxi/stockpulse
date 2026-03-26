import { marketIndices } from '../data/mockData';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketBar() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '10px 24px',
      display: 'flex', gap: '32px', overflowX: 'auto',
    }}>
      {marketIndices.map((idx) => (
        <div key={idx.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ color: '#718096', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>{idx.name}</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: 700 }}>{idx.value}</span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            color: idx.up ? '#10b981' : '#ef4444', fontSize: '12px', fontWeight: 600,
          }}>
            {idx.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {idx.change}
          </span>
        </div>
      ))}
    </div>
  );
}
