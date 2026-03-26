import './index.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import MarketBar from './components/MarketBar';
import PortfolioSummary from './components/PortfolioSummary';
import StockChart from './components/StockChart';
import Holdings from './components/Holdings';
import SectorChart from './components/SectorChart';
import NewsFeed from './components/NewsFeed';

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh' }}>
      <Navbar />
      <MarketBar />

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px' }}>
        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '4px' }}>Portfolio Dashboard</h1>
            <p style={{ color: '#4a5568', fontSize: '13px' }}>Last updated: {time.toLocaleTimeString()}</p>
          </div>
          <button style={{
            padding: '9px 20px', background: 'linear-gradient(135deg, #00f5d4, #06b6d4)',
            border: 'none', borderRadius: '8px', color: '#0a0e1a',
            fontWeight: 700, fontSize: '13px', cursor: 'pointer',
          }}>+ Add Position</button>
        </div>

        {/* Summary cards */}
        <div style={{ marginBottom: '24px' }}>
          <PortfolioSummary />
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
            <StockChart />
            <Holdings />
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <SectorChart />
            <NewsFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
