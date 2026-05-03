

// "use client";
// // ─────────────────────────────────────────────────────────────
// //  CarteMembreAEEY.jsx
// //  Dépendances : npm install html2canvas
// //  Usage       : <CarteMembreAEEY />
// // ─────────────────────────────────────────────────────────────

// import { useRef, useState } from "react";
// import html2canvas from "html2canvas";

// // ── Remplace cette URL par le chemin réel de la photo ─────────
// const PHOTO_URL = "/pere.png"; // ← ton image existante comme fallback
// // Si tu veux utiliser une vraie photo du président, mets son URL ici
// // const PHOTO_URL = "/images/amara-gboko.jpg";

// // ── Code unique généré une seule fois par montage ─────────────
// function generateCode() {
//   const num = Math.floor(Math.random() * 9000 + 1000);
//   const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
//   return `AEEY-${num}-${suffix}`;
// }

// export default function CarteMembreAEEY() {
//   const cardRef = useRef(null);
//   const [downloading, setDownloading] = useState(false);
//   const [code] = useState(generateCode);

//   const handleDownload = async () => {
//     if (!cardRef.current) return;
//     setDownloading(true);
//     try {
//       const canvas = await html2canvas(cardRef.current, {
//         scale: 3,           // haute résolution
//         useCORS: true,
//         backgroundColor: null,
//         logging: false,
//       });
//       const link = document.createElement("a");
//       link.download = `carte-president-aeey-${code}.png`;
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     } catch (err) {
//       console.error("Erreur génération image:", err);
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <>
//       {/* ── Google Fonts ── */}
//       <link
//         href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@700&display=swap"
//         rel="stylesheet"
//       />

//       {/* ══════════════════════════════════════════════════════
//           Zone cliquable — reprend exactement ton className
//           ══════════════════════════════════════════════════════ */}
//       <div
//         className="bg-blue-400 w-full h-full rounded-2xl  overflow-hidden cursor-pointer group"
//         onClick={handleDownload}
//         title="Cliquer pour télécharger la carte"
//       >
//         {/* Overlay au survol */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10 flex items-center justify-center rounded-2xl">
//           <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
//             {downloading ? "Génération…" : "⬇ Télécharger la carte"}
//           </span>
//         </div>

//         {/* ── CARTE (rendue dans la div, capturée par html2canvas) ── */}
//         <div
//           ref={cardRef}
//           style={{
//             width: "100%",
//             height: "100%",
//             position: "relative",
//             overflow: "hidden",
//             background: "linear-gradient(135deg, #1b2a4a 0%, #0d1b35 60%, #0a2540 100%)",
//             fontFamily: "'DM Sans', sans-serif",
//             borderRadius: "16px",
//           }}
//         >
//           {/* Bande animée haut */}
//           <div
//             style={{
//               position: "absolute",
//               top: 0, left: 0, right: 0,
//               height: "4px",
//               background: "linear-gradient(90deg, #10b981, #06b6d4, #10b981)",
//             }}
//           />

//           {/* Halo vert haut-droite */}
//           <div style={{
//             position: "absolute", top: "-40px", right: "-40px",
//             width: "160px", height: "160px", borderRadius: "50%",
//             background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)",
//           }} />

//           {/* Points décoratifs */}
//           <div style={{
//             position: "absolute", top: "90px", left: 0, right: 0, bottom: 0,
//             backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
//             backgroundSize: "12px 12px",
//           }} />

//           {/* Badge PRÉSIDENT */}
//           <div style={{
//             position: "absolute", top: "12px", right: "12px",
//             background: "rgba(16,185,129,0.15)",
//             border: "1px solid rgba(16,185,129,0.4)",
//             borderRadius: "20px",
//             padding: "3px 9px",
//             fontSize: "0.5rem",
//             fontFamily: "'Space Mono', monospace",
//             color: "#10b981",
//             letterSpacing: "0.1em",
//             textTransform: "uppercase",
//           }}>
//             PRÉSIDENT
//           </div>

//           {/* Photo */}
//           <div style={{
//             position: "absolute", top: "16px", left: "14px",
//             width: "64px", height: "64px",
//             borderRadius: "10px",
//             overflow: "hidden",
//             border: "2px solid rgba(16,185,129,0.5)",
//             boxShadow: "0 0 16px rgba(16,185,129,0.2)",
//           }}>
//             <img
//               src={PHOTO_URL}
//               alt="Photo président"
//               style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
//               crossOrigin="anonymous"
//             />
//           </div>

//           {/* Infos texte */}
//           <div style={{ position: "absolute", top: "16px", left: "90px", right: "12px" }}>
//             <p style={{ fontSize: "0.38rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "1px" }}>Nom</p>
//             <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: "#fff", fontWeight: 700, lineHeight: 1.15, marginBottom: "4px" }}>AMARA</p>
//             <p style={{ fontSize: "0.38rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "1px" }}>Prénoms</p>
//             <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.65)", fontWeight: 300, marginBottom: "6px" }}>GBOKO ANZOUMANAN</p>
//             <p style={{ fontSize: "0.38rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)", marginBottom: "1px" }}>Organisation</p>
//             <p style={{ fontSize: "0.5rem", color: "#10b981", fontWeight: 500, lineHeight: 1.4 }}>
//               A.E.E.Y — Association des Élèves<br />et Étudiants de Yaokro
//             </p>
//           </div>

//           {/* Séparateur */}
//           <div style={{
//             position: "absolute", bottom: "44px", left: "14px", right: "14px",
//             height: "1px",
//             background: "linear-gradient(90deg, rgba(16,185,129,0.4), transparent)",
//           }} />

//           {/* Bas de carte */}
//           <div style={{
//             position: "absolute", bottom: "10px", left: "14px", right: "14px",
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//           }}>
//             <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.42rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
//               ✦ Président Actif · 2025
//             </span>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
//               <span style={{ fontSize: "0.38rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Code Unique</span>
//               <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.55rem", color: "#06b6d4", letterSpacing: "0.1em" }}>{code}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import { useRef, useState } from "react";
import html2canvas from "html2canvas";

const PHOTO_URL = "/pere.png";

function generateCode() {
  const num = Math.floor(Math.random() * 9000 + 1000);
  const suffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `AEEY-${num}-${suffix}`;
}

export default function CarteMembreAEEY({
  nom = "AMARA",
  prenoms = "GBOKO ANZOUMANAN",
  photo = "/pere.png",
  date,
}) {
  const cardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [code] = useState(generateCode);

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
      link.download = `carte-president-aeey-${code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="relative bg-blue-400 w-full h-full rounded-2xl overflow-hidden cursor-pointer group"
      onClick={handleDownload}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 z-10 flex items-center justify-center rounded-2xl">
        <span className="opacity-0 group-hover:opacity-100 transition text-white text-xs font-semibold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {downloading ? "Génération…" : "⬇ Télécharger la carte"}
        </span>
      </div>

      {/* Carte */}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-2xl overflow-hidden text-white font-sans
        bg-linear-to-br from-[#1b2a4a] via-[#0d1b35] to-[#0a2540]"
      >
        {/* Bande haut */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-cyan-500 to-emerald-500" />

        {/* Halo */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.25)_0%,transparent_70%)]" />

        {/* Dots */}
        <div className="absolute top-22.5 inset-x-0 bottom-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-position-[12px_12px]" />

        {/* Badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 text-[0.5rem] tracking-widest uppercase font-mono text-red-400">
          PRÉSIDENT
        </div>

        {/* Photo */}
        <div className="absolute top-4 left-4 w-16 h-16 rounded-lg overflow-hidden border-2 border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.2)]">
          <img
            src={photo}
            alt="photo"
            className="w-full h-full object-cover object-top"
            crossOrigin="anonymous"
          />
        </div>

        {/* Infos */}
        <div className="absolute top-4 left-22.5 right-3">
          <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40">
            Nom
          </p>
          <p className="text-[0.95rem] font-bold leading-tight font-serif">
            {nom}
          </p>

          <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40 mt-1">
            Prénoms
          </p>
          <p className="text-[0.55rem] text-white/70 font-light mb-2">
            {prenoms}
          </p>

          <p className="text-[0.38rem] uppercase tracking-[0.15em] text-white/40">
            Organisation
          </p>
          
        </div>

        <div className="absolute top-22 md:top-32 left-4">
            <div className="text-[0.5rem] text-white/40 font-medium leading-snug flex gap-1">
           <p className="text-orange-800"> A.E.E.Y</p> — Association des Élèves
            et Étudiants de Yaokro
            </div>
        </div>
        <div className="absolute top-22 md:top-32 right-4">
            <div className="text-[0.55rem] text-white/70 font-light mb-2">
           {date}
            </div>
        </div>
        {/* Separator */}
        <div className="absolute bottom-11 left-4 right-4 h-px bg-linear-to-r from-emerald-400/40 to-transparent" />

        {/* Footer */}
        <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center">
          <span className="text-[0.42rem] text-white/40 uppercase tracking-[0.15em] font-mono">
            ✦ Président Actif · 2025
          </span>

          <div className="flex flex-col items-end">
            <span className="text-[0.38rem] text-white/30 uppercase tracking-wider">
              Code Unique
            </span>
            <span className="text-[0.55rem] text-cyan-400 font-mono tracking-wider">
              {code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

