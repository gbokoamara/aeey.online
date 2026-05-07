
import { useState, useRef, useEffect } from "react";

export const AutoScroll = ({
  children,
  axis = "vertical",
  speed = 100,
  pauseOnHover = true,
  height = 200,
  showPauseButton = false, // ← nouvelle prop
}) => {
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(10);
  const [containerWidth, setContainerWidth] = useState(0);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const isH = axis === "horizontal";

  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;
    const contentSize = isH
      ? contentRef.current.offsetWidth
      : contentRef.current.offsetHeight;
    const containerSize = isH
      ? containerRef.current.offsetWidth
      : containerRef.current.offsetHeight;

    if (isH) setContainerWidth(containerSize);

    const totalDistance = containerSize + contentSize;
    setDuration(totalDistance / speed);
  }, [children, isH, speed]);

  return (
    <>
      <style>{`
        @keyframes autoscroll-h {
          from { transform: translateX(${containerWidth}px); }
          to   { transform: translateX(-100%); }
        }
        @keyframes autoscroll-v {
          from { transform: translateY(100%); }
          to   { transform: translateY(-100%); }
        }
      `}</style>

      <div style={{ position: "relative" }}>
        {/* Bouton pause */}
        {showPauseButton && (
          <button
            onClick={() => setPaused(p => !p)}
            className="absolute top-1 right-1 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition"
          >
            {paused ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="white">
                <rect x="5" y="3" width="4" height="18" />
                <rect x="15" y="3" width="4" height="18" />
              </svg>
            )}
          </button>
        )}

        <div
          ref={containerRef}
          style={{ overflow: "hidden", height, position: "relative" }}
          onMouseEnter={() => pauseOnHover && setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={contentRef}
            style={{
              position: "absolute",
              whiteSpace: isH ? "nowrap" : "normal",
              animation: `autoscroll-${isH ? "h" : "v"} ${duration}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};



// import { useState, useRef, useEffect } from "react";

// export const AutoScroll = ({
//   children,
//   axis = "vertical",
//   speed = 100,
//   pauseOnHover = true,
//   height = 200,
// }) => {
//   const [paused, setPaused] = useState(false);
//   const [duration, setDuration] = useState(10);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const contentRef = useRef(null);
//   const containerRef = useRef(null);
//   const isH = axis === "horizontal";

//   useEffect(() => {
//     if (!contentRef.current || !containerRef.current) return;
//     const contentSize = isH
//       ? contentRef.current.offsetWidth
//       : contentRef.current.offsetHeight;
//     const containerSize = isH
//       ? containerRef.current.offsetWidth
//       : containerRef.current.offsetHeight;

//     if (isH) setContainerWidth(containerSize);

//     const totalDistance = containerSize + contentSize;
//     setDuration(totalDistance / speed);
//   }, [children, isH, speed]);

//   return (
//     <>
//       <style>{`
//         @keyframes autoscroll-h {
//           from { transform: translateX(${containerWidth}px); }
//           to   { transform: translateX(-100%); }
//         }
//         @keyframes autoscroll-v {
//           from { transform: translateY(100%); }
//           to   { transform: translateY(-100%); }
//         }
//       `}</style>

//       <div
//         ref={containerRef}
//         style={{ overflow: "hidden", height, position: "relative" }}
//         onMouseEnter={() => pauseOnHover && setPaused(true)}
//         onMouseLeave={() => setPaused(false)}
//       >
//         <div
//           ref={contentRef}
//           style={{
//             position: "absolute",
//             whiteSpace: isH ? "nowrap" : "normal",
//             animation: `autoscroll-${isH ? "h" : "v"} ${duration}s linear infinite`,
//             animationPlayState: paused ? "paused" : "running",
//           }}
//         >
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

