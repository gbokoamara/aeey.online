import { Link } from "react-router-dom";
import { capitalize } from "../../helper/Capitalizer";
import { dateUi, shortDateUi } from "../../helper/date";

const enumTypes = [
  {
    key: "COTISATION",
    label: "Cotisation de",
    color: "text-blue-800",
    sign : "+"
  },
  {
    key: "COTISATION_TIER",
    label: "Cotisation (tierce)",
    color: "text-blue-800",
    sign : "+"
  },
  {
    key: "DON",
    label: "Don de",
    color: "text-blue-800",
    sign : "+"
  },
  {
    key: "CARTE",
    label: "Achat de carte",
    color: "text-blue-800",
    sign : "+"
  },
  {
    key: "SERVICE",
    label: "Service",
    color: "text-blue-800",
    sign : "+"
  },
  {
    key: "EVENT",
    label: "Evènement",
    color: "text-blue-800",
    sign : "+"
  },
  {
    key: "WITHDRAW",
    label: "Retrait de",
    color: "text-red-600",
    sign : "-"
  },
];

export const PaymentCard = ({ payment }) => {
  const types = enumTypes.find((enumType) => enumType.key === payment.type);
  console.log("payment", payment);
  console.log("types", types);
  return (
    <>
      <Link
        to={`/paiment-detail/${payment.id}`}
        className={`
          grid py-2 md:p-3  hover:bg-gray-100 transition w-full
          ${types.key ? types.color : "text-green-500 "}
          `}
      >
      <div className="grid w-full">
        <div className=" flex md:grid md:grid-cols-3 ">
            {/* Label + nom */}
            <div className="flex gap-2 text-start min-w-0 ">
              <p className="font-semibold whitespace-nowrap">{types.label}</p>
              <p className="font-serif truncate">{payment?.name?.toLowerCase()}</p>
            </div>

            {/* Montant */}
            <div className="ml-auto md:ml-0 md:flex md:justify-center">
              <p className="font-bold whitespace-nowrap">
                {types.sign} {payment?.amount} FCFA
              </p>
            </div>

            {/* Date */}
            <div className=" text-end">
              <p className="text-sm text-gray-500 hidden md:block">
                {dateUi(payment?.createdAt)}
              </p>
            </div>
        </div>
        <div className="text-start">
          <p className="text-sm text-gray-500 md:hidden ">
            {shortDateUi(payment?.createdAt)}
          </p>
        </div>
      </div>
      </Link>
    </>
  );
};
