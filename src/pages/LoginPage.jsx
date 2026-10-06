

import { useState } from "react";
import "../App.css";
import Button from "../utils/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PhoneInput from "../utils/phoneInput";
import { logData } from "../utils/console";
import { toastWarning } from "../helper/toasterHelper";
import Input from "../utils/input";

export const LoginPage = () => {
  const { login, signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect =
    searchParams.get("redirect") ||
    sessionStorage.getItem("redirectAfterLogin") ||
    localStorage.getItem("redirectAfterLogin");

  logData("redirect", redirect);

  const [form, setForm] = useState({
    name: "",
    number: "",
    countryName: "Côte d'Ivoire",
    countryCode: "+225",
    countryIso: "ci",
  });

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = ({ code, iso, name }) => {
    setForm((prev) => ({
      ...prev,
      countryName: name,
      countryCode: code,
      countryIso: iso,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.number) {
      return toastWarning("Numéro de téléphone obligatoire !");
    }

    if (isRegister && !form.name.trim()) {
      return toastWarning("Nom obligatoire !");
    }

    try {
      setLoading(true);

      // =========================
      // INSCRIPTION
      // =========================
      if (isRegister) {
        const userData = await signIn(form);

        if (userData) {
          navigate(redirect || "/home", {
            state: { userData },
            replace: true,
          });
        }

        return;
      }

      // =========================
      // CONNEXION
      // =========================
      const userData = await login(form);

      if (userData) {
        navigate(redirect || "/home", {
          state: { userData },
          replace: true,
        });
      }
    } catch (error) {
      console.error("AUTH ERROR :", error);

      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      // L'utilisateur n'existe pas encore
      if (
        status === 400 &&
        message ===
          "L'utilisateur ne dispose pas encore de compte, veuillez vous inscrire !"
      ) {
        setIsRegister(true);

        // toastWarning(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid text-center justify-center items-center h-screen md:px-10 px-2">
      <div
        className="
          flex flex-col gap-8
          p-5
          text-center
          bg-amber-50
          text-black
          w-full
          justify-center
          items-center
          md:w-2xl
          min-h-96
          rounded-2xl
        "
      >
        {/* TITRE */}
        <div className="grid gap-3">
          <h1 className="uppercase font-serif font-bold">
            Bienvenue chez A.E.E.Y !
          </h1>

          <p className="font-serif text-blue-800">
            {isRegister
              ? "Créez votre compte pour continuer."
              : "Pour commencer, entrez votre numéro de téléphone."}
          </p>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="w-full grid gap-5">
          {/* NOM : uniquement en inscription */}
          {isRegister && (
            <div className="w-full">
              <Input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Ex: gboko yao adam"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  outline-none
                  focus:border-blue-500
                "
              />
            </div>
          )}

          {/* TELEPHONE + PAYS */}
          <div className="w-full">
            <div className="flex rounded-xl">
              <PhoneInput
                type="tel"
                value={form.number}
                countryName={form.countryName}
                countryCode={form.countryCode}
                countryIso={form.countryIso}
                defaultCountry="ci"
                onCountryChange={handleCountryChange}
                onChange={(e) =>
                  handleChange("number", e.target.value)
                }
                className="flex-1 px-3 py-3 outline-none"
                placeholder="00 05 06 08 11"
              />
            </div>
          </div>

          {/* BOUTON */}
          <div className="text-center w-full">
            <Button
              type="submit"
              children={isRegister ? "S'inscrire" : "Se connecter"}
              loadingChild={
                isRegister
                  ? "Inscription en cours ..."
                  : "Connexion en cours ..."
              }
              loading={loading}
            />
          </div>
        </form>

        {/* RETOUR CONNEXION */}
        {isRegister && (
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setForm((prev) => ({
                ...prev,
                name: "",
              }));
            }}
            className="text-sm text-blue-700 underline"
          >
            J'ai déjà un compte
          </button>
        )}
      </div>
    </section>
  );
};
