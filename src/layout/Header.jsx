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
import { toastError, toastWarning } from "../helper/toasterHelper";
import { useAdministration } from "../hooks/useAdministration";

const Header = () => {
  const { verifyPin, changePin } = useAuth();
  const [showBalance, setShowBalance] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [edit, setEdit] = useState(false);
  const [pinKey, setPinKey] = useState(0);

  const { getItem } = useLocalStorage();
  const user = getItem("user");
  const {stats, getPaymentStat} = usePayment()
  const {loading, management, getManagement} = useAdministration()
  const { goTo } = useAppNavigation();
  
  // logData("stats", stats)
  useEffect(() => {
    getPaymentStat();
    getManagement()
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

  const handlePinComplete = async (pin) => {
  try {
    let isMatch = false;

    if (edit === true) {
      const newPin = pin;
      isMatch = await changePin(newPin, user?.id);
      setShowPinInput(false);
      setEdit(false)
    } else {
      isMatch = await verifyPin(pin, user?.id);
      if (isMatch === true) {
      setIsUnlocked(true);
      setShowBalance(true);
      setShowPinInput(false);

      // Réinitialiser le timer précédent
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Verrouillage automatique après 30 secondes
      timeoutRef.current = setTimeout(() => {
        setIsUnlocked(false);
        setShowBalance(false);
      }, 30000);
    } else {
      toastError("PIN incorrect");
      setPinKey((prev) => prev + 1);
    }
    }

  } catch (error) {
    console.error("Erreur lors de la vérification du PIN :", error);
    toastError("Une erreur est survenue");
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
            className=" "
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
               {management ? formatNumber(management?.solde) : "35 000"}  <span className="text-sm">F CFA</span>
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
          {edit ? "Entrer votre nouveau code pin" : "Entrer votre code code pin"}  
          </h2>

          <PinInput key={pinKey} length={4} onComplete={handlePinComplete} />

          <div className="flex ">
            <button
            onClick={() => {setShowPinInput(false), setEdit(false) }}
            className="mt-4 text-sm text-gray-500 block mx-auto"
          >
            Annuler
          </button>
          <button
            onClick={() => {setShowPinInput(true), setEdit(true), toastWarning("Vous êtes sur le point de changer votre Pin") }}
            className="mt-4 text-sm text-red-500 block mx-auto"
          >
            Code pin oublié !
          </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
