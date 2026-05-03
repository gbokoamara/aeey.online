
import { useState, useRef } from "react";

export default function PinInput({ length = 4, onComplete }) {
  const [pin, setPin] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // فقط chiffres

    if (!value) return;

    const newPin = [...pin];
    newPin[index] = value[0]; // فقط 1 chiffre
    setPin(newPin);

    // Aller au prochain input automatiquement
    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Si tout est rempli
    if (newPin.every((digit) => digit !== "")) {
      onComplete && onComplete(newPin.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    // Retour arrière
    if (e.key === "Backspace") {
      if (pin[index] === "" && index > 0) {
        inputsRef.current[index - 1].focus();
      }

      const newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);
    }
  };

  return (
    <div className="flex justify-center gap-3">
      {pin.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-14 h-14 text-center text-2xl border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      ))}
    </div>
  );
}