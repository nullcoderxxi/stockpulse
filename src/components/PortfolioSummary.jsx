import { motion } from 'framer-motion';
import { portfolio, stockPrices } from '../data/mockData';
import { TrendingUp, DollarSign, BarChart2, Percent } from 'lucide-react';
import useWindowSize from '../hooks/useWindowSize';
import useCountUp from '../hooks/useCountUp';

function PortfolioCard({ c, i, isMobile }) {
  const animPortfolioValue = useCountUp(c.rawPortfolioValue ?? 0, 1400, 2);
  const animDayGain = useCountUp(c.rawDayGain ?? 0, 1200, 2);
  const animTotalGain = useCountUp(c.rawTotalGain ?? 0, 1200, 2);
  const animPositions = useCountUp(c.rawPositions ?? 0, 800, 0);

  let displayValue = c.value;
  if (c.label === 'Portfolio Value') {
    displayValue = `$${animPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else if (c.label === "Today's Gain") {
    displayValue = `${c.sign}$${animDayGain.toFixed(2)}`;
  } else if (c.label === 'Total Return') {
    displayValue = `${c.sign}$${animTotalGain.toFixed(2)}`;
  } else if (c.label === 'Positions') {
    displayValue = animPositions;
  }

  return (
    <motion.div
      key={c.label}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.35 }}
      whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.4)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
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
      }}>{displayValue}</div>
      <div style={{ color: '#4a5568', fontSize: '12px' }}>{c.sub}</div>
    </motion.div>
  );
}

export default function PortfolioSummary() {
  const { isMobile } = useWindowSize();

  const totalValue = portfolio.reduce((sum, s) => sum + stockPrices[s.symbol].price * s.shares, 0);
  const totalCost = portfolio.reduce((sum, s) => sum + s.avgPrice * s.shares, 0);
  const totalGain = totalValue - totalCost;
  const gainPct = ((totalGain / totalCost) * 100).toFixed(2);
  const dayGain = portfolio.reduce((sum, s) => sum + stockPrices[s.symbol].change * s.shares, 0);

  const cards = [
    {
      label: 'Portfolio Value', icon: DollarSign, color: '#00f5d4', sub: 'Total holdings',
      rawPortfolioValue: totalValue,
      value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      label: "Today's Gain", icon: TrendingUp, color: dayGain >= 0 ? '#10b981' : '#ef4444',
      sub: `${dayGain >= 0 ? '+' : ''}${((dayGain / totalValue) * 100).toFixed(2)}% today`,
      rawDayGain: Math.abs(dayGain), sign: dayGain >= 0 ? '+' : '-',
      value: `${dayGain >= 0 ? '+' : ''}$${dayGain.toFixed(2)}`,
    },
    {
      label: 'Total Return', icon: BarChart2, color: totalGain >= 0 ? '#10b981' : '#ef4444',
      sub: `${gainPct}% all time`,
      rawTotalGain: Math.abs(totalGain), sign: totalGain >= 0 ? '+' : '-',
      value: `${totalGain >= 0 ? '+' : ''}$${totalGain.toFixed(2)}`,
    },
    {
      label: 'Positions', icon: Percent, color: '#818cf8', sub: 'Active holdings',
      rawPositions: portfolio.length, value: portfolio.length,
    },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: isMobile ? '12px' : '16px',
    }}>
      {cards.map((c, i) => (
        <PortfolioCard key={c.label} c={c} i={i} isMobile={isMobile} />
      ))}
    </div>
  );
}
