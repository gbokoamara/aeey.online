
import { useEffect, useState } from "react";
import { BanknoteArrowDown, X } from "lucide-react";
import { expenses,  } from "../../../data/payment";
import { PaymentCard } from "../../cards/PaymentCard";
import { usePayment } from "../../../hooks/usePayment";
import { logData } from "../../../utils/console";

export const UserPaymentHistoryPage = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const {userPayments, getUserPayments } = usePayment()

  useEffect(() => {
    getUserPayments()
  }, []);

  const mobileStyle="bg-slate-50 absolute bottom-0 left-1 right-1 top-15"
  return (
    <>
      <div className="grid md:justify-center md:items-center text-black  rounded bg-slate-50 absolute bottom-0 left-1 right-1 top-15 md:static md:bg-transparent">
        <div className="flex flex-col gap-6 mt-15">
          <h1 className="text-center  md:text-2xl font-bold text-lg">
            Historique de mes  paiements
          </h1>

         <div>
             {/* LISTE SIMPLE */}
              {userPayments.map((payment, index) => (
                <div
                  key={index}
                  // onClick={() => setSelectedExpense(expense)}
                  className="  p-4 rounded-xl w-full  md:w-full cursor-pointer"
                >
                  <PaymentCard payment={payment} key={index}/>
                </div>
              ))}
         </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedExpense && (
        <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
          
          {/* CLOSE BACKDROP */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedExpense(null)}
          />

          {/* TON UI EXACT DANS LE MODAL */}
          <div className="relative z-10">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedExpense(null)}
              className="absolute top-2 right-2 text-black"
            >
              <X />
            </button>

            <div className="grid gap-6 bg-slate-200 p-4 rounded-xl w-90 text-white">

              {/* HEADER */}
              <div className="flex flex-col items-center">
                <BanknoteArrowDown size={32} className="text-red-600" />
                <p className="text-2xl font-bold text-red-600">
                  - {selectedExpense.amount.toLocaleString()} FCFA
                </p>
                <p className="text-sm text-black font-bold">
                  Dépense par{" "}
                  <span className="uppercase">
                    {selectedExpense.name}
                  </span>
                </p>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 bg-white text-black p-4 rounded-xl">
                <div className="space-y-2">
                  <p>Description</p>
                  <p>Moyen</p>
                  <p>Numéro</p>
                  <p>Date</p>
                </div>

                <div className="space-y-2">
                  <p>{selectedExpense.description}</p>
                  <p>{selectedExpense.mobile}</p>
                  <p>{selectedExpense.number}</p>
                  <p>{selectedExpense.date}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};