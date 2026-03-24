export default function Home() {
  return (
    <main className="page">
      <section className="card">
        <span className="badge">Next.js + Vercel</span>
        <h1>Application prête à versionner et déployer</h1>
        <p>
          Cette base Next.js utilise l&apos;App Router et peut être poussée sur GitHub,
          puis importée sur Vercel sans configuration particulière.
        </p>
        <div className="actions">
          <a href="https://github.com" target="_blank" rel="noreferrer">
            Créer le repo GitHub
          </a>
          <a href="https://vercel.com/new" target="_blank" rel="noreferrer">
            Déployer sur Vercel
          </a>
        </div>
      </section>
    </main>
  );
}
