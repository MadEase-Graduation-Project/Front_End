const NurseStatCard = ({ title, value, percentage }) => (
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <div className="flex items-center justify-between mt-2">
      <span className="text-xl font-bold">{value}</span>
      <span className="text-green-600 text-sm">+{percentage}%</span>
    </div>
  </div>
);

export default NurseStatCard;
