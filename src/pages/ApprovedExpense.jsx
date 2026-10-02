import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../utils/button";
import { logData } from "../utils/console";
import { useExpense } from "../hooks/useExpense";
import { useLocalStorage } from "../hooks/useLocalStorage";
import BackButton from "../utils/backButton";
import { Loading } from "../utils/Loading"

export const ApprovedExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const token = getItem("token");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  logData("result In", result)

  const {
    vote,
    expense,
    getExpenseById,
    approveExpense,
    rejectExpense,
  } = useExpense();

  const getExpense = async () => {
    try {

      if (!token) {
        sessionStorage.setItem("redirectAfterLogin",`/expenses/${id}`);
        navigate("/", { replace: true });
        return;
      }

      await getExpenseById(id);
    } catch (error) {
      console.error("get expense error:", error);

      toast.error(
        error.response?.data?.message ||
          "Impossible de charger cette dépense"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  getExpense();
}, [id]);

  // =========================
  // REJETER
  // =========================
  const handleReject = async () => {
    // Empêche un deuxième clic
    if (actionLoading) return;

    try {
      setActionLoading("reject");

      const result = await rejectExpense(expense.id);
      setResult(result);
    } catch (error) {
      console.error("Erreur rejet :", error);
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // APPROUVER
  // =========================
  const handleApprove = async () => {
    // Empêche un deuxième clic
    if (actionLoading) return;

    try {
      setActionLoading("approve");
      const result = await approveExpense(expense.id);
      setResult(result);
    } catch (error) {
      console.error("Erreur approbation :", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <Loading text = "Chargement de la dépense en cours..." />;
  }

  if (!expense) {
    return <p>Dépense introuvable</p>;
  }

  console.log("vote", vote);

  return (
    <>
      <BackButton
        className="top-5 left-0 text-white"
        title={"Page d'accueil"}
        show={true}
      />

      <div className="max-w-xl mx-auto p-6 bg-amber-50 rounded">
        <h1 className="text-2xl font-bold mb-5">
          Validation d'une dépense
        </h1>
        {/* carde visuel */}
        <div className="border rounded-xl p-5 space-y-3">
          <p>
            <strong>Titre :</strong> {expense.name}
          </p>

          <p>
            <strong>Description :</strong>
            <br />
            {expense.description}
          </p>

          <p>
            <strong>Montant :</strong> {expense.amount} FCFA
          </p>

          <p>
            <strong>Demandeur :</strong> {expense.user?.name}
          </p>

          <p>
            <strong>Status :</strong> {expense.status}
          </p>
        </div>
        {/* message de succès */}
         {result && (
            <div className="mt-6 w-full max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              {/* Succès */}
              <div className="flex items-center gap-4 rounded-xl bg-green-50 border border-green-200 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-green-700">
                    Retrait approuvé avec succès !
                  </h3>

                  <p className="text-sm text-green-600 mt-1">
                    Votre approbation a bien été enregistrée.
                  </p>
                </div>
              </div>

              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-3 mt-5">

                {/* Validées */}
                <div className="rounded-xl bg-blue-50 border border-blue-100 py-4 py-4 md:px-4 text-center">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                    ✓
                  </div>

                  <p className="text-2xl font-bold text-blue-600">
                    {result?.approvedCount || 0}
                  </p>

                  <p className="text-xs md:text-sm text-blue-700 mt-1">
                    Approuvée{result?.approvedCount > 1 ? "s" : ""}
                  </p>
                </div>

                {/* En attente */}
                <div className="rounded-xl bg-yellow-50 border border-yellow-100 py-4 md:px-4 text-center">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-bold">
                    …
                  </div>

                  <p className="text-2xl font-bold text-yellow-600">
                    {result?.pendingCount || 0}
                  </p>

                  <p className="text-xs md:text-sm text-yellow-700 mt-1">
                    En attente
                  </p>
                </div>

                {/* Rejetées */}
                <div className="rounded-xl bg-red-50 border border-red-100 py-4 md:px-4 text-center">
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                    ×
                  </div>

                  <p className="text-2xl font-bold text-red-600">
                    {result?.rejectedCount || 0}
                  </p>

                  <p className="text-xs md:text-sm text-red-700 mt-1">
                    Rejetée{result?.rejectedCount > 1 ? "s" : ""}
                  </p>
                </div>

              </div>

            </div>
          )}
          {/* bouttons de validation et rejet */}
        {expense.status === "PENDING" &&
          vote !== "APPROVED" &&
          vote !== "REJECTED" &&  !result &&(
            <div className="flex gap-3 mt-6">

              {/* REJETER */}
              <Button
                disabled={!!actionLoading}
                className="bg-gray-400 hover:bg-gray-600 hover:text-red-500 px-4 py-2 w-full"
                onClick={handleReject}
              >
                {actionLoading === "reject"
                  ? "..."
                  : "❌ Rejeter"}
              </Button>

              {/* APPROUVER */}
              <Button
                disabled={!!actionLoading}
                onClick={handleApprove}
              >
                {actionLoading === "approve"
                  ? "..."
                  : "Approuver"}
              </Button>

            </div>
          )}
      </div>
    </>
  );
};
