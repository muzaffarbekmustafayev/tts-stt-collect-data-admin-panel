const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: number, icon: React.ElementType, color: string }) => (
  <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <Icon size={32} className="text-gray-400" />
    </div>
  </div>
);

export default StatCard;