
import { useState } from "react";
import { expenses } from "../data/payment";
import BackButton from "../utils/backButton";
import { BanknoteArrowDown, X } from "lucide-react";

export const HistoryPage = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);

  return (
    <>
      <div className="grid justify-center items-center text-black">
        <BackButton className="top-10" />

        <div className="grid gap-6 mt-15">
          <h1 className="text-center text-white md:text-2xl font-bold text-lg">
            Historique des depenses
          </h1>

          {/* LISTE SIMPLE */}
          {expenses.map((expense) => (
            <div
              key={expense.id}
              onClick={() => setSelectedExpense(expense)}
              className="grid gap-2 bg-slate-200 p-4 rounded-xl w-90 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-black">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-600">{expense.date}</p>
                </div>

                <p className="text-red-600 font-bold">
                  - {expense.amount.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          ))}
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