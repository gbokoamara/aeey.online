

import { useEffect, useState } from "react";
import { members } from "../data/payment";
import Input from "../utils/input";
import Button from "../utils/button";
import ImageUpload from "../utils/imageUpload";
import BackButton from "../utils/backButton";
import { useAppNavigation } from "../hooks/useAppNavigation";
import CarteMembreAEEY from "../component/membres/Carte/CarteMembreAEEY";
import { userOnLocal } from "../helper/getUser";
import { useCard } from "../hooks/useCard";


export const CardPage = () => {
  const user = userOnLocal();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [number, setNumber] = useState(null);
  const [member, setMember] = useState(null);
  const [showCard, setShowCard] = useState(false);

  const { goTo } = useAppNavigation();
  const { card, error, getRequestCard, requestCard } = useCard()

  const nomComplet = `${firstName} ${lastName}`.trim();
  console.log("nom :=>", nomComplet)

  const cardData = {firstName, lastName, number, photo}

  // 🔎 Recherche du membre + affichage carte
  const handleShowCard = async () => {

    const requestedCard = await requestCard(cardData)
    if (requestedCard) {
       setShowCard(true);
    }
    await getRequestCard()
  };
  // 💳 Aller vers paiement
  const handleSubmit = () => {
    
    goTo("/paiement", {
      state: {
        member: {firstName, lastName},
        photo: photo || member?.photo,
        montant: 2000,
      },
    });
  };

  useEffect(() => {
  if (user) {
    setNumber(user.number || "");
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setPhoto(user.photo || null);
    // getRequestCard(user.id)
  }
}, [user]);

  return (
    <div className="flex flex-col w-full min-h-90 bg-slate-200 rounded items-center gap-4 p-6 mt-10 justify-center">

      {/* BACK BUTTON   showCard*/}
      <BackButton className={` ${showCard ? "top-5 max-md:left-3" : "top-20 max-md:left-12 " } `} />
      {/* <BackButton className="top-20 hidden md:block" /> */}

      {/* UPLOAD PHOTO */}
      <ImageUpload onImageSelect={setPhoto} />

      {/* INPUTS */}
      <Input
        type="tel"
        placeholder="Numero"
        value={number}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Nom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Prénom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      {/* ACTION */}
      {!showCard && (
        <Button
          children="Générer ma carte"
          onClick={handleShowCard}
        />
      )}
      { error && (
        <p className="text-red-500">{error} </p>
      )}
      {/* CARTE + PAIEMENT */}
      {showCard &&  (
        <div className="flex flex-col gap-3 items-center">

          <h1 className="text-sm font-semibold">
            La carte coûte 2000 FCFA
          </h1>

          <div className="w-[320px] h-50">
            <CarteMembreAEEY/>
          </div>

          <Button
            children="Commander la carte"
            onClick={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};