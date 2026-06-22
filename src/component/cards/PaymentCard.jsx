import { Link } from "react-router-dom";
import { capitalize } from "../../helper/Capitalizer";
import { dateUi } from "../../helper/date";

export const PaymentCard = ({ payment }) => {
  return (
    <>
      <Link
        to={`/paiment-detail/${payment.id}`}
        // key={index}
        className="grid grid-cols-2 md:grid-cols-3 p-1 md:p-3 rounded-lg bg-slate-100  hover:bg-gray-100 transition w-full  md:justify-around"
      >
        <div className="col-span-1 text-start">
          <p className="font-semibold ">{capitalize(payment?.name)}</p>
          {/* <p className="text-sm text-gray-500 md:hidden">{payment?.date}</p> */}
        </div>

        <div className="text-center col-span-1">
          <p className="font-bold text-green-600">+ {payment?.amount} FCFA</p>
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
