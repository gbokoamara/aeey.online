import { useParams } from "react-router-dom";
// import { payments, userPayments } from "../data/payment";
import { HandCoins, Share2, SkipBack } from "lucide-react";
import BackButton from "../utils/backButton";
import { logData } from "../utils/console";
import { usePayment } from "../hooks/usePayment";
import { useEffect } from "react";
import { dateUi } from "../helper/date";
import { formatNumber } from "../helper/formatNumber";
// import { payments } from "./chemin/vers/payments";

export const PaiementDetailPage = () => {

  const { id } = useParams();
  logData("id", id)

  const {payment,stats, getPaymentStat, getPayment} = usePayment();
  useEffect(() => {
    getPaymentStat()
  }, [])

  useEffect(() => {
    getPayment(id)
  }, [id])

  if (!payment) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-red-600 bg-amber-50">
        Paiement introuvable
      </div>
    );
  }

  const handleShare = async () => {
    const text = `
        Paiement
        Nom: ${payment.name}
        Montant: ${payment.amount} FCFA
        Moyen: ${payment.mobile}
        Date: ${payment.date}
            `;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Détail paiement",
          text,
        });
      } catch (err) {
        console.log("Partage annulé");
      }
    } else {
      alert("Partage non supporté sur ce navigateur");
    }
  };

  return (
    <div className="flex flex-col gap-10  rounded p-3 justify-center items-center text-black  ">
      
      <BackButton className="top-10 left-3 md:hidden" />
      <BackButton className="top-16   hidden md:block" />
      <div className="grid  justify-center items-center font-bold w-90 text-center md:mt-7">
        <div className=" flex justify-center text-3xl text-white   ">
          <HandCoins size={40} />
        </div>
        <div className="text-3xl text-white "> + {payment?.amount} F</div>
        <div className="text-md  flex gap-3 text-white  ">
          <p>Paiment pour {payment.type}  de </p>
          <p className="text-lg uppercase">{payment.name}</p>
        </div>
      </div>
      <button
        onClick={handleShare}
        className="grid gap-3 justify-center bg-slate-200 w-90 h-auto rounded p-3 cursor-pointer"
      >
        <div className="flex justify-center">
          <Share2 size={32} />
        </div>
        <div className="text-2xl">
          <p>Partager</p>
        </div>
      </button>
      <div className="grid grid-cols-2 bg-white p-6 rounded-xl shadow-md  w-90 py-7">
        <div className="col-span-1 space-y-4">
          <p>Moyen</p>
          <p>Numéro </p>
          <p>Montant</p>
          <p>Nouveau solde </p>
          <p>Date </p>
        </div>
        <div className="col-span-1 space-y-4">
          <p> {payment.method || "Mobile"}</p>
          <p>{payment.phoneNumber}</p>
          <p> {payment.amount} FCFA</p>
          <p> {stats ? formatNumber(stats?.totalAmount) : "35 000"} FCFA</p>
          <p>{dateUi(payment.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};
