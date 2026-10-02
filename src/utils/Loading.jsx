/**
 * Loading — écran/indicateur de chargement AEEY.
 *
 * Place le fichier logo-aeey.png (fourni à côté) dans votre dossier /public
 * (ou /src/assets, en adaptant l'import) puis passez son chemin via la prop
 * `logoSrc` si besoin.
 *
 * Usage :
 *   <Loading />                                  // inline, dans une section
 *   <Loading fullScreen text="Connexion..." />   // plein écran, au-dessus de tout
 */

const RING_ID = "aeey-loading-ring";

export const Loading = ({
  text = "Chargement...",
  fullScreen = false,
  logoSrc = "/logo-aeey.png",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-6 ${
        fullScreen
          ? "fixed inset-0 z-9999 bg-white"
          : "w-full py-16"
      }`}
    >
      <style>{`
        @keyframes ${RING_ID}-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes ${RING_ID}-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes ${RING_ID}-fade {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Logo + anneau conique tournant */}
      <div className="relative flex items-center justify-center w-28 h-28">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #1B3B5F 0deg, #1F7A3D 130deg, #F2B705 250deg, #1B3B5F 360deg)",
            animation: `${RING_ID}-spin 2.4s linear infinite`,
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
          }}
        />
        <div
          className="relative w-22 h-22 rounded-full bg-white shadow-[0_2px_10px_rgba(27,59,95,0.15)] flex items-center justify-center overflow-hidden"
          style={{ animation: `${RING_ID}-pulse 2.4s ease-in-out infinite` }}
        >
          <img
            src={logoSrc}
            alt="AEEY"
            className="w-18 h-18 object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Texte */}
      <div className="flex flex-col items-center gap-1">
        <p
          className="text-sm font-medium tracking-wide text-[#1B3B5F]"
          style={{ animation: `${RING_ID}-fade 2.4s ease-in-out infinite` }}
        >
          {text}
        </p>
        <p className="text-[11px] text-[#1F7A3D]/70">
          Association des Élèves et Étudiants de Yaokro
        </p>
      </div>
    </div>
  );
};