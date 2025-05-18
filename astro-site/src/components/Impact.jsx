export default function Impact() {
  const stats = [
    { label: 'Enfants parrainés', value: '120+' },
    { label: 'Écoles équipées', value: '8' },
    { label: 'Volontaires', value: '25' }
  ];
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">Notre impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 bg-white rounded shadow">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
