import { Settings, Eye, EyeOff } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import PinInput from "../utils/pinInput";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { logData } from "../utils/console";

const Header = () => {
  const {verifyPin}  = useAuth()
  const [showBalance, setShowBalance] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const {getItem} = useLocalStorage()
  const user = getItem("user")


  const timeoutRef = useRef(null); // pour gérer le timer

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👉 Quand l'utilisateur clique sur l'œil
  const handleToggleBalance = () => {
    if (!isUnlocked) {
      setShowPinInput(true);
      return;
    }
    setShowBalance(!showBalance);
  };

  //  Quand le PIN est correct
  const handlePinComplete = async (pin) => {
    logData("pin", pin)
    const isMatch = await verifyPin(pin, user?.id)
    if (isMatch === true) {
      setIsUnlocked(true);
      setShowBalance(true);
      setShowPinInput(false);

      //  Reset timer si déjà existant
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // ⏱️ verrouillage après 30 secondes
      timeoutRef.current = setTimeout(() => {
        setIsUnlocked(false);
        setShowBalance(false);
      }, 30000); // 30 000 ms = 30s
    } else {
      alert("Code incorrect");
    }
  };

  //  Nettoyage (important)
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 bg-green-600 h-16 z-50 flex items-center px-4 text-white w-screen">
        
        <a href="/settings">
          <Settings className="w-6 h-6" />
        </a>

        <div
          className={`
            absolute left-1/2 -translate-x-1/2 flex items-center gap-2
            transition-all duration-300
            ${scrolled ? "translate-y-0" : "translate-y-16"}
          `}
        >
          <div className="font-semibold text-2xl">
            {showBalance ? (
              <>
                35 000 <span className="text-sm">F CFA</span>
              </>
            ) : (
              "•••••••••"
            )}
          </div>

          <button onClick={handleToggleBalance}>
            {showBalance ? (
              <EyeOff className="w-6 h-6" />
            ) : (
              <Eye className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/*  MODAL PIN */}
      {showPinInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="mb-4 font-semibold">Entrer votre code PIN</h2>

            <PinInput length={4} onComplete={handlePinComplete} />

            <button
              onClick={() => setShowPinInput(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;