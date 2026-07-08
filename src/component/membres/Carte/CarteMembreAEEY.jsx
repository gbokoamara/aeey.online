import { useEffect } from "react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useCard } from "../../../hooks/useCard";
import { logData } from "../../../utils/console";

export default function CarteMembreAEEY() {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const { card, loading, getRequestCard, userId } = useCard();
  // logData("card", card)
  useEffect(() => {
    if (userId) getRequestCard(userId);
  }, [userId]);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `carte-aeey-${card?.code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const renderMemberInfo = () => {
    switch (card?.memberType) {
      case "ELEVE":
      case "ETUDIANT":
        return (
          <>
            <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40">Établissement</p>
            <p className="text-[0.5rem] text-white/70 font-light">{card.organisation}</p>
            <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40 mt-1">Niveau · Filière</p>
            <p className="text-[0.5rem] text-white/70 font-light">{card.classe} · {card.detail}</p>
            {card.matricule && (
              <>
                <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40 mt-1">Matricule</p>
                <p className="text-[0.5rem] text-cyan-400 font-mono">{card.matricule}</p>
              </>
            )}
          </>
        );

      case "PROFESSIONNEL":
        return (
          <>
            <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40">Entreprise</p>
            <p className="text-[0.5rem] text-white/70 font-light">{card.organisation}</p>
            <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40 mt-1">Occupation</p>
            <p className="text-[0.5rem] text-white/70 font-light">{card.classe}</p>
          </>
        );

      default:
        return card?.organisation ? (
          <>
            <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40">Section</p>
            <p className="text-[0.5rem] text-white/70 font-light">{card.organisation}</p>
          </>
        ) : null;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full rounded-2xl bg-[#0d1b35] flex items-center justify-center">
        <p className="text-white/40 text-xs animate-pulse">Chargement de la carte...</p>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="w-full h-full rounded-2xl bg-[#0d1b35] flex items-center justify-center">
        <p className="text-white/40 text-xs">Aucune carte trouvée</p>
      </div>
    );
  }

  if (card.status !== "VALIDEE") {
    return (
      <div className="w-full h-full rounded-2xl bg-[#0d1b35] flex flex-col items-center justify-center gap-2">
        <p className="text-white/40 text-xs">Carte en attente de validation</p>
        <span className="text-[0.5rem] px-2 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
          {card.status}
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
      onClick={handleDownload}
    >
      {/* Overlay download */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 z-10 flex items-center justify-center rounded-2xl">
        <span className="opacity-0 group-hover:opacity-100 transition text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {downloading ? "Génération…" : "⬇ Télécharger la carte"}
        </span>
      </div>

      {/* Carte */}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-2xl overflow-hidden text-white font-sans bg-linear-to-br from-[#1b2a4a] via-[#0d1b35] to-[#0a2540]"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-cyan-500 to-emerald-500" />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.25)_0%,transparent_70%)]" />
        <div className="absolute top-22.5 inset-x-0 bottom-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-position-[12px_12px]" />

        {/* Badge poste */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-[0.5rem] tracking-widest uppercase font-mono text-red-400">
          {card.poste || "Membre Actif"}
        </div>

        {/* Photo */}
        <div className="absolute top-4 left-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.2)]">
          <img
            src={card.photo || "/default-avatar.png"}
            alt="photo"
            className="w-full h-full object-cover object-top"
            crossOrigin="anonymous"
          />
        </div>

        {/* Identité + infos dynamiques */}
        <div className="absolute top-4 left-22.5 right-3">
          <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40">Nom</p>
          <p className="text-[0.95rem] font-bold leading-tight font-serif">{card.nom}</p>
          <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40 mt-1">Prénoms</p>
          <p className="text-[0.55rem] text-white/70 font-light mb-2">{card.prenoms}</p>
          {renderMemberInfo()}
        </div>

        {/* Nom asso */}
        <div className="absolute bottom-16 left-4">
          <div className="text-[0.5rem] text-white/40 font-medium leading-snug flex gap-1">
            <p className="text-orange-800">A.E.E.Y</p> — Association des Élèves et Étudiants de Yaokro
          </div>
        </div>

        {/* Date */}
        <div className="absolute top-22 md:top-32 right-4">
          <p className="text-[0.55rem] text-white/70 font-light">{card.date}</p>
        </div>

        <div className="absolute bottom-11 left-4 right-4 h-px bg-linear-to-r from-emerald-400/40 to-transparent" />

        {/* Footer */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center">
          <span className="text-[0.42rem] text-white/40 uppercase tracking-[0.15em] font-mono">
            ✦ {card.poste || "Membre Actif"} · {new Date(card.demandeDate).getFullYear()}
          </span>
          <div className="flex flex-col items-end">
            <span className="text-[0.38rem] text-white/30 uppercase tracking-wider">Code Unique</span>
            <span className="text-[0.55rem] text-cyan-400 font-mono tracking-wider">{card.code}</span>
          </div>
        </div>
      </div>
    </div>
  );
}