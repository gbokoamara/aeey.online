
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../utils/button";
import { logData } from "../utils/console";
import { useExpense } from "../hooks/useExpense";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ApprovedExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {getItem} = useLocalStorage()
  const token = getItem("token");

  const [loading, setLoading] = useState(true);

  const { expense, getExpenseById, approveExpense, rejectExpense } =
    useExpense();

  const getExpense = async () => {
    try {
      logData("ApprovedExpense token :=>", token);

      // Aucun token
      if (!token) {
        navigate(`/?redirect=/expenses/${id}`);
        return;
      }

      await getExpenseById(id);

    } catch (error) {
      console.error("get expense error:", error);
      console.log("get expense error:", error);
      // 🔴 Token invalide / expiré
      // if (error.response?.status === 401) {
      //   // Supprimer l'ancien token
      //   localStorage.removeItem("token");

      //   // URL de la page actuelle
      //   const redirectUrl = `/expenses/${id}`;

      //   // Redirection vers login
      //   navigate(`/?redirect=${encodeURIComponent(redirectUrl)}`);

      //   return;
      // }

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

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!expense) {
    return <p>Dépense introuvable</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-amber-50 rounded">
      <h1 className="text-2xl font-bold mb-5">
        Validation d'une dépense
      </h1>

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

      {expense.status === "PENDING" && (
        <div className="flex gap-3 mt-6">
          <Button
            onClick={() => approveExpense(expense.id)}
          >
            Approuver
          </Button>

          <Button
            onClick={() => rejectExpense(expense.id)}
          >
            ❌ Rejeter
          </Button>
        </div>
      )}
    </div>
  );
};