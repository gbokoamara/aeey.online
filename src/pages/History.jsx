
import { useEffect, useState } from "react";
import { BanknoteArrowDown, X } from "lucide-react";
import { dateUi } from "../helper/date";
import {PagesCard} from "../component/pages/PagesCard"
import {Loading} from '../utils/Loading'
import { useExpense } from "../hooks/useExpense";

export const HistoryPage = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const {
    approvedStats,
    loadingApproved,
    approvedExpenses,
    getAllExpenses,
    getApprovedExpense,
  } = useExpense()

  
 useEffect(() => {
  const loadHistory = async () => {
    try {
      await Promise.all([
        getAllExpenses(),
        getApprovedExpense(),
      ]);
    } catch (error) {
      console.error("Erreur chargement historique :", error);
    }
  };

  loadHistory();
}, []);

console.log("approvedStats" , approvedStats)

  const total = approvedStats?.totalAmount || 0

  if (loadingApproved) {
    return <Loading text="Chargement de l'historique des depenses ..."/>
  }

  return (
   <>
  <PagesCard title="Les dépenses de l'A.E.E.Y">
    <div className="w-full px-2 md:px-4 py-6">

      {/* TITRE */}
      <h1 className="text-center text-white md:text-2xl font-bold text-lg mb-5">
        Historique des dépenses
      </h1>

      {/* STATISTIQUES */}
      <div className="bg-white w-full max-w-3xl mx-auto rounded-xl font-bold text-center py-5 px-4">
        <h2 className="mb-3">
          Statistiques des historiques de dépenses
        </h2>

        <div className="flex gap-2 justify-center items-center">
          <p>Total dépense :</p>

          <span className="text-red-600">
            {total?.toLocaleString("fr-FR")} FCFA
          </span>
        </div>
      </div>

      {/* LISTE DES DÉPENSES */}
      <div className="grid gap-4 mt-5 w-full max-w-3xl mx-auto">

        {approvedExpenses.map((expense) => (
          <div
            key={expense.id}
            onClick={() => setSelectedExpense(expense)}
            className="
              grid gap-2
              bg-slate-200
              p-4
              rounded-xl
              w-full
              cursor-pointer
              hover:bg-slate-300
              transition
            "
          >
            <div className="flex justify-between items-center gap-4">

              <div className="min-w-0">
                <p className="font-bold text-black truncate">
                  {expense?.name}
                </p>

                <p className="text-sm text-gray-600">
                  {dateUi(expense?.createdAt)}
                </p>
              </div>

              <p className="text-red-600 font-bold whitespace-nowrap">
                - {expense?.amount?.toLocaleString("fr-FR")} FCFA
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {selectedExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedExpense(null)}
          />

          {/* MODAL */}
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedExpense(null)}
              className="
                absolute
                top-3
                right-3
                z-20
                bg-white
                rounded-full
                p-2
                text-black
                shadow
                hover:bg-gray-100
              "
            >
              <X size={20} />
            </button>

            <div className="grid gap-6 bg-slate-200 p-5 rounded-xl">

              {/* HEADER */}
              <div className="flex flex-col items-center">

                <BanknoteArrowDown
                  size={40}
                  className="text-red-600"
                />

                <p className="text-2xl font-bold text-red-600">
                  - {selectedExpense.amount.toLocaleString("fr-FR")} FCFA
                </p>

                <p className="text-sm text-black font-bold">
                  Dépense :{" "}
                  <span className="uppercase">
                    {selectedExpense?.name}
                  </span>
                </p>

              </div>

              {/* DETAILS */}
              <div className="bg-white text-black p-5 rounded-xl">

                <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4">
                  <p className="font-bold">
                    Description :
                  </p>

                  <span className="md:col-span-5 wrap-break-word">
                    {selectedExpense?.description}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
                  <p className="font-bold">
                    Moyen :
                  </p>

                  <span className="md:col-span-5 wrap-break-word">
                    {selectedExpense?.method}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-4">
                  <p className="font-bold">
                    Numéro :
                  </p>

                  <span className="md:col-span-5 wrap-break-word">
                    {selectedExpense?.phoneNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  <p className="font-bold">
                    Date :
                  </p>

                  <span className="md:col-span-5">
                    {dateUi(selectedExpense?.createdAt)}
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  </PagesCard>
</>
  );
};