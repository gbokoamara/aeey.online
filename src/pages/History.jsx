
import { useEffect, useState } from "react";
// import { expenses } from "../data/payment";
import BackButton from "../utils/backButton";
import { BanknoteArrowDown, X } from "lucide-react";
import { useExpense } from "../hooks/useExpense";
import { dateUi } from "../helper/date";

export const HistoryPage = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const {
    loading,
    expense,
    expenses,
    addExpense,
    updateExpense,
    getAllExpenses,
    getExpense,
    deleteExpense,
  } = useExpense()

  useEffect(() => {
    getAllExpenses()
  }, [])
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0)
  return (
    <>
      <div className="grid justify-center items-center text-black p-1">
        <BackButton className="top-10" />
        <h1 className="text-center text-white md:text-2xl font-bold text-lg mb-5">
            Historique des depenses
          </h1>
        <div className="grid bg-white w-full md:w-3xl rounded-xl font-bold text-center py-5 gap-3">
          <h1>Statistiques des historiques de dépenses</h1>
          <div className="flex gap-5 justify-center w-full">
            <p>Total dépense: </p>
            <span>{total.toLocaleString('fr-FR')}</span>
          </div>
        </div>
        <div className="grid gap-6 mt-5">
          {/* LISTE SIMPLE */}
          {expenses.map((expense) => (
            <div
              key={expense.id}
              onClick={() => setSelectedExpense(expense)}
              className="grid gap-2 bg-slate-200 p-4 rounded-xl w-full md:w-3xl cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-black">
                    {expense.name}
                  </p>
                  <p className="text-sm text-gray-600">{dateUi(expense.createdAt)}</p>
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

            <div className="grid gap-6 bg-slate-200 p-4 rounded-xl w-full md:w-3xl  text-white">

              {/* HEADER */}
              <div className="flex flex-col items-center">
                <BanknoteArrowDown size={32} className="text-red-600" />
                <p className="text-2xl font-bold text-red-600">
                  - {selectedExpense.amount.toLocaleString()} FCFA
                </p>
                <p className="text-sm text-black font-bold">
                  Dépense:{" "}
                  <span className="uppercase">
                    {selectedExpense.name}
                  </span>
                </p>
              </div>

              {/* DETAILS */}
              <div className=" bg-white text-black p-4 rounded-xl">
                <div className="grid md:grid-cols-6  text-black">
                  <p className="font-bold">
                    Description:{" "}
                  </p>
                  <span className="text-start col-span-5 text-md">
                    {selectedExpense.description}
                  </span>
                </div>
                <div className="flex md:grid md:grid-cols-6 justify-between  text-black">
                  <p className="font-bold">
                    Moyen:{" "}
                  </p>
                  <span className="text-start col-span-5 text-md">
                    {selectedExpense.method}
                  </span>
                </div>
                <div className="flex md:grid md:grid-cols-6 justify-between  text-black">
                  <p className="font-bold">
                    Numéro:{" "}
                  </p>
                  <span className="text-start col-span-5 text-md">
                    {selectedExpense.phoneNumber}
                  </span>
                </div>
                <div className="flex md:grid md:grid-cols-6 justify-between  text-black">
                  <p className="font-bold">
                    Date:{" "}
                  </p>
                  <span className="text-start col-span-5 text-md">
                    {dateUi(selectedExpense.createdAt)}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};