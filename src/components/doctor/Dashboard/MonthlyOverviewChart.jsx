import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', Consultation: 500, MedicalCheckup: 1001 },
  { name: 'Feb', Consultation: 434, MedicalCheckup: 868 },
  { name: 'Mar', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Apr', Consultation: 0, MedicalCheckup: 0 },
  { name: 'May', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Jun', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Jul', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Aug', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Sep', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Oct', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Nov', Consultation: 0, MedicalCheckup: 0 },
  { name: 'Dec', Consultation: 0, MedicalCheckup: 0 },
];

const MonthlyOverviewChart = () => {
  return (
    <div className='col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-7 rounded-lg border-1 border-gray-200 shadow-sm bg-white pt-5 h-[400px]'>
      <div className='flex items-center justify-center'>
        <h2 className="text-lg md:text-xl font-semibold">Appointments Monthly Overview</h2>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
          <XAxis dataKey="name" stroke="#37568d" />
          <YAxis stroke="#37568d" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Consultation" fill="#007eb1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="MedicalCheckup" fill="#00a5ba" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>  
  );
};

export default MonthlyOverviewChart;
