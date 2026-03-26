import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { sectorAllocation } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1a1f35', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px' }}>
        <p style={{ color: payload[0].payload.color, fontWeight: 700, fontSize: '13px' }}>{payload[0].name}</p>
        <p style={{ color: '#fff', fontSize: '12px' }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function SectorChart() {
  return (
    <motion.div className="glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} style={{ padding: '24px' }}>
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Sector Allocation</h3>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={sectorAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
            {sectorAllocation.map((s) => <Cell key={s.name} fill={s.color} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
        {sectorAllocation.map((s) => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color }} />
              <span style={{ color: '#a0aec0', fontSize: '13px' }}>{s.name}</span>
            </div>
            <span style={{ color: s.color, fontWeight: 700, fontSize: '13px', fontFamily: 'monospace' }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
