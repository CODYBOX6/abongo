export default function Mission() {
  return (
    <section className="py-20 bg-accent text-center text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
        <p className="max-w-2xl mx-auto mb-8">
          AbongoFrance-Camer agit pour l'éducation et la santé des enfants
          au Cameroun, avec une équipe 100% bénévole.
        </p>
        <ul className="list-disc text-left max-w-xl mx-auto space-y-3">
          <li>Favoriser l'accès à l'éducation pour les enfants défavorisés</li>
          <li>Améliorer les conditions sanitaires dans les villages</li>
          <li>Accompagner les familles vers plus d'autonomie</li>
        </ul>
      </div>
    </section>
  );
}
