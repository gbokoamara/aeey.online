// import { useEffect, useRef, useState } from "react";

// const AutoSlide = ({ children, interval = 3000 }) => {
//   const ref = useRef(null);
//   const [paused, setPaused] = useState(false);

//   const items = Array.isArray(children) ? children : [children];

//   useEffect(() => {
//     if (paused) return;
//     const el = ref.current;
//     if (!el) return;

//     const id = setInterval(() => {
//       const width = el.offsetWidth;
//       const maxScroll = el.scrollWidth;

//       if (el.scrollLeft + width >= maxScroll - 10) {
//         el.scrollTo({ left: 0, behavior: "smooth" });
//       } else {
//         el.scrollBy({ left: width, behavior: "smooth" });
//       }
//     }, interval);

//     return () => clearInterval(id);
//   }, [interval, paused]);

//   return (
//     <div className="relative">
//       {/* Bouton pause */}
//       <button
//         onClick={() => setPaused(p => !p)}
//         className="absolute -top-7 left-0 z-10 bg-black/60 hover:bg-black/80 text-white rounded p-1.5 transition"
//       >
//         {paused ? (
//           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white">
//             <polygon points="5,3 19,12 5,21" />
//           </svg>
//         ) : (
//           <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white">
//             <rect x="5" y="3" width="4" height="18" />
//             <rect x="15" y="3" width="4" height="18" />
//           </svg>
//         )}
//       </button>

//       <div
//         ref={ref}
//         className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4"
//         style={{ overflow: "hidden" }}
//       >
//         {items.map((child, i) => (
//           <div key={i} className="snap-start shrink-0 w-full md:w-1/2">
//             {child}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AutoSlide;

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const AutoSlide = forwardRef(({ children, interval = 3000 }, ref) => {
  const containerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const items = Array.isArray(children) ? children : [children];

  // Fonction pour aller à l'événement suivant
  const next = () => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.offsetWidth;

    if (el.scrollLeft + width >= el.scrollWidth - 10) {
      el.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      el.scrollBy({
        left: width,
        behavior: "smooth",
      });
    }
  };

  // Permet au composant parent d'utiliser autoSlideRef.current.next()
  useImperativeHandle(ref, () => ({
    next,
  }));

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      next();
    }, interval);

    return () => clearInterval(id);
  }, [interval, paused]);

  return (
    <div className="relative h-10">
      {/* Bouton pause */}
      <button
        onClick={() => setPaused((p) => !p)}
        className="absolute -top-7 left-0 z-10 bg-black/80 hover:bg-black/80 text-white rounded p-1.5 transition "
      >
        {paused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="white"
          >
            <polygon points="5,3 19,12 5,21" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="white"
          >
            <rect x="5" y="3" width="4" height="18" />
            <rect x="15" y="3" width="4" height="18" />
          </svg>
        )}
      </button>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4"
        style={{ overflow: "hidden" }}
      >
        {items.map((child, i) => (
          <div key={i} className="snap-start shrink-0 h-40 w-full border-2 rounded border-amber-600">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
});

export default AutoSlide;