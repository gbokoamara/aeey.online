import BackButton from "../utils/backButton";

export const ProjectPage = () => {
  return (
    <>
    <BackButton className="top-5 left-0 text-white"  title={"Page d'accueil"} show={true} /> 
    <div className=" bg-slate-50 text-slate-800 mt-12 md:mt-7">

      {/* HERO */}
      <section className="bg-linear-to-br from-indigo-700 to-indigo-900 text-white">
        <div className="max-w-5xl mx-auto px-5 py-16 text-center">

          <span className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 text-sm">
            Projet en développement
          </span>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Idée de rassemblement des jeunes de Yaokro
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-indigo-100 text-lg">
            Rassembler les jeunes autour de projets concrets pour apprendre,
            créer, investir, entreprendre et contribuer au développement
            de notre communauté.
          </p>

        </div>
      </section>

      {/* OBJECTIF */}
      <section className="max-w-5xl mx-auto px-5 py-12">

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            🎯 Notre objectif
          </h2>

          <p className="text-slate-600 leading-relaxed">
            L'objectif est de créer une dynamique qui permet aux jeunes
            de participer à des projets concrets, plutôt que de se limiter
            aux réunions, conférences ou cotisations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[
              "Apprendre",
              "Participer",
              "Créer un projet",
              "Investir",
              "Gagner de l'argent",
              "Rencontrer d'autres jeunes",
            ].map((item) => (
              <div
                key={item}
                className="bg-slate-50 rounded-xl p-4 text-center font-medium"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* PROJETS */}
      <section className="max-w-5xl mx-auto px-5 pb-12">

        <h2 className="text-2xl font-bold mb-6">
          🚀 Les premières idées
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          {/* AGRICULTURE */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="text-4xl mb-4">🌱</div>

            <h3 className="text-xl font-bold mb-3">
              Jeune & Agriculture
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              Créer des projets agricoles collectifs, former les jeunes,
              utiliser le numérique pour suivre les cultures et vendre
              collectivement les récoltes.
            </p>
          </div>

          {/* NUMERIQUE */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="text-4xl mb-4">💻</div>

            <h3 className="text-xl font-bold mb-3">
              Numérique & Entrepreneuriat
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              Apprendre des compétences utiles : création de contenu,
              commerce en ligne, IA, marketing digital et création
              de services numériques.
            </p>
          </div>

          {/* PROJET */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="text-4xl mb-4">🚀</div>

            <h3 className="text-xl font-bold mb-3">
              1 Jeune = 1 Projet
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed">
              Permettre à chaque jeune ayant une idée de la présenter,
              de la structurer et éventuellement de rechercher un
              financement pour la réaliser.
            </p>
          </div>

        </div>

      </section>

      {/* SYSTEME */}
      <section className="bg-white border-y">
        <div className="max-w-5xl mx-auto px-5 py-12">

          <h2 className="text-2xl font-bold text-center mb-3">
            💰 Comment fonctionne l'idée ?
          </h2>

          <p className="text-center text-slate-500 mb-8">
            Faire travailler l'argent à travers des projets concrets.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 text-center">

            {[
              "JEUNES",
              "INVESTISSEMENT",
              "PROJET",
              "BÉNÉFICE",
              "REMBOURSEMENT",
              "FONDS DE ROULEMENT",
              "NOUVEAUX PROJETS",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3">

                <div className="px-5 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
                  {item}
                </div>

                {index < 6 && (
                  <span className="text-slate-400 font-bold">
                    →
                  </span>
                )}

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* VISION */}
      <section className="max-w-5xl mx-auto px-5 py-12">

        <div className="bg-indigo-50 rounded-2xl p-6 md:p-10">

          <h2 className="text-2xl font-bold mb-4">
            🌍 Notre vision à long terme
          </h2>

          <p className="text-slate-600 leading-relaxed mb-6">
            L'objectif est de passer progressivement d'un système basé
            principalement sur les cotisations à un système basé sur
            l'investissement, les projets, les bénéfices et le
            réinvestissement.
          </p>

          <div className="text-center font-bold text-indigo-700 text-lg">
            Investissement → Projet → Bénéfice → Réinvestissement
            → Nouveaux projets
          </div>

        </div>

      </section>

      {/* DEVELOPPEMENT PROGRESSIF */}
      <section className="max-w-5xl mx-auto px-5 pb-16">

        <div className="bg-white border rounded-2xl p-6 md:p-8 text-center">

          <div className="text-4xl mb-4">🛠️</div>

          <h2 className="text-2xl font-bold mb-4">
            Un projet qui va évoluer progressivement
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed">
            Cette présentation constitue une première base de réflexion.
            Le projet sera développé progressivement, en fonction des
            idées, des besoins et des propositions des jeunes.
          </p>

          <p className="mt-5 font-semibold text-indigo-700">
            L'objectif est de construire le projet ensemble.
          </p>

        </div>

      </section>

    </div>
    </>
  );
};