
// import { useEffect, useState } from "react";
// import Input from "../../utils/input";
// import Button from "../../utils/button";
// import { Modal } from "../../utils/Modal";
// import { logData } from "../../utils/console";
// import { PaymentCard } from "../cards/PaymentCard";
// import { Link } from "react-router-dom";
// import { useCotisation } from "../../hooks/useCotisation";
// import { dateUi } from "../../helper/date";
// import { capitalize } from "../../helper/Capitalizer";

// export const Cotisation = () => {
//   const [activeModal, setActiveModal] = useState(false);
//   const [reschedule, setReschedule] = useState("");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [selectedCotisation, setSelectedCotisation] = useState(null);
//   const {
//     loading,
//     cotisation,
//     cotisations,
//     addCotisation,
//     updateCotisation,
//     getCotisations,
//     getCotisation,
//     deleteCotisation,
//   } = useCotisation();
//   logData("cotisations", cotisations)
//   const [form, setForm] = useState({ //     
//     title: "",
//     description: "",
//     // phoneNumber: "",
//     amount: "",
//     period: "",
//   });

//   const handleChange = (name, value) => {
//     setForm({ ...form, [name]: value });
//   };

//   const resetForm = () => {
//     setForm({
//       title: "",
//       description: "",
//     //   phoneNumber: "",
//       amount: "",
//       period: "",
//     });
//     setSelectedCotisation(null);
//     setActiveModal(false);
//   };

//   const handleSubmit = async () => {
//     try {
//       if (reschedule === "Modifier") {
//         await updateCotisation(selectedCotisation.id, form);
//         // alert("cotisation modifié !");
//       } else {
//         await addCotisation(form);
//         // alert("cotisation ajouté !");
//       }
//       resetForm();
//       getCotisations();
//       setReschedule(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   const handleEdit = (cotisation) => {
//     setSelectedCotisation(cotisation);
//     setForm({
//       title: cotisation.title,
//       description: cotisation.description,
//     // //   phoneNumber: cotisation.phoneNumber,
//       amount: cotisation.amount,
//       period: cotisation.period,
//     });
//   };



//     const handleDelete = async (cotisation) => {
//     if (confirm("Supprimer cette cautisation ?")) {
//       await deleteCotisation(cotisation.id);
//     }
//     getCotisations()
//   };

//   useEffect(() => {
//     getCotisations()
//   }, []);

//   const getTitle = () => {
    
//      if (reschedule === "Modifier") {
//       return "Modifier une dépense";
//     } else {
//       return "Ajouter une dépense";
//     }
//   };

//   const submitTitle = () => {
//     if (reschedule === "Modifier") {
//       return "Modifier";
//     } else {
//       return "Ajouter ";
//     }
//   };

//   // filtrage
//   const safecotisations = Array.isArray(cotisations) ? cotisations : [];
//   // filtrage simple
//   const filteredcotisations = safecotisations?.filter((e) => {
//     const matchSearch =
//       e.title.toLowerCase().includes(search.toLowerCase()) ||
//       e.period?.toLowerCase().includes(search.toLowerCase());

//     if (statusFilter === "ALL") return matchSearch;
//     if (statusFilter === "ACTIVE") return matchSearch && e.isActive;
//     if (statusFilter === "INACTIVE") return matchSearch && !e.isActive;

//     return matchSearch;
//   });

//   // stats
//   const total = cotisations?.length || 0;
//   const activeCount = safecotisations.filter((e) => e.amount)?.length;
//   const inactiveCount = total - activeCount;

//   if (loading) {
//     return <div>Chargement en cours ...</div>;
//   }
//   return (
//     <div className="md:p-6 grid  gap-6">
//        <div>
//             <h1>Gestion des cautisations</h1>
//         </div>
//       {/* zone de filtre et stats + boutton ajouter */}
//       <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         {/* LEFT: STATS */}
//         <div className="flex gap-4 text-sm">
//           <div className="bg-gray-100 px-3 py-1 rounded-xl">
//             Total: <span className="font-semibold">{total}</span>
//           </div>
//           <div className="bg-green-100 text-green-700 px-3 py-1 rounded-xl">
//             Actifs: {activeCount}
//           </div>
//           <div className="bg-red-100 text-red-700 px-3 py-1 rounded-xl">
//             Inactifs: {inactiveCount}
//           </div>
//         </div>

//         {/* CENTER: FILTER */}
//         <div className="flex gap-2 flex-1 md:max-w-md">
//           <input
//             type="text"
//             placeholder="Rechercher..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border rounded-xl px-3 py-2 text-sm"
//           />

//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="border rounded-xl px-2 text-sm"
//           >
//             <option value="ALL">Tous</option>
//             <option value="ACTIVE">Actifs</option>
//             <option value="INACTIVE">Inactifs</option>
//           </select>
//         </div>

//         {/* RIGHT: ADD BUTTON */}
//         <Button
//           children="+ Ajouter"
//           onClick={(e) => {
//             e.stopPropagation();
//             resetForm();
//             setReschedule("Ajouter");
//             setActiveModal(true);
//           }}
//           className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
//         />
//       </div>
//       {/* </div> */}
//       {/* LISTE cotisationS */}
//       {cotisations?.length > 0 && (
//         <div className="space-y-1 grid mt-5">
//           {cotisations.map((cotisation) => (
            
//         <Link
//         to={`/paiment-detail/${cotisation.id}`}
//         // key={index}
//         className="grid grid-cols-2 md:grid-cols-3 p-1 md:p-3 rounded-lg bg-slate-100  hover:bg-gray-100 transition w-full  md:justify-around"
//       >
//         <div className="col-span-1 text-start">
//           <p className="font-semibold ">{capitalize(cotisation?.title || "carte")}</p>
//           {/* <p className="text-sm text-gray-500 md:hidden">{cotisation?.date}</p> */}
//         </div>

//         <div className="text-center col-span-1">
//           <p className="font-bold text-green-600"> {cotisation?.amount} FCFA</p>
//         </div>
//         <div className="md:col-span-1 text-end">
//           <p className="text-sm text-gray-500 hidden md:block">
//             {dateUi(cotisation?.period)}
//           </p>
//         </div>
//       </Link>
               
          
//           ))}
//         </div>
//       )}

//       {activeModal && (
//         <div>
//           <Modal
//             isOpen={activeModal}
//             onClose={() => setActiveModal(false)}
//             showCloseButton={false}
//           >
//             {/* FORMULAIRE */}
//             <div className="bg-white shadow-xl  rounded-2xl p-5 space-y-4">
//               <h2 className="text-xl font-semibold">{getTitle()}</h2>

//               <Input
//                 value={form.title}
//                 type="text"
//                 placeholder="Titre"
//                 onChange={(e) => handleChange("title", e.target.value)}
//               />

//               <Input
//                 value={form.amount}
//                 type="number"
//                 placeholder="Montant"
//                 onChange={(e) => handleChange("amount", e.target.value)}
//               />

//               <Input
//                 value={form.description}
//                 type="text-area"
//                 placeholder="Description"
//                 onChange={(e) => handleChange("description", e.target.value)}
//               />

//               {/* <Input
//                 // value={form.phoneNumber}
//                 type="tel"
//                 placeholder="Numero"
//                 onChange={(e) => handleChange("phoneNumber", e.target.value)}
//               /> */}
             
//               <Input
//                 value={form.period}
//                 type="date"
//                 placeholder="periode"
//                 onChange={(e) => handleChange("period", e.target.value)}
//               />

//               <div className="flex gap-2">
//                 <Button onClick={handleSubmit}>{submitTitle()}</Button>

//                 {reschedule && (
//                   <Button onClick={resetForm} variant="secondary" className="bg-gray-400 px-4 py-2 w-full" >
//                     Annuler
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </Modal>
//         </div>
//       )}
//     </div>
//   );
// };
