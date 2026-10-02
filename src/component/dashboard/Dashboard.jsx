import { useEffect, useState } from "react";
import { useAdministration } from "../../hooks/useAdministration";
import { useEvent } from "../../hooks/useEvent";
import { useExpense } from "../../hooks/useExpense";
import { useMember } from "../../hooks/useMember";
import { usePayment } from "../../hooks/usePayment";
import { logData } from "../../utils/console";
import { Loading } from "../../utils/Loading";

export const Dashboard = () => {
  const [active, setActive] = useState("events");
  const [newModeratorEmail, setNewModeratorEmail] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("");
  const [configValue, setConfigValue] = useState("");

  const {
      VerifyMembers, pendingMembers, 
      getAllmembers, getPendingMembers 
  } = useMember();
  
  const {
    management, moderator, moderators, //  loading, 
    addModerator, getModerator, getModerators, removeModerator, addManagement, getManagement }
   = useAdministration();

   const {
     loading,
     stats,
     payments,
     paymentStats,
     getAllPayments,
     getPaymentStat,
   } = usePayment();
  const { expenseStats, approvedExpenses, getApprovedExpense } = useExpense();
  const { events, eventStats, getAllActiveEvents } = useEvent();

  const StatsToMap = [
    {
      label: "Membres",
      seeMore: "voir +",
      title: "member",
      name: ` Total :${VerifyMembers.length}`,
    },
    {
      label: "Modérateurs",
      seeMore: "voir +",
      title: "moderators",
      name: ` Total : ${moderators?.length ?? 0}`,
    },

    {
      label: "Paiements ",
      title: "paiements",
      name: ` Total : ${paymentStats?.totalAmount || 0}`,
    },
    {
      label: "Dépenses",
      seeMore: "voir +",
      title: "expenses",
      name: ` Solde : ${expenseStats?.totalAmount || 0}`,
      total: ` Total : ${management?.initialBalance + management?.balance || 0}`,
    },
    {
      label: "Evenements",
      seeMore: "voir +",
      title: "events",
      name: ` Solde : ${eventStats?.totalAmount || 0}`,
    },
    {
      label: "Projets",
      seeMore: "voir +",
      title: "projets",
      name: ` Total : ${stats?.projets || 0}`,
    },
    {
      label: "Configuration",
      seeMore: "voir +",
      title: "config",
      name: ` Total : ${management?.initialBalance + management?.balance || 0}`,
    },
  ];

  useEffect(() => {
    getAllmembers();
    getModerators();
    getManagement();
    getAllPayments();
    getPaymentStat();
    getPendingMembers();
    getAllActiveEvents();
    getApprovedExpense();
  }, []);
  
  // logData("management",management);

  const handleAddModerator = async (e) => {
    e.preventDefault();
    if (!newModeratorEmail.trim()) return;
    await addModerator(newModeratorEmail.trim());
    setNewModeratorEmail("");
    // getModerators();
  };

  const handleRemoveModerator = async (id) => {
    if (!window.confirm("Retirer ce modérateur ?")) return;
    await removeModerator(id);
    // getModerators();
  };

  const handleUpdateConfig = async (e) => {
    e.preventDefault();

    if (!selectedConfig || configValue === "") return;

    try {
      await addManagement({
        config: selectedConfig,
        value: Number(configValue),
      });

      setSelectedConfig("");
      setConfigValue("");
    } catch (error) {
      console.error("Erreur modification configuration :", error);
    }
  };

  if (loading) {
    return (
      <Loading
        fullScreen
        text="Chargement des données du tableau de board..."
      />
    );
  }
  return (
    <div className="md:p-4 space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {StatsToMap.map((stat, index) => (
          <div
            onClick={() => setActive(stat.title)}
            key={index}
            className="text-center p-3 bg-blue-300 cursor-pointer rounded px-1  md:col-span-1"
          >
            <p className="text-md font-semibold">{stat.label} </p>
            <p className="">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* CONTENU DYNAMIQUE SELON L'ONGLET ACTIF */}
      <div className="bg-white rounded-xl p-4 shadow">
        {active === "moderators" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Modérateurs</h2>

            <form onSubmit={handleAddModerator} className="flex gap-2">
              <input
                type="email"
                placeholder="Email du futur modérateur"
                value={newModeratorEmail}
                onChange={(e) => setNewModeratorEmail(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white rounded px-3 py-1 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Ajout..." : "Ajouter"}
              </button>
            </form>

            <ul className="divide-y">
              {moderators?.length ? (
                moderators.map((mod) => (
                  <li
                    key={mod.id}
                    className="flex justify-between items-center py-2"
                  >
                    <span>{mod.name ?? mod.email}</span>
                    <button
                      onClick={() => handleRemoveModerator(mod.id)}
                      className="  text-sm bg-red-500 text-white rounded px-1 md:px-3 py-1 disabled:opacity-50 cursor-pointer"
                    >
                      Supprimer
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Aucun modérateur pour le moment.
                </p>
              )}
            </ul>
          </div>
        )}

        {active === "config" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">
                Configuration de la trésorerie
              </h2>

              <p className="text-sm text-gray-500">
                Sélectionnez une configuration, indiquez sa nouvelle valeur puis
                enregistrez.
              </p>
            </div>

            <form onSubmit={handleUpdateConfig} className="space-y-4 max-w-md">
              {/* Configuration à modifier */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Configuration
                </label>

                <select
                  value={selectedConfig}
                  onChange={(e) => setSelectedConfig(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">-- Sélectionner --</option>

                  <option value="initialBalance">Solde initial</option>

                  <option value="cardAmount">Prix carte membre</option>

                  <option value="payInFee">Frais dépôt (%)</option>

                  <option value="payOutFee">Frais retrait (%)</option>
                </select>
              </div>

              {/* Nouvelle valeur */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nouvelle valeur
                </label>

                <input
                  type="number"
                  min="0"
                   step="any"
                  value={configValue}
                  onChange={(e) => setConfigValue(e.target.value)}
                  placeholder="Entrez la nouvelle valeur"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>

              {/* Bouton */}
              <button
                type="submit"
                disabled={loading || !selectedConfig}
                className="bg-blue-500 text-white rounded px-4 py-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Enregistrement..." : "Enregistrer"}
              </button>
            </form>

            <div>
           
            <div>
              <h2 className="text-md font-serif mb-2">
                Solde initial (non retirable) : {management?.initialBalance} fcfa
              </h2>
              <h2 className="text-md font-serif mb-2">
                Prix de procuration de carte membre : {management?.cardAmount} fcfa
              </h2>
              <h2 className="text-md font-serif mb-2">
                Frais de depot : {management?.payInFee} 
              </h2>
              <h2 className="text-md font-serif mb-2">
                Frais de retrait :  {management?.payOutFee}
              </h2>
            </div>
          </div>
          </div>
        )}

        {active === "paiements" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Paiements</h2>
            <div className=" md:flex  gap-4 ">
              <h3 className="text-lg  mb-2">
                Total : <strong>{paymentStats?.total}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Total paiements & retrait :{" "}
                <strong>{paymentStats?.totalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Paiements pour carte :{" "}
                <strong>{paymentStats?.cardTotalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Paiements pour Evenement :{" "}
                <strong>{paymentStats?.evntTotalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Paiements pour don :{" "}
                <strong>{paymentStats?.donTotalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Paiements pour cotisation :{" "}
                <strong>{paymentStats?.cotisationTotalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Paiements pour cotisation-tierce :{" "}
                <strong>{paymentStats?.terceTotalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Paiements pour service :{" "}
                <strong>{paymentStats?.serviceTotalAmount}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Total retrait :{" "}
                <strong>{paymentStats?.withdrawTotalAmount}</strong>
              </h3>
            </div>
            <ul className="divide-y">
              {payments.map((p) => (
                <li key={p.id} className="py-2">
                  {" "}
                  {p.type}, de {p.amount} par {p.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "member" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Membres</h2>
            <ul className="divide-y">
              {VerifyMembers.map((m) => (
                <li key={m.id} className="py-2">
                  {m.name ?? m.email}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "validation" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Membres en attente de validation
            </h2>
            <ul className="divide-y">
              {pendingVerifyMembers.map((m) => (
                <li
                  key={m.id}
                  className="py-2 flex justify-between items-center"
                >
                  <span>{m.name ?? m.email}</span>
                  {/* Ajoute ici tes actions valider/refuser */}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "expenses" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Dépenses</h2>
            <div className=" md:flex  gap-4 ">
              <h3 className="text-lg  mb-2">
                Total : <strong>{management?.solde || 0 }</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Montant des dépenses :{" "}
                <strong>{expenseStats?.totalAmount || 0}</strong>
              </h3>
            </div>
            <ul className="divide-y">
              {approvedExpenses.map((e) => (
                <li key={e.id} className="py-2">
                  {e.name ?? e.status} - {e.amount} est {e.status}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "events" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Événements</h2>
            <div className=" md:flex  gap-4 ">
              <h3 className="text-lg  mb-2">
                Total d'evenement : <strong>{eventStats.total}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Total collecté : <strong>{eventStats.totalCollected}</strong>
              </h3>
              <h3 className="text-lg  mb-2">
                Total participant :{" "}
                <strong>{eventStats.totalParticipant}</strong>
              </h3>
            </div>
            <ul className="divide-y">
              {events.map((ev) => (
                <li key={ev.id} className="py-2">
                  {ev.title} - {ev.amount} - {ev.participantCount} -{" "}
                  {ev.collectedAmount}{" "}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "projets" && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Projets</h2>
            <p className="text-sm text-gray-500">
              À implémenter (pas de hook `useProjet` fourni pour l'instant).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
