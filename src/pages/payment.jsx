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
import { useCotisation } from "../hooks/useCotisation";

export const PaymentPage = () => {
  const [initialized, setInitialized] = useState(false);
  const { getState, goTo } = useAppNavigation()
  const {
        error,
        loading,
        payment,
        payments,
        addPayment,
        getPayment, 
        getAllPayments,
        } = usePayment();
  const {
      // loading,
      cotisation,
      cotisations,
      getCotisations,
      getCotisation,
    } = useCotisation();
  
  useEffect(() =>{
    getCotisations()
  },[])

  const state = getState()
  const [type, setType] = useState(() => state?.type || "member");
  const user = userOnLocal();
  const isFromState = !!state?.member;
  const isFixedType = !!state?.type;
  console.log("state :=>", state)

  const [form, setForm] = useState({
      firstName: "",
      number: "",
      otherNumber: "",
      paymentFor: "self", // self | other
      amount: "",
      cardId: "",
      cotisationId: "",
      eventId: "",
      memberId: "",
      description: "",
    });
  
  const getArticleName = (type) => {
  switch (type) {
    case "member":
      return "Je paie ma cotisation";
    case "cautisation":
      return "Je paie ma cotisation";
    case "event":
      return "Je participe pour : ";
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

useEffect(() => {
  if (initialized) return;

  if (type === "carte") {
    setForm({
      firstName: state?.member?.firstName || "",
      number: state?.member?.number || "",
      amount: state?.montant || "",
      cardId: state?.card?.id || "",
      otherNumber: "",
      cotisationId: "",
      eventId: "",
    });

    setInitialized(true);
    return;
  }

  if (type === "event") {
    setForm({
      firstName: user.firstName || "",
      number: user.number || "",
      amount: state?.amount || "",
      eventId: state?.eventId,
      otherNumber: "",
      cardId: "",
      cotisationId: "",
    });

    setInitialized(true);
    return;
  }

  if (type === "member") {
    setForm({
      firstName: user.firstName || "",
      number: user.number || "",
      amount: "",
      otherNumber: "",
      cardId: "",
      cotisationId: "",
    });

    setInitialized(true);
    return;
  }

  if (type === "guest") {
    setForm({
      firstName: "",
      number: "",
      amount: "",
      otherNumber: "",
      cardId: "",
      cotisationId: "",
    });

    setInitialized(true);
  }
}, [type]);

useEffect(() => {
  if (type !== "cautisation") return;
  if (cotisations.length === 0) return;

  const selected = cotisations.find(
    c => c.title === state?.cautisationName
  );

  if (!selected) return;

  setForm(prev => ({
    ...prev,
    firstName: state?.member?.firstName || user.firstName,
    number: state?.member?.number || user.number,
    cotisationId: selected.id,
    amount: selected.amount,
    paymentFor: "self",
    memberId: state?.member?.id,
    description: selected?.description
  }));
}, [cotisations, state]);

  const handleChange = (field, value) => {
    if (field === "cotisationId") {
      const cotisation = cotisations.find(c => c.id === value);

      setForm(prev => ({
        ...prev,
        cotisationId: value,
        amount: cotisation ? cotisation.amount : "",
      }));

      return;
    }

    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  let author = null
  if (type === "other") { author = user.firstName} 

  const handleSubmit = async () => {
    if ( !form.firstName.trim() || !form.number.trim() || !form.amount) { return alert("Veuillez remplir tous les champs obligatoires.");}

    if ( type === "cautisation" && !form.cotisationId) {
        return alert("Veuillez choisir une cotisation.");
      }

    if ( type === "cautisation" && form.paymentFor === "other" && !form.otherNumber.trim()) {
        return alert("Veuillez saisir le numéro du membre concerné.");
      }

    const articleType = getArticleType()
    const domain = import.meta.env.VITE_CLIENT_URL;
    const severDomain = import.meta.env.VITE_API_URL;
    logData("severDomain", severDomain)
    
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
      webhook_url: `${severDomain}/webhook`,

      personal_Info: [
      {
        type: type,
        article: articleType,

        auteur: user.firstName,

        paymentFor: form.paymentFor,

        otherNumber: form.otherNumber,

        cotisationId: form.cotisationId,

        cardId: form.cardId,

        eventId: form.eventId,

        memberId: form.memberId,
        
        description: form.description
      },
    ],
    };

    console.log("paymentData", paymentData);
    const added = await addPayment(paymentData)
    await getAllPayments()
    console.log("added",added);

    
    // goTo("/home", { state: state})
    if (added) {
      const fusionPayload = {
      ...paymentData,
      personal_Info: [
        {
          ...paymentData.personal_Info[0],
          paymentId: added.id,
        },
      ],
    };
      const response = await makePayment(fusionPayload)
      if (response) {
        window.location.href = response.url
      }
    }
  };

  const selectedCotisation = cotisations.find(
    (item) => item.id === form.cotisationId
  );
  return (
    <div className="min-h-screen w-96 md:w-lg  flex flex-col items-center justify-center px-4  text-black">

      <BackButton className="absolute top-10 md:top-15 max-md:left-6 text-white" title="Page de paiement" />

      <div className="w-full  grid gap-4 mt-10 bg-white rounded-2xl p-5 space-y-4">

        <h1 className="text-xl font-bold text-center">
          {getArticleName(type)} {type === "event" &&( <>{state?.title}  </>)} 
        </h1>
        {/* Description de la cotisation */}
        {type === "cautisation" && selectedCotisation?.description && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <h3 className="font-semibold text-blue-700">
              Servira à : 
            </h3>

            <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
              {selectedCotisation.description}
            </p>
          </div>
        )}
        {/*  TYPE SELECT */}
        {!isFixedType  && 
        (<div className="flex gap-2 justify-center">
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

        {type === "cautisation" && (
        <div className="space-y-2">

          <label className="font-medium">
            Cette cotisation est destinée à :
          </label>

          <div className="flex gap-2">

            <button
              type="button"
              onClick={() => handleChange("paymentFor", "self")}
              className={`px-3 py-2 rounded ${
                form.paymentFor === "self"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Moi-même
            </button>

            <button
              type="button"
              onClick={() => handleChange("paymentFor", "other")}
              className={`px-3 py-2 rounded ${
                form.paymentFor === "other"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Une autre personne
            </button>

          </div>

        </div>
      )}

      {type === "cautisation" && (
        <div>

          <label className="block mb-1 font-medium">
            Type de cotisation
          </label>

          <select
            value={form.cotisationId}
            disabled={!!state?.cautisationName}
            onChange={(e) => handleChange("cotisationId", e.target.value)}
            className="w-full rounded-lg border p-2"
          >
            <option value="">
              Choisir une cotisation
            </option>

            {cotisations.map(item => (
              <option key={item.id} value={item.id}>
                {item.title} - {item.amount.toLocaleString()} FCFA
              </option>
            ))}
          </select>

        </div>
      )}

        {type === "cautisation" &&
        form.paymentFor === "other" && (
          <Input
            type="tel"
            placeholder="Numéro du membre concerné"
            value={form.otherNumber}
            onChange={(e) =>
              handleChange("otherNumber", e.target.value)
            }
          />
        )}
        {/* NOM */}
        <Input
          type="text"
          placeholder="Nom"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          // disabled={type === "member"}
        />
        {type === "carte" && (
          <Input
          type="text"
          // placeholder="Nom"
          value={form.cardId}
          onChange={(e) => handleChange("cardId", e.target.value)}
          disabled
        />
        )}
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
          // disabled={type === "member"}
        />

        {/* MONTANT */}
        <Input
          type="number"
          placeholder="Montant"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          // disabled
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