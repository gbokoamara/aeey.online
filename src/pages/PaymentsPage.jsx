
import { useEffect, useState } from "react";
// import { expenses } from "../data/payment";
import BackButton from "../utils/backButton";
import { BanknoteArrowDown, X } from "lucide-react";
import { useExpense } from "../hooks/useExpense";
import { dateUi } from "../helper/date";
import PaymentList from "../component/payments/Payment";
import { usePayment } from "../hooks/usePayment";
import { PagesCard } from "../component/pages/PagesCard";

export const PaymentsPage = ({showBackButton= true}) => {
  const {
          error,
          loading,
          payment,
          payments,
          getPayment, 
          getAllPayments,
        } = usePayment();
    
  
    useEffect(() => {
      getAllPayments()
    }, [])

      const total = payments.reduce((acc, expense) => acc + expense.amount, 0)
  return (
    <>
    {/* <BackButton className="top-10"  title="Paiements" />
    <div className="flex justify-center  bg-slate-200 h-screen w-screen text-black p-1  pt-20"> */}
    <PagesCard showBackButton={showBackButton} title="Les paiements et retraits de l'A.E.E.Y">
       <div className="grid  w-full md:w-3xl">
        <div className="p-5">
            <h1 className="text-center  md:text-2xl font-bold text-lg ">
                Historique des paiements
            </h1>
            <div className="grid bg-green-100 p-1 w-full  rounded-xl font-bold text-center">
                <h1>Statistiques des historiques de paiements</h1>
            <div className="flex gap-5 justify-center w-full">
                <p>Total paiements: </p>
                <span>{total.toLocaleString('fr-FR')}</span>
            </div>
            </div>
            <div >
                <PaymentList payments={payments} />
            </div>
        </div>
        
       </div>
       </PagesCard> 
    {/* </div> */}
    </>
  );
};