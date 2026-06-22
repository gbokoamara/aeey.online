import { useEffect, useState } from "react";
import Input from "../../utils/input";
import Button from "../../utils/button";
import { Modal } from "../../utils/Modal";
import { logData } from "../../utils/console";
import { PaymentCard } from "../cards/PaymentCard";
import { useExpense } from "../../hooks/useExpense";
import { ExpenseCard } from "./ExpenseCard";

export const ExpensePage = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [reschedule, setReschedule] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
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
  } = useExpense();

  const [form, setForm] = useState({ //     
    name: "",
    description: "",
    phoneNumber: "",
    amount: "",
    method: "",
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      phoneNumber: "",
      amount: "",
      method: "",
    });
    setSelectedExpense(null);
    setActiveModal(false);
  };

  const handleSubmit = async () => {
    try {
      if (reschedule === "Modifier") {
        await updateExpense(selectedExpense.id, form);
        // alert("Expense modifié !");
      } else {
        await addExpense(form);
        // alert("Expense ajouté !");
      }
      resetForm();
      getAllExpenses();
      setReschedule(false);
    } catch (err) {
      console.error(err);
    }
  };


  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setForm({
      name: expense.name,
      description: expense.description,
      phoneNumber: expense.phoneNumber,
      amount: expense.amount,
      method: expense.method,
    });
  };



    const handleDelete = async (expense) => {
    if (confirm("Supprimer cet événement ?")) {
      await deleteExpense(expense.id);
    }
    getAllExpenses()
  };

  useEffect(() => {
    getAllExpenses()
  }, []);

  const getTitle = () => {
    
     if (reschedule === "Modifier") {
      return "Modifier une dépense";
    } else {
      return "Ajouter une dépense";
    }
  };

  const submitTitle = () => {
    if (reschedule === "Modifier") {
      return "Modifier";
    } else {
      return "Ajouter ";
    }
  };

  // filtrage
  const safeExpenses = Array.isArray(expenses) ? expenses : [];
  // filtrage simple
  const filteredExpenses = safeExpenses?.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.method?.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === "ALL") return matchSearch;
    if (statusFilter === "ACTIVE") return matchSearch && e.isActive;
    if (statusFilter === "INACTIVE") return matchSearch && !e.isActive;

    return matchSearch;
  });

  // stats
  const total = expenses?.length || 0;
  const activeCount = safeExpenses.filter((e) => e.amount).length;
  const inactiveCount = total - activeCount;

  if (loading) {
    return <div>Chargement en cours ...</div>;
  }
  return (
    <div className="p-6 grid  gap-6">
      {/* <div className="bg-indigo-500 w-full h-10"> */}
      {/* zone de filtre et stats + boutton ajouter */}
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT: STATS */}
        <div className="flex gap-4 text-sm">
          <div className="bg-gray-100 px-3 py-1 rounded-xl">
            Total: <span className="font-semibold">{total}</span>
          </div>
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">
            Actifs: {activeCount}
          </div>
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">
            Inactifs: {inactiveCount}
          </div>
        </div>

        {/* CENTER: FILTER */}
        <div className="flex gap-2 flex-1 md:max-w-md">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-2 text-sm"
          >
            <option value="ALL">Tous</option>
            <option value="ACTIVE">Actifs</option>
            <option value="INACTIVE">Inactifs</option>
          </select>
        </div>

        {/* RIGHT: ADD BUTTON */}
        <Button
          children="+ Ajouter"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Ajouter");
            setActiveModal(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        />
      </div>
      {/* </div> */}
      {/* LISTE ExpenseS */}
      {expenses.length > 0 && (
        <div className="space-y-1 grid ">
          {expenses.map((expense) => (
            
          <ExpenseCard expense={expense} key={expense.id} setReschedule={setReschedule}
            resetForm={resetForm} setActiveUpdateModal={setActiveModal} handleEdit={handleEdit} 
            handleDelete={handleDelete}
          />
               
          
          ))}
        </div>
      )}

      {activeModal && (
        <div>
          <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={false}
          >
            {/* FORMULAIRE */}
            <div className="bg-white shadow-xl  rounded-2xl p-5 space-y-4">
              <h2 className="text-xl font-semibold">{getTitle()}</h2>

              <Input
                value={form.name}
                type="text"
                placeholder="Titre"
                onChange={(e) => handleChange("name", e.target.value)}
              />

              <Input
                value={form.amount}
                type="number"
                placeholder="Montant"
                onChange={(e) => handleChange("amount", e.target.value)}
              />

              <Input
                value={form.description}
                type="text-area"
                placeholder="Description"
                onChange={(e) => handleChange("description", e.target.value)}
              />

              <Input
                value={form.phoneNumber}
                type="tel"
                placeholder="Numero"
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
              />
             
              {/* ORANGE_MONEY
                MTN_MOMO
                MOOV_MONEY
                WAVE
                CASH
                BANK */}
              <Input
                value={form.method}
                type="text"
                placeholder="Methode"
                onChange={(e) => handleChange("method", e.target.value)}
              />

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>{submitTitle()}</Button>

                {reschedule && (
                  <Button onClick={resetForm} variant="secondary">
                    Annuler
                  </Button>
                )}
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
