

import { useEffect, useState } from "react";
import Input from "../utils/input";
import Button from "../utils/button";
import ImageUpload from "../utils/imageUpload";
import { useAppNavigation } from "../hooks/useAppNavigation";
import CarteMembreAEEY from "../component/membres/Carte/CarteMembreAEEY";
import { userOnLocal } from "../helper/getUser";
import { useCard } from "../hooks/useCard";
import FileUpload from "../utils/fileUpload";
import { PagesCard } from "../component/pages/PagesCard";
import {Loading} from '../utils/Loading'
import { useAdministration } from "../hooks/useAdministration";
import { handleVerification, toastWarning } from "../helper/toasterHelper";

export const CardPage = ({showBackButton=true}) => {
  const user = userOnLocal();
  const [verificationAsked, setVerificationAsked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [number, setNumber] = useState("");

  const { goTo } = useAppNavigation();
  const { loading, card, error, getRequestCard, requestCard } = useCard();
  const {management, getManagement } = useAdministration()
  const cardAmount = management?.cardAmount
  const verificationMessage = "Voulez-vous demander la vérification de vos informations ?" ;
  const verificationUrl = "/membre"
  console.log("cardAmount", cardAmount);

  const userId = user?.id;

  // Chargement de la demande existante
  useEffect(() => {
    getManagement()
    if (userId) {
      getRequestCard(userId);
    }
  }, [userId]);

  // Pré-remplissage
  useEffect(() => {
    if (user) {
      setNumber(user.number || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoto(user.photo || null);
    }
  }, [user]);

  const cardData = {
    firstName,
    lastName,
    number,
    photo,
  };
  // console.log("cardData", cardData)

  const hasCardRequest = !!card;
  const isPending = card?.status === "EN_ATTENTE";
  const isPaid = card?.status === "PAYEE";
  const isValidated = card?.status === "VALIDEE";

  // Création de la demande
  const handleShowCard = async () => {
    
    if (!cardData.firstName) {
        return toastWarning("Nom obligatoire !");
    }
    if (!cardData.lastName) {
        return toastWarning("Prenoms obligatoire !");
    }
    if (!cardData.number) {
        return toastWarning("Numero de téléphone  obligatoire !");
    }
    if (!cardData.photo) {
        return toastWarning(" photo  obligatoire !");
    }
    const requestedCard = await requestCard(cardData);

    if (requestedCard) {
      await getRequestCard(userId);
    }
  };

  // Paiement
  const handleSubmit = () => {
    goTo("/paiement", {
      state: {
        type: "carte",
        member: {
          firstName,
          lastName,
        },
        photo,
        montant: cardAmount,
        card,
      },
    });
  };

  const handleManualInput = (setter, value) => {
if (!user?.isMember && !verificationAsked) {
  if (!verificationAsked) {
  setVerificationAsked(true);
    handleVerification(
        verificationMessage,
          () => goTo(verificationUrl),
          () => setVerificationAsked(false)
    );
  }
return;
}

setter(value);

};


  if (loading) {
    return <Loading text="Chargement de la carte membre en cours ..." />
  }

  return (
    <>
    <PagesCard title="Ma carte membre" showBackButton={showBackButton}>
      <div>
        <div className="flex flex-col w-full  rounded items-center gap-4 p-6 mt-10 justify-center">
      {/* Aucune demande */}
      {!hasCardRequest && (
        <>
          {/* <ImageUpload onImageSelect={setPhoto} /> */}
          <FileUpload
            label="Photo"
            endpoint="image"
            accept="image/*"
            preview
            value={photo}
            onFileSelect={(url) => setPhoto( url)}
          />

          <Input
            type="tel"
            placeholder="Numéro"
            value={number}
            onChange={(e) => setNumber(e.target.value)}/>

          <Input
            type="text"
            placeholder="Nom"
            value={firstName}
            onChange={(e) => handleManualInput( setFirstName , e.target.value )} />

          <Input
            type="text"
            placeholder="Prénom"
            value={lastName}
            onChange={(e) => handleManualInput( setLastName , e.target.value ) } />

          <Button
            children="Générer ma carte"
            onClick={handleShowCard}
          />
        </>
      )}

      {/* Erreur */}
      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {/* Demande en attente */}
      {isPending && (
        <div className="flex flex-col gap-4 items-center">

          <div className="w-[320px] h-50">
            <CarteMembreAEEY
              card={card}
            />
          </div>

          <div className="text-center">
            <h2 className="text-orange-600 font-semibold">
            Votre demande de carte est en attente. 
          </h2>
          <h4 className="text-orange-600 font-serif italic ">
            Terminer le paiement pour valider. 
          </h4>
          </div>

          <p className="font-bold text-lg">
            Montant à payer : { cardAmount || 2000 } FCFA
          </p>

          <Button
            children="Payer ma carte"
            onClick={handleSubmit}
          />
        </div>
      )}

      {/* Carte disponible */}
      {(isPaid || isValidated) && (
        <div className="flex flex-col gap-4 items-center">

          <h2 className="text-green-600 font-semibold">
            Votre carte membre est disponible
          </h2>

          <div className="w-[320px] h-50">
            <CarteMembreAEEY
              card={card}
            />
          </div>

        </div>
      )}
    </div>
    </div>
    </PagesCard>
    </>
    
  );
};