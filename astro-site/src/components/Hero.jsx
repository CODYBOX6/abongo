export default function Hero() {
  return (
    <section className="hero-image h-screen flex items-center justify-center text-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Agir pour un Cameroun meilleur</h1>
        <p className="mb-8 text-lg max-w-2xl mx-auto">AbongoFrance-Camer oeuvre pour l'education et la sante des enfants au Cameroun. Chaque don compte.</p>
        <a href="#donate" className="bg-primary hover:bg-secondary text-white py-3 px-6 rounded-lg transition">Faire un don</a>
      </div>
    </section>
  );
}
