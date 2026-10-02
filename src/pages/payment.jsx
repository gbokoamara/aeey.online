
import { useEffect, useState } from "react";
import BackButton from "../utils/backButton";
import Input from "../utils/input";
import SubmitButton from "../utils/submit";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { userOnLocal } from "../helper/getUser";
import { usePayment } from "../hooks/usePayment";
import { logData } from "../utils/console";
// import { makePayment } from "../config/fusionPay";
import { useCotisation } from "../hooks/useCotisation";
import { useUser } from "../hooks/useUser";
import { toastInfo } from "../helper/toasterHelper";

export const PaymentPage = () => {
  const [initialized, setInitialized] = useState(false);

  const [searchingMember, setSearchingMember] = useState(false);
  const [memberFound, setMemberFound] = useState(null);

  const { getState } = useAppNavigation();

  const { loading, addPayment, getAllPayments } = usePayment();

  const { cotisations, getCotisations } = useCotisation();

  const { getUserByNumber } = useUser();

  const state = getState();
  const user = userOnLocal();
  logData("state", state);

  const [type, setType] = useState(() => state?.type || "member");

  const isFixedType = !!state?.type;


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
    cautisationName: "",
  });

  // ---------------------------------------------------------
  // CHARGEMENT DES COTISATIONS
  // ---------------------------------------------------------

  useEffect(() => {
    getCotisations();
  }, []);

  // ---------------------------------------------------------
  //  NOM DE L'ARTICLE
  // ---------------------------------------------------------

  const getArticleName = (paymentType) => {
    switch (paymentType) {
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

  // ---------------------------------------------------------
  //  TYPE D'ARTICLE
  // ---------------------------------------------------------

  const getArticleType = () => {
    switch (type) {
      case "member":
        return "cotisation";

      case "cautisation":
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

  //  ---------------------------------------------------------
  //  INITIALISATION DU FORMULAIRE
  //  ---------------------------------------------------------

  useEffect(() => {
    if (initialized) return;

    //  CARTE

    if (type === "carte") {
      setForm({
        firstName: state?.member?.firstName || "",
        number: state?.member?.number || "",
        amount: state?.montant || "",
        cardId: state?.card?.id || "",
        otherNumber: "",
        cotisationId: "",
        eventId: "",
        memberId: state?.member?.id || "",
        paymentFor: "self",
        description: "",
      });

      setInitialized(true);
      return;
    }

    //  EVENEMENT

    if (type === "event") {
      setForm({
        firstName: user?.firstName || "",
        number: user?.number || "",
        amount: state?.amount || "",
        eventId: state?.eventId || "",
        otherNumber: "",
        cardId: "",
        cotisationId: "",
        memberId: user?.id || "",
        paymentFor: "self",
        description: "",
      });

      setInitialized(true);
      return;
    }

    // MEMBRE

    if (type === "member") {
      setForm({
        firstName: user?.firstName || "",
        number: user?.number || "",
        amount: "",
        otherNumber: "",
        cardId: "",
        cotisationId: "",
        eventId: "",
        memberId: user?.id || "",
        paymentFor: "self",
        description: "",
      });

      setInitialized(true);
      return;
    }
    //  DON

    if (type === "guest") {
      setForm({
        firstName: "",
        number: "",
        amount: "",
        otherNumber: "",
        cardId: "",
        cotisationId: "",
        eventId: "",
        memberId: "",
        paymentFor: "self",
        description: "",
      });

      setInitialized(true);
    }
  }, [type]);

  // ---------------------------------------------------------
  // INITIALISATION DE LA COTISATION
  // On sélectionne la cotisation venant de state.
  // Ici on ne force PAS paymentFor à self.
  // ---------------------------------------------------------

  useEffect(() => {
    if (type !== "cautisation") return;
    if (cotisations.length === 0) return;

    const selected = cotisations.find(
      (c) => c.title === state?.cautisationName,
    );

    if (!selected) return;

    setForm((prev) => ({
      ...prev,
      cotisationId: selected.id,
      amount: selected.amount,
      description: selected.description || "",
      cautisationName: selected.title
    }));
  }, [type, cotisations, state]);

  // ---------------------------------------------------------
  // COTISATION POUR SOI-MÊME
  // Si paymentFor = self :
  // - Nom = utilisateur connecté
  // - Numéro = utilisateur connecté
  // - memberId = utilisateur connecté
  // - otherNumber = vide
  // ---------------------------------------------------------

  useEffect(() => {
    if (type !== "cautisation") return;
    if (form.paymentFor !== "self") return;

    setMemberFound(user || null);

    setForm((prev) => ({
      ...prev,
      firstName: user?.firstName || "",
      number: user?.number || "",
      memberId: user?.id || "",
      otherNumber: "",
    }));
  }, [type, form.paymentFor]);

  //  ---------------------------------------------------------
  //  COTISATION POUR UNE AUTRE PERSONNE
  //  Recherche du membre par numéro.
  //  On attend 1000ms après la dernière frappe.
  //  ---------------------------------------------------------


useEffect(() => {
  if (type !== "cautisation") return;
  if (form.paymentFor !== "other") return;

  const beneficiaryNumber = form.otherNumber.trim();

  // Pas de numéro ou numero inferieur à 8 chiffres
  if (!beneficiaryNumber || beneficiaryNumber.length < 8) {
    setSearchingMember(false);
    setMemberFound(null);

    setForm((prev) => ({
      ...prev,
      firstName: "",
      memberId: "",
    }));

    return;
  }

  let cancelled = false;

  // On lance la recherche après 700 ms
  const timer = setTimeout(async () => {
    try {
      setSearchingMember(true);
      setMemberFound(null);

      console.log(
        "Recherche du bénéficiaire :",
        beneficiaryNumber
      );

      // On récupère DIRECTEMENT le résultat
      const foundMember = await getUserByNumber(beneficiaryNumber);

      // Une nouvelle recherche a été lancée entre-temps
      if (cancelled) return;

      if (foundMember) {
        setMemberFound(foundMember);

        setForm((prev) => ({
          ...prev,
          // Bénéficiaire
          firstName: foundMember.firstName || "",
          memberId: foundMember.id || "",
          otherNumber: beneficiaryNumber,
        }));
      } else {
        setMemberFound(null);

        setForm((prev) => ({
          ...prev,
          firstName: "",
          memberId: "",
        }));
      }
    } catch (error) {
      if (cancelled) return;

      console.error(
        "Erreur lors de la recherche du membre :",
        error
      );

      setMemberFound(null);

      setForm((prev) => ({
        ...prev,
        firstName: "",
        memberId: "",
      }));
    } finally {
      if (!cancelled) {
        setSearchingMember(false);
      }
    }
  }, 1000);

  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}, [type, form.paymentFor, form.otherNumber]);

  //  ---------------------------------------------------------
  //  HANDLE CHANGE
  //  ---------------------------------------------------------

  const handleChange = (field, value) => {
    // Sélection d'une cotisation
    if (field === "cotisationId") {
      const cotisation = cotisations.find((c) => c.id === value);

      setForm((prev) => ({
        ...prev,
        cotisationId: value,
        amount: cotisation ? cotisation.amount : "",
        description: cotisation?.description || "",
        cautisationName: cotisation?.cautisationName || "",
      }));

      return;
    }
    // Changement self / other
    if (field === "paymentFor") {
      if (value === "self") {
        setMemberFound(user || null);

        setForm((prev) => ({
          ...prev,
          paymentFor: "self",
          firstName: user?.firstName || "",
          number: user?.number || "",
          memberId: user?.id || "",
          otherNumber: "",
        }));

        return;
      }
      // Passage vers "other"
      if (value === "other") {
        setMemberFound(null);

        setForm((prev) => ({
          ...prev,
          number: prev.number,
          paymentFor: "other",
          firstName: "",
          memberId: "",
          otherNumber: "",
        }));

        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //  ---------------------------------------------------------
  //  AUTEUR DU PAIEMENT
  //  ---------------------------------------------------------

  const author = user?.firstName || "";

  //  ---------------------------------------------------------
  //  SUBMIT
  //  ---------------------------------------------------------
  
console.log("FORM AVANT PAIEMENT :", form);
console.log("cautisationName :", form.cautisationName);


  const handleSubmit = async () => {
    //  Validation générale
    if (!form.firstName.trim() || !form.number.trim() || !form.amount) {
      return alert("Veuillez remplir tous les champs obligatoires.");
    }

    /**
     * Validation cotisation
     */
    if (type === "cautisation" && !form.cotisationId) {
      return alert("Veuillez choisir une cotisation.");
    }

    /**
     * Cotisation pour une autre personne
     */
    if (
      type === "cautisation" &&
      form.paymentFor === "other" &&
      !form.otherNumber.trim()
    ) {
      return alert("Veuillez saisir le numéro du membre concerné.");
    }

    //  Si une autre personne est sélectionnée,
    //  le membre doit obligatoirement avoir été trouvé.
    if (
      type === "cautisation" &&
      form.paymentFor === "other" &&
      !form.memberId
    ) {
      return alert("Aucun membre correspondant à ce numéro n'a été trouvé.");
    }

    const articleType = getArticleType();

    const domain = import.meta.env.VITE_CLIENT_URL;

    const severDomain = import.meta.env.VITE_API_URL;

    
    //  Données envoyées au backend
    const paymentData = {
      totalPrice: Number(form.amount),

      article: [
        {
          [getArticleName(type)]: Number(form.amount),
        },
      ],

      numeroSend: form.number.trim(),
      nomclient: form.firstName,
      return_url: `${domain}`,
      webhook_url: `${severDomain}/webhook`,

      personal_Info: [
        {
          type: type,

          article: articleType,
          // Celui qui effectue le paiement
          auteur: author,
          // self | other
          paymentFor: form.paymentFor,

          //  Numéro du bénéficiaire si autre
          otherNumber: form.otherNumber,

          cotisationId: form.cotisationId,

          cardId: form.cardId,

          eventId: form.eventId,

          //  ID du bénéficiaire
          memberId: form.memberId,

          description: form.description,

          cotisationName: form.cautisationName
        },
      ],
    };
    console.log("fusionPayload", paymentData);

    // Création du paiement en base
    const {payment, record, fusionPay} = await addPayment(paymentData);

    await getAllPayments();

    // if (!added) return;
    // // Préparation du paiement FusionPay
    // const fusionPayload = {
    //   ...paymentData,
    //   personal_Info: [
    //     {
    //       ...paymentData.personal_Info[0],
    //       paymentId: added.id,
    //     },
    //   ],
    // };
    toastInfo(fusionPay.message)
    console.log("fusionPay", fusionPay);
    // Lancement du paiement
    // const response = await makePayment(fusionPayload);

    if (fusionPay.statut === true) {
      window.location.href = fusionPay?.fusionPayUrl;
    }
  };
  // ---------------------------------------------------------
  // COTISATION SELECTIONNEE
  // ---------------------------------------------------------
  const selectedCotisation = cotisations.find(
    (item) => item.id === form.cotisationId,
  );
  //  ---------------------------------------------------------
  //  RENDER
  //  ---------------------------------------------------------
  return (
    <div className="min-h-screen w-96 md:w-lg flex flex-col items-center justify-center px-4 text-black">
      <BackButton
        className="absolute top-10 md:top-15 max-md:left-6 text-white"
        title="Page de paiement"
      />

      <div className="w-full grid gap-4 mt-10 bg-white rounded-2xl p-5 space-y-4">
        {/* TITRE */}
        <h1 className="text-xl font-bold text-center">
          {getArticleName(type)}

          {type === "event" && <> {state?.title}</>}
        </h1>

        {/* =====================================================
            DESCRIPTION COTISATION
        ====================================================== */}
        {type === "cautisation" && selectedCotisation?.description && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <h3 className="font-semibold text-blue-700">Servira à :</h3>

            <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">
              {selectedCotisation.description}
            </p>
          </div>
        )}

        {/* =====================================================
            TYPE SELECT
        ====================================================== */}
        {!isFixedType && (
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => setType("member")}
              className={`px-2 py-1 rounded ${
                type === "member" ? "bg-green-600 text-white" : "bg-gray-300"
              }`}
            >
              Membre
            </button>

            <button
              type="button"
              onClick={() => setType("other")}
              className={`px-2 py-1 rounded ${
                type === "other" ? "bg-green-600 text-white" : "bg-gray-300"
              }`}
            >
              Autre
            </button>

            <button
              type="button"
              onClick={() => setType("guest")}
              className={`px-2 py-1 rounded ${
                type === "guest" ? "bg-green-600 text-white" : "bg-gray-300"
              }`}
            >
              Don
            </button>
          </div>
        )}

        {/* =====================================================
            DESTINATION COTISATION
        ====================================================== */}
        {type === "cautisation" && (
          <div className="space-y-2">
            <label className="font-medium">
              Cette cotisation est destinée à :
            </label>

            <div className="flex gap-2">
              {/* SELF */}
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

              {/* OTHER */}
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

        {/* =====================================================
            TYPE DE COTISATION
        ====================================================== */}
        {type === "cautisation" && (
          <div>
            <label className="block mb-1 font-medium">Type de cotisation</label>

            <select
              value={form.cotisationId}
              disabled={!!state?.cautisationName}
              onChange={(e) => handleChange("cotisationId", e.target.value)}
              className="w-full rounded-lg border p-2"
            >
              <option value="">Choisir une cotisation</option>

              {cotisations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} - {item.amount.toLocaleString()} FCFA
                </option>
              ))}
            </select>
          </div>
        )}

        {/* =====================================================
            NUMERO BENEFICIAIRE
            UNIQUEMENT POUR OTHER
        ====================================================== */}
        {type === "cautisation" && form.paymentFor === "other" && (
          <div className="space-y-1">
            <Input
              type="tel"
              placeholder="Numéro du membre concerné"
              value={form.otherNumber}
              onChange={(e) => handleChange("otherNumber", e.target.value)}
            />

            {/* RECHERCHE */}
            {searchingMember && (
              <p className="text-sm text-gray-500">Recherche du membre...</p>
            )}

            {/* TROUVE */}
            {!searchingMember && memberFound && (
              <p className="text-sm text-green-600">
                ✓ Membre trouvé : {memberFound.firstName}
              </p>
            )}

            {/* NON TROUVE */}
            {!searchingMember && form.otherNumber && !memberFound && (
              <p className="text-sm text-red-500">
                Aucun membre trouvé avec ce numéro.
              </p>
            )}
          </div>
        )}

        {/* =====================================================
            NOM
        ====================================================== */}
        <Input
          type="text"
          placeholder="Nom"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          //  Pour une cotisation, le nom vient obligatoirement de la base.
          disabled={type === "cautisation"}
        />

        {/* =====================================================
            CARTE ID
        ====================================================== */}
        {type === "carte" && (
          <Input
            type="text"
            value={form.cardId}
            onChange={(e) => handleChange("cardId", e.target.value)}
            disabled
          />
        )}

        {/* =====================================================
            NUMERO A DEBITER
        ====================================================== */}
        <Input
          type="tel"
          placeholder="Numero à debiter"
          value={form.number}
          onChange={(e) => handleChange("number", e.target.value)}
          // Pour une cotisation,
          // le numéro vient du membre trouvé.
          disabled={type === "cautisation" && form.paymentFor === "self"}
        />

        {/* =====================================================
            MONTANT
        ====================================================== */}
        <Input
          type="number"
          placeholder="Montant"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          disabled={type === "cautisation"}
        />

        {/* =====================================================
            BOUTON
        ====================================================== */}
        <SubmitButton
          loading={loading}
          Chargement="Enregistrement en cours ..."
          children="Enregistrer"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
