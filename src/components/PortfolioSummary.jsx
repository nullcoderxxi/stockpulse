import { motion } from 'framer-motion';
import { portfolio, stockPrices } from '../data/mockData';
import { TrendingUp, DollarSign, BarChart2, Percent } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';

export default function PortfolioSummary() {
  const { isMobile } = useWindowSize();

  const totalValue = portfolio.reduce((sum, s) => sum + stockPrices[s.symbol].price * s.shares, 0);
  const totalCost = portfolio.reduce((sum, s) => sum + s.avgPrice * s.shares, 0);
  const totalGain = totalValue - totalCost;
  const gainPct = ((totalGain / totalCost) * 100).toFixed(2);
  const dayGain = portfolio.reduce((sum, s) => sum + stockPrices[s.symbol].change * s.shares, 0);

  const cards = [
    { label: 'Portfolio Value', value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign, color: '#00f5d4', sub: 'Total holdings' },
    { label: "Today's Gain", value: `${dayGain >= 0 ? '+' : ''}$${dayGain.toFixed(2)}`, icon: TrendingUp, color: dayGain >= 0 ? '#10b981' : '#ef4444', sub: `${dayGain >= 0 ? '+' : ''}${((dayGain / totalValue) * 100).toFixed(2)}% today` },
    { label: 'Total Return', value: `${totalGain >= 0 ? '+' : ''}$${totalGain.toFixed(2)}`, icon: BarChart2, color: totalGain >= 0 ? '#10b981' : '#ef4444', sub: `${gainPct}% all time` },
    { label: 'Positions', value: portfolio.length, icon: Percent, color: '#818cf8', sub: 'Active holdings' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: isMobile ? '12px' : '16px',
    }}>
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
          className="glass"
          style={{ padding: isMobile ? '16px' : '20px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{
              color: '#718096', fontSize: isMobile ? '10px' : '12px',
              fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>{c.label}</span>
            <div style={{
              width: '28px', height: '28px', borderRadius: '8px',
              background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <c.icon size={14} color={c.color} />
            </div>
          </div>
          <div style={{
            fontSize: isMobile ? '17px' : '22px',
            fontWeight: 800, color: c.color, marginBottom: '4px', fontFamily: 'monospace',
          }}>{c.value}</div>
          <div style={{ color: '#4a5568', fontSize: '12px' }}>{c.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}
