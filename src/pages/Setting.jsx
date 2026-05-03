
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { user } from "../data/payment";
import BackButton from "../utils/backButton";
import Button from "../utils/button";

import { CardPage } from "./Card";
import { UserPaymentHistoryPage } from "../component/membres/payment/Payment";
import { ValidateMemberPage } from "../component/membres/validate/ValidateMember";
import { ProfilPage } from "../component/membres/profil/Profil";
import AllPaymentsPage from "../component/payments/AllPayments";
import { Dashboard } from "../component/dashboard/Dashboard";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { logData } from "../utils/console";
import { userOnLocal } from "../helper/getUser";
import { AddEvent } from "../component/events/eventForm";

export const SettingPage = () => {
  const {logout} = useAuth()
  const navigate = useNavigate();
  const user = userOnLocal()
  logData("localUser ", user)

  const [activeComponent, setActiveComponent] = useState(null);

  const isAdmin = user.role === "ADMIN";

  // detect responsive
  const isDesktop = window.innerWidth >= 768;

  //  initialisation selon device
  // useEffect(() => {
  //   if (user.role !== "ADMIN") {
  //     navigate("/home");
  //   }
  // }, []);

  useEffect(() => {
    if (isDesktop) {
      setActiveComponent("profil");
    } else {
      setActiveComponent(null);
    }
  }, [isDesktop]);

  const handleClick = (value) => {
    setActiveComponent(value);
  };

  const handleBack = () => {
    setActiveComponent(null);
  };

  const showComponent = () => {
    switch (activeComponent) {
      case "carte":
        return <CardPage />;
      case "history":
        return <UserPaymentHistoryPage />;
      case "members":
        return <ValidateMemberPage />;
      case "profil":
        return <ProfilPage />;
      case "payments":
        return <AllPaymentsPage />;
      case "dashboard":
        return <Dashboard />;
      case "events":
        return <AddEvent />;  
      default:
        return null;
    }
  };

  const handleLogout = (user) => {
    logout(user);
  };
  
  return (
    <div className="min-h-screen grid md:grid-cols-6 p-2 gap-5">

      {/* ================= MOBILE FULLSCREEN ================= */}
      {activeComponent && !isDesktop && (
        <div className="md:hidden fixed inset-0 bg-white p-4 z-50 overflow-auto">

          <button
            onClick={handleBack}
            className="mb-4 bg-black text-white px-3 py-1 rounded"
          >
            ← Retour
          </button>

          <div className="p-4 bg-slate-100 rounded-2xl shadow">
            {showComponent()}
          </div>

        </div>
      )}

      {/* ================= SIDEBAR ================= */}
      <div className="col-span-1">

        <div className="text-center mt-10 bg-white rounded-2xl p-3">
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-gray-500 text-sm">
            Espace d’administration
          </p>
        </div>

        <div className="mt-6 space-y-6">

          {/* USER CARD */}
          <div className="bg-white p-3 rounded-2xl shadow flex justify-between">
            <p className="font-bold uppercase">
              {user.firstName} {user.lastName}
            </p>

            <p className="bg-purple-300 px-2 rounded text-sm items-center">
              {user.role}
            </p>
          </div>

          {/* USER ACTIONS */}
          <div className="bg-white p-3 rounded-2xl shadow space-y-3">

            <Button
              children="Profil"
              onClick={() => handleClick("profil")}
            />

            <Button
              children="Demande carte"
              onClick={() => handleClick("carte")}
            />

            <Button
              children="Historique"
              onClick={() => handleClick("history")}
            />

            <Button
                children="Paiements"
                onClick={() => handleClick("payments")}
            />

          </div>

          {/* ADMIN ACTIONS */}
          {isAdmin && (
            <div className="bg-gray-900 text-white p-3 rounded-2xl shadow space-y-3">

              <Button
                children="Membres"
                onClick={() => handleClick("members")}
              />

              <Button
                children="Tableau de bord"
                onClick={() => handleClick("dashboard")}
              />

               <Button
                children="Evenements"
                onClick={() => handleClick("events")}
              />

            </div>
          )}

          {/* LOGOUT */}
          <div className="">
            <Button children="Se déconnecter" className={'bg-red-500 hover:bg-red-600'} onClick={handleLogout}/>
          </div>

        </div>
      </div>

      {/* ================= DESKTOP CONTENT ================= */}
      <div className="hidden md:block col-span-5 p-5">

        <div className="bg-slate-200 p-5 h-full rounded-2xl">

          {showComponent() || (
            <div className="text-gray-500 flex items-center justify-center h-full">
              Sélectionne une option
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

