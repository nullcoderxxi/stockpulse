export const portfolio = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, avgPrice: 178.5, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', shares: 10, avgPrice: 375.2, sector: 'Technology' },
  { symbol: 'NVDA', name: 'NVIDIA', shares: 8, avgPrice: 620.0, sector: 'Semiconductors' },
  { symbol: 'GOOGL', name: 'Alphabet', shares: 5, avgPrice: 140.3, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon', shares: 12, avgPrice: 182.4, sector: 'E-Commerce' },
  { symbol: 'TSLA', name: 'Tesla', shares: 20, avgPrice: 242.0, sector: 'Automotive' },
];

export const stockPrices = {
  AAPL: { price: 213.32, change: 2.14, changePct: 1.01 },
  MSFT: { price: 415.60, change: 5.30, changePct: 1.29 },
  NVDA: { price: 875.40, change: -12.50, changePct: -1.41 },
  GOOGL: { price: 176.75, change: 3.20, changePct: 1.85 },
  AMZN: { price: 196.20, change: 1.80, changePct: 0.93 },
  TSLA: { price: 177.50, change: -8.40, changePct: -4.52 },
};

function generateHistory(base, days = 30, volatility = 0.02) {
  const data = [];
  let price = base * 0.88;
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    price = price * (1 + (Math.random() - 0.48) * volatility);
    data.push({
      date: date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 80000000 + 20000000),
    });
  }
  return data;
}

export const stockHistory = {
  AAPL: generateHistory(213.32, 30, 0.022),
  MSFT: generateHistory(415.60, 30, 0.018),
  NVDA: generateHistory(875.40, 30, 0.035),
  GOOGL: generateHistory(176.75, 30, 0.020),
  AMZN: generateHistory(196.20, 30, 0.024),
  TSLA: generateHistory(177.50, 30, 0.045),
};

export const marketIndices = [
  { name: 'S&P 500', value: '5,248.32', change: '+0.74%', up: true },
  { name: 'NASDAQ', value: '16,742.10', change: '+1.12%', up: true },
  { name: 'DOW JONES', value: '39,118.86', change: '-0.22%', up: false },
  { name: 'RUSSELL 2000', value: '2,067.44', change: '+0.38%', up: true },
];

export const news = [
  { title: 'Apple announces record-breaking Q2 earnings, beats analyst estimates', time: '2h ago', tag: 'AAPL', sentiment: 'positive' },
  { title: 'NVIDIA stock dips after short-seller report raises valuation concerns', time: '4h ago', tag: 'NVDA', sentiment: 'negative' },
  { title: 'Microsoft Azure cloud revenue surges 31% YoY, driven by AI adoption', time: '6h ago', tag: 'MSFT', sentiment: 'positive' },
  { title: 'Tesla misses delivery targets for third consecutive quarter', time: '8h ago', tag: 'TSLA', sentiment: 'negative' },
  { title: 'Fed signals potential rate cuts in H2 2024 amid cooling inflation', time: '10h ago', tag: 'MACRO', sentiment: 'positive' },
  { title: 'Amazon Web Services launches new AI-powered developer tools', time: '12h ago', tag: 'AMZN', sentiment: 'positive' },
];

export const sectorAllocation = [
  { name: 'Technology', value: 58, color: '#00f5d4' },
  { name: 'Semiconductors', value: 20, color: '#818cf8' },
  { name: 'E-Commerce', value: 13, color: '#06b6d4' },
  { name: 'Automotive', value: 9, color: '#f59e0b' },
];
