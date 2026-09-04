import {  History, Landmark, IdCard, UserCheck, HandCoins, ChartNoAxesCombined } from "lucide-react";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const IconNav = () => {
  const {goTo} = useAppNavigation();

  const handleSubmit = () => {
    goTo("/paiement", {
      state: {
        type:"cautisation",
      },
    });
  };
  return (
    <div className=" flex gap-6 w-full md:w-3xl  md:justify-around overflow-hidden "> 
      {/* fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-full */}
      <button onClick={handleSubmit}  className="p-2 rounded-full bg-green-200 text-red-800 hover:bg-gray-100 cursor-pointer">
        <Landmark className="w-7 h-7 md:w-10 md:h-10" /> 
      </button>

      <a href="/historique" className="p-2 rounded-full bg-green-300 text-red-800 hover:bg-gray-100">
        <History className="w-7 h-7 md:w-10 md:h-10" />
      </a>

      <a href="/payments" className="p-2 rounded-full bg-green-300 text-red-800 hover:bg-gray-100">
        <HandCoins className="w-7 h-7 md:w-10 md:h-10" />
      </a>

      <a href="/membre" className="p-2 rounded-full bg-green-300 text-red-800 hover:bg-gray-100">
        <UserCheck className="w-7 h-7 md:w-10 md:h-10" />
      </a>

      <a href="/carte" className="p-2 rounded-full bg-green-300 text-red-800 hover:bg-gray-100">
        <IdCard className="w-7 h-7 md:w-10 md:h-10" />
      </a>

      <a href="/project" className="p-2 rounded-full bg-green-300 text-red-800 hover:bg-gray-100">
        <ChartNoAxesCombined className="w-7 h-7 md:w-10 md:h-10" />
      </a>
    </div>
  );
};

export default IconNav;