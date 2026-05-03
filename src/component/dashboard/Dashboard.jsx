import { useMemo, useState } from "react";
import {
  pendingMembers,
  userPayments,
  expenses as initialExpenses,
  members,
  payments,
  eventsAds
} from "../../data/payment";

export const Dashboard = () => {
  const [expenses, setExpenses] = useState(initialExpenses || []);
  const [active, setActive] = useState("events");

  const [form, setForm] = useState({
    id: null,
    name: "",
    amount: "",
    description: "",
  });

  const stats = useMemo(() => {
    const totalPayments = payments?.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );

    const totalUserPayments = userPayments?.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0
    );

    const totalExpenses = expenses?.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );


    return {
      members: members?.length || 0,
      pendingMembers: pendingMembers?.length || 0,
      payments: totalPayments || 0,
      userPayments: totalUserPayments || 0,
      expenses: totalExpenses || 0,
      totalEvents: eventsAds.length || 0,
    };
  }, [expenses]);

  const StatsToMap = [
    {label: "Membres", name : stats.members, seeMore:"voir +", title:"member"},
    {label: "Membres En attente de validation", name : stats.pendingMembers, seeMore:"voir +", title:"validation"},
    {label: "Paiements global AEEY", name : stats.payments, title:"aeey"},
    {label: "Mes paiements ", name : stats.userPayments, title:"events"},
    {label: "Dépenses", name : stats.expenses, seeMore:"voir +", title:"expenses"},
    {label: "Nos Evenements", name : stats.totalEvents, seeMore:"voir +", title:"events"},
  ]
  const resetForm = () => {
    setForm({ id: null, name: "", amount: "", description: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.amount) return;

    if (form.id !== null) {
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === form.id
            ? { ...exp, ...form, amount: Number(form.amount) }
            : exp
        )
      );
    } else {
      const newExpense = {
        id: Date.now(),
        name: form.name,
        amount: Number(form.amount),
        description: form.description,
      };
      setExpenses((prev) => [newExpense, ...prev]);
    }

    resetForm();
  };

  const handleEdit = (exp) => {
    setForm(exp);
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        {StatsToMap.map( (stat, index) => (<div key={index} className="p-3 bg-gray-100 rounded-xl col-span-2 md:col-span-1">
          <p className="text-sm">{stat.label} </p>
          <div className="flex justify-between">
          <p className="text-xl font-bold">{stat.name}</p>  
          {stat.seeMore && (
            <button onClick={() => setActive(stat.title)}
            className="bg-blue-300 cursor-pointer rounded px-1">
              {stat.seeMore} </button>)}
          </div>
        </div>))}
      </div>

      {/* FORM DEPENSE */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow space-y-3"
      >
        <p className="font-semibold">Gestion des dépenses</p>

        <input
          className="w-full border p-2 rounded"
          placeholder="Nom / titre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Montant"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            {form.id !== null ? "Modifier" : "Ajouter"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="border px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>

      {/* LIST DEPENSES */}
      <div className="space-y-2">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between items-center p-3 border rounded"
          >
            <div>
              <p className="font-semibold">{exp.name}</p>
              <p className="text-sm text-gray-500">
                {exp.description} - {exp.amount} FCFA
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(exp)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
