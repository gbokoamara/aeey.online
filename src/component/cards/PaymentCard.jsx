import { Link } from "react-router-dom";
import { capitalize } from "../../helper/Capitalizer";
import { dateUi } from "../../helper/date";

export const PaymentCard = ({ payment }) => {
  return (
    <>
      <Link
        to={`/paiment-detail/${payment.id}`}
        // key={index}
        className="grid grid-cols-2 md:grid-cols-3 py-2 md:p-3 rounded-lg   hover:bg-gray-100 transition w-full  md:justify-around"
      >
        <div className="col-span-1 text-start">
          <p className="font-semibold text-blue-950">{capitalize(payment?.name || "carte")}</p>
          {/* <p className="text-sm text-gray-500 md:hidden">{payment?.date}</p> */}
        </div>

        <div className="text-end col-span-1">
          <p className="font-bold text-blue-950">+ {payment?.amount} FCFA</p>
        </div>
        <div className="md:col-span-1 text-end">
          <p className="text-sm text-gray-500 hidden md:block">
            {dateUi(payment?.createdAt)}
          </p>
        </div>
      </Link>
    </>
  );
};
