import { useEffect, useState } from "react";
import Input from "../../utils/input";
import Button from "../../utils/button";
import { Modal } from "../../utils/Modal";
import { logData } from "../../utils/console";
import { PaymentCard } from "../cards/PaymentCard";
import { useExpense } from "../../hooks/useExpense";
import { ExpenseCard } from "./ExpenseCard";
import PhoneInput from "../../utils/phoneInput";
import axios from "axios"

const methods = [
{
    value:"ORANGE_MONEY",
    label:"Orange Money",
    logo:"/payments/orange-money.png"
},
{
    value:"MTN_MOMO",
    label:"MTN MoMo",
    logo:"/payments/mtn.png"
},
{
    value:"MOOV_MONEY",
    label:"Moov Money",
    logo:"/payments/moov.png"
},
{
    value:"WAVE",
    label:"Wave",
    logo:"/payments/wave.png"
},
{
    value:"BANK",
    label:"Banque",
    logo:"/payments/bank.png"
},
{
    value:"CASH",
    label:"Espèces",
    logo:"/payments/cash.png"
}
]

export const ExpensePage = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [reschedule, setReschedule] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [methods, setMethods] = useState([]);
  console.log("methods.data", methods)
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

  const methodUrl = import.meta.env.VITE_METHOD_URL
  
  useEffect(() => {
    const getMethods = async () => {
      console.log("methodUrl", methodUrl)
      try {
        const response = await axios.get(methodUrl);
        const data = response?.data?.data;
        // console.log("data", data.success)
        setMethods(data);
      } catch (error) {
        console.error("Erreur de récupération des méthodes de paiement :", error)
      }
    }
    getMethods()
  }, [])
  

const [form, setForm]=useState({
    name:"",
    amount:"",
    description:"",
    method:"",
    countryName:"",
    countryCode:"+225",
    countryIso:"ci",
    phoneNumber:"",
    savedPhoneId:""
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
      countryName:"Côte d'Ivoire",
      countryCode: "+225",
      countryIso: "CI",
      savedPhoneId: "",
    });
    setSelectedExpense(null);
    setActiveModal(false);
  };

  const handleSubmit = async () => {
    try {
      if (reschedule === "Modifier") {
        await updateExpense(selectedExpense.id, form);
        logData("form & id", form)
        // alert("Expense modifié !");
      } else {
        await addExpense(form);
        // alert("Expense ajouté !");
        logData("form", form)
      }
      resetForm();
      getAllExpenses();
      setReschedule(false);
    } catch (err) {
      console.error(err);
    }
  };

const handleCountryChange = ({ code, iso, name }) => {
  setForm((prev) => ({
    ...prev,
    countryName: name,
    countryCode: code,
    countryIso: iso,
    method: "",
  }));
};

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setForm({
      name: expense.name,
      description: expense.description,
      phoneNumber: expense.phoneNumber,
      amount: expense.amount,
      method: expense.method,
      countryName:"Côte d'Ivoire",
      countryCode: expense.countryCode || "+225",
      countryIso: expense.countryIso || "ci",
      savedPhoneId: expense.savedPhoneId || "",
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
  const filteredExpenses = safeExpenses.filter((e) => {
  const matchSearch =
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.method?.toLowerCase().includes(search.toLowerCase());

  if (!matchSearch) return false;

  if (statusFilter === "ALL") return true;

  return e.status === statusFilter;
});

  // stats
  const total = safeExpenses.length;

const pendingCount = safeExpenses.filter(
  (e) => e.status === "PENDING"
).length;

const approvedCount = safeExpenses.filter(
  (e) => e.status === "APPROVED"
).length;

const rejectedCount = safeExpenses.filter(
  (e) => e.status === "REJECTED"
).length;

  if (loading) {
    return <div>Chargement en cours ...</div>;
  }

const selectedCountry = methods.find( (country) => country.code === form.countryIso);
const availableMethods = selectedCountry?.paymentMethods || [];

  return (
    <div className="md:p-6 grid  gap-6">
       <div>
            <h1>Gestion des dépenses</h1>
        </div>
      {/* zone de filtre et stats + boutton ajouter */}
      <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* LEFT: STATS */}
        <div className="flex gap-4 text-sm flex-wrap">
          <div className="bg-gray-100 px-3 py-1 rounded-xl">
            Total: <span className="font-semibold">{total}</span>
          </div>

          <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-xl">
            En attente: {pendingCount}
          </div>

          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">
            Validées: {approvedCount}
          </div>

          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">
            Refusées: {rejectedCount}
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
            <option value="PENDING">En attente</option>
            <option value="APPROVED">Validées</option>
            <option value="REJECTED">Refusées</option>
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
      {expenses.length > 0 ? (
        <div className="space-y-1 grid ">
          {filteredExpenses.map((expense) => (
          <ExpenseCard expense={expense} key={expense.id} setReschedule={setReschedule}
            resetForm={resetForm} setActiveUpdateModal={setActiveModal} handleEdit={handleEdit} 
            handleDelete={handleDelete}
          />
          ))}
        </div>
      ): null}

      {activeModal && (
        <div>
          <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={false}
            maxWidth="max-w-lg"
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
                textarea
                rows={2}
                value={form.description}
                type="text"
                placeholder="Description"
                onChange={(e) => handleChange("description", e.target.value)}
              />

             <div className="flex rounded-xl ">
                <PhoneInput
                  type="tel"
                  value={form.phoneNumber}
                  countryName={form.countryName}
                  countryCode={form.countryCode}
                  countryIso={form.countryIso}
                  defaultCountry="ci"
                  onCountryChange={handleCountryChange}
                  onChange={(e) =>
                    handleChange("phoneNumber", e.target.value)
                  }
                  className="flex-1 px-3 py-3 outline-none"
                  placeholder="Numéro de retrait"
                />
              </div>
              
              {/*<div className="grid grid-cols-2 gap-3">
              {methods?.map(method=>(
                <div
                  key={method.value}
                  onClick={()=>handleChange("method",method.value)}
                  className={` cursor-pointer rounded-xl border p-4 flex flex-col items-center transition
                    ${ form.method===method.value ? "border-orange-500 bg-orange-50" :"border-gray-200" }
                  `}>

                  <img src={method.logo} className="h-10 object-contain" />
                  <p className="text-sm mt-2"> {method.label} </p>
                </div>
              ))}
              </div> */}
              <div className="grid grid-cols-2 gap-3">
                {availableMethods.map((method) => (
                  <div
                    key={method.key}
                    onClick={() => handleChange("method", method.key)}
                    className={`
                      cursor-pointer rounded-xl border p-4
                      flex flex-col items-center transition
                      ${
                        form.method === method.key
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <img
                      src={method.iconUrl}
                      alt={method.name}
                      className="h-10 w-10 object-contain"
                    />

                    <p className="text-sm mt-2">
                      {method.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSubmit}>{submitTitle()}</Button>

                {reschedule && (
                  <Button onClick={resetForm} variant="secondary" className="bg-gray-400 px-4 py-2 w-full" >
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
