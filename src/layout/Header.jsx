import { Settings, Eye, EyeOff, HeartHandshake } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import PinInput from "../utils/pinInput";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { logData } from "../utils/console";
import { Modal } from "../utils/Modal";
import { usePayment } from "../hooks/usePayment";
import { formatNumber } from "../helper/formatNumber";
import Button from "../utils/button";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Header = () => {
  const { verifyPin } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { getItem } = useLocalStorage();
  const user = getItem("user");
  const {stats, getPaymentStat} = usePayment()
  const { goTo } = useAppNavigation();
  
  // logData("stats", stats)
  useEffect(() => {
    getPaymentStat()
  }, [])

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
    // logData("pin", pin);
    const isMatch = await verifyPin(pin, user?.id);
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

  // Paiement
  const handleSubmit = () => {
    goTo("/paiement", {
      state: {
        type:"guest",
      },
    });
  };

  return (
    <>
      <div className="sticky top-0 bg-green-600 h-16 z-50 flex justify-between items-center px-4 md:pr-7 text-white w-screen">
        <a href="/settings">
          <Settings size={40} color="#090107" />
        </a>

        <Button
            children={<><div className="flex items-center gap-4"><HeartHandshake size={40} color="#f906ac" /> <span className="hidden md:flex"> Faire un don</span></div></>}
            className="w  "
            onClick={handleSubmit}
          />
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
               {stats ? formatNumber(stats?.totalAmount) : "35 000"}  <span className="text-sm">F CFA</span>
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
        <Modal
          isOpen={showPinInput}
          onClose={() => setShowPinInput(false)}
          showCloseButton={false}
        >
          <h2 className="mb-4 font-semibold text-center">
            Entrer votre code PIN
          </h2>

          <PinInput length={4} onComplete={handlePinComplete} />

          <button
            onClick={() => setShowPinInput(false)}
            className="mt-4 text-sm text-gray-500 block mx-auto"
          >
            Annuler
          </button>
        </Modal>
      )}
    </>
  );
};

export default Header;
