import { useEffect, useState } from "react";
import BackButton from "../utils/backButton";
import Input from "../utils/input";
import Button from "../utils/button";
import SubmitButton from "../utils/submit"
import { useAppNavigation } from "../hooks/useAppNavigation";
import { userOnLocal } from "../helper/getUser";
import { usePayment } from "../hooks/usePayment";
import { logData } from "../utils/console";
import { makePayment } from "../config/fusionPay";

export const PaymentPage = () => {
  const [initialized, setInitialized] = useState(false);
  const [type, setType] = useState("member"); // member | other | guest | carte
  // const [user, setUser] = useState("member");
  const { getState, goTo } = useAppNavigation()
  // logData("url", payinUrl)
  const {
        error,
        loading,
        payment,
        payments,
        addPayment,
        getPayment, 
        getAllPayments,
        } = usePayment();

  const state = getState()
  const user = userOnLocal();
  const isFromState = !!state?.member;
  // console.log("state :=>", state)
  // console.log("user :=>", user)

  const [form, setForm] = useState({
    firstName: "",
    number: "",
    otherNumber: "",
    amount: "",
  });

  //  NOM ARTICLE DYNAMIQUE
  const getArticleName = (type) => {

  switch (type) {
    case "member":
      return "Je paie ma cotisation";
    case "carte":
      return "J'achète ma carte membre";
    case "other":
      return "Je paie la cotisation d'un tiers";
    case "guest":
      return "Je fais un don";
    default:
      return "Paiement";
  }
};

const getArticleType = () => {
  // if (state?.member)  return "carte membre";

  switch (type) {
    case "member":
      return "cotisation";
    case "carte":
      return "carte membre";
    case "other":
      return "cotisation de tierce";
    case "guest":
      return "don";
    default:
      return "paiement";
  }
};

  //  AUTO-REMPLISSAGE MEMBRE
 useEffect(() => {
  // appliquer le state UNE SEULE FOIS
  if (isFromState && !initialized) {
    setType("carte");

    setForm({
      firstName: state.member.firstName || "",
      number: state.member.number || "",
      amount: state.montant || "",
    });

    setInitialized(true);
    return;
  }

  // comportement normal après
  if (!initialized) return;

  if (type === "member") {
  
    setForm({
      firstName: user.firstName || "",
      number: user.number || "",
      amount: user.montant || "",
    });
  }


  if (type === "guest") {
    setForm({
      firstName: "",
      number: "",
      otherNumber:"",
      amount: "",
    });
  }

}, [type, state, initialized]);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  let author = null
    if (type === "other") {
     author = user
    } 
    console.log("auteur", author);

  const handleSubmit = async () => {
    if (
    !form.firstName.trim() ||
    !form.number.trim() ||
    !form.amount
  ) {
    return alert("Veuillez remplir tous les champs obligatoires.");
  }
    const articleType = getArticleType()
    const domain = import.meta.env.VITE_CLIENT_URL
    
    const paymentData = {
      totalPrice: Number(form.amount),

      article: [
        {
          [getArticleName(type)]: Number(form.amount),
        },
      ],

      numeroSend: form.number.trim(),
      nomclient: form.firstName,
      return_url: `${domain}`,// return_url: `${domain}/callback`, à personaliser selon le type de paiement( carte, cautisation...)
      webhook_url: `${domain}/webhook-url`,

      personal_Info: [
        {
          type,
          article: articleType,
          auteur: author,
          otherNumber: form.otherNumber

        },
      ],
    };

    const added = await addPayment(paymentData)
    await getAllPayments()
    console.log(payments);
    // goTo("/home", { state: state})
    if (added) {
      const response = await makePayment(paymentData)
      if (response) {
        window.location.href = response.url
      }
    }
  };

  return (
    <div className="min-h-screen w-96 md:w-lg  flex flex-col items-center justify-center px-4  text-black">

      <BackButton className="absolute top-15 max-md:left-6" />

      <div className="w-full  grid gap-4 mt-10 bg-white rounded-2xl p-5 space-y-4">

        <h1 className="text-xl font-bold text-center">
          {getArticleName(type)}
        </h1>

        {/*  TYPE SELECT */}
        {!isFromState && (<div className="flex gap-2 justify-center">
          <button
            onClick={() => setType("member")}
            className={`px-2 py-1 rounded ${
              type === "member" ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
          >
            Membre
          </button>

          <button
            onClick={() => setType("other")}
            className={`px-2 py-1 rounded ${
              type === "other" ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
          >
            Autre
          </button>

          <button
            onClick={() => setType("guest")}
            className={`px-2 py-1 rounded ${
              type === "guest" ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
          >
            Don
          </button>
        </div>)}

        {/* NOM */}
        <Input
          type="text"
          placeholder="Nom"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          disabled={type === "member"}
        />
        {type === "other" &&(
          <Input
          type="tel"
          placeholder="Numero tierce"
          value={form.otherNumber}
          onChange={(e) => handleChange("otherNumber", e.target.value)}
          // disabled={type === "member"}
        />
        )}
        {/* NUMÉRO */}
        <Input
          type="tel"
          placeholder="Numero à debiter "
          value={form.number}
          onChange={(e) => handleChange("number", e.target.value)}
          disabled={type === "member"}
        />

        {/* MONTANT */}
        <Input
          type="number"
          placeholder="Montant"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />

        <SubmitButton 
        // className="bg-amber-300"
        // type="submit"
        loading={loading} 
        Chargement= "Enregistrement en cours ..."
        children="Enregistrer" 
        onClick={handleSubmit} />

      </div>
    </div>
  );
};