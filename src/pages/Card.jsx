

// import { useEffect, useState } from "react";
// import { members } from "../data/payment";
// import Input from "../utils/input";
// import Button from "../utils/button";
// import ImageUpload from "../utils/imageUpload";
// import BackButton from "../utils/backButton";
// import { useAppNavigation } from "../hooks/useAppNavigation";
// import CarteMembreAEEY from "../component/membres/Carte/CarteMembreAEEY";
// import { userOnLocal } from "../helper/getUser";
// import { useCard } from "../hooks/useCard";


// export const CardPage = () => {
//   const user = userOnLocal();
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [number, setNumber] = useState(null);
//   const [member, setMember] = useState(null);
//   const [showCard, setShowCard] = useState(false);

//   const { goTo } = useAppNavigation();
//   const { card, error, getRequestCard, requestCard } = useCard()
//   const userId = user.id

//   useEffect(() => {
//     getRequestCard(userId)
//   },[userId])

//   const nomComplet = `${firstName} ${lastName}`.trim();
//   // console.log("card :=>", card)
//   // console.log("user :=>", user)

//   const cardData = {firstName, lastName, number, photo}

//   // 🔎 Recherche du membre + affichage carte
//   const handleShowCard = async () => {

//     const requestedCard = await requestCard(cardData)
//     if (requestedCard) {
//        setShowCard(true);
//     }
//     await getRequestCard()
//   };
//   // 💳 Aller vers paiement
//   const handleSubmit = () => {
    
//     goTo("/paiement", {
//       state: {
//         member: {firstName, lastName},
//         photo: photo || member?.photo,
//         montant: 2000,
//       },
//     });
//   };

//   useEffect(() => {
//   if (user) {
//     setNumber(user.number || "");
//     setFirstName(user.firstName || "");
//     setLastName(user.lastName || "");
//     setPhoto(user.photo || null);
//     // getRequestCard(user.id)
//   }
// }, [user]);

//   return (
//     <div className="flex flex-col w-full min-h-90 bg-slate-200 rounded items-center gap-4 p-6 mt-10 justify-center">

//       {/* BACK BUTTON   showCard*/}
//       <BackButton className={` ${showCard ? "top-5 max-md:left-3" : "top-20 max-md:left-12 " } `} />
//       {/* <BackButton className="top-20 hidden md:block" /> */}

//       {/* UPLOAD PHOTO */}
//       <ImageUpload onImageSelect={setPhoto} />

//       {/* INPUTS */}
//       <Input
//         type="tel"
//         placeholder="Numero"
//         value={number}
//         onChange={(e) => setFirstName(e.target.value)}
//       />

//       <Input
//         type="text"
//         placeholder="Nom"
//         value={firstName}
//         onChange={(e) => setFirstName(e.target.value)}
//       />

//       <Input
//         type="text"
//         placeholder="Prénom"
//         value={lastName}
//         onChange={(e) => setLastName(e.target.value)}
//       />

//       {/* ACTION */}
//       {!showCard && (
//         <Button
//           children="Générer ma carte"
//           onClick={handleShowCard}
//         />
//       )}
//       { error && (
//         <p className="text-red-500">{error} </p>
//       )}
//       {/* CARTE + PAIEMENT */}
//       {showCard &&  (
//         <div className="flex flex-col gap-3 items-center">

//           <h1 className="text-sm font-semibold">
//             La carte coûte 2000 FCFA
//           </h1>

//           <div className="w-[320px] h-50">
//             <CarteMembreAEEY/>
//           </div>

//           <Button
//             children="Commander la carte"
//             onClick={handleSubmit}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

import { useEffect, useState } from "react";
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
  const [number, setNumber] = useState("");

  const { goTo } = useAppNavigation();
  const { card, error, getRequestCard, requestCard } = useCard();

  const userId = user?.id;

  // Chargement de la demande existante
  useEffect(() => {
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

  const hasCardRequest = !!card;
  const isPending = card?.status === "EN_ATTENTE";
  const isPaid = card?.status === "PAYEE";
  const isValidated = card?.status === "VALIDEE";

  // Création de la demande
  const handleShowCard = async () => {
    const requestedCard = await requestCard(cardData);

    if (requestedCard) {
      await getRequestCard(userId);
    }
  };

  // Paiement
  const handleSubmit = () => {
    goTo("/paiement", {
      state: {
        member: {
          firstName,
          lastName,
        },
        photo,
        montant: 2000,
      },
    });
  };

  return (
    <div className="flex flex-col w-full min-h-90 bg-slate-200 rounded items-center gap-4 p-6 mt-10 justify-center">

      <BackButton className="top-5 max-md:left-3" />

      {/* Aucune demande */}
      {!hasCardRequest && (
        <>
          <ImageUpload onImageSelect={setPhoto} />

          <Input
            type="tel"
            placeholder="Numéro"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
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

          <h2 className="text-orange-600 font-semibold">
            Votre demande de carte est en attente.
          </h2>

          <p className="font-bold text-lg">
            Montant à payer : 2 000 FCFA
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
  );
};