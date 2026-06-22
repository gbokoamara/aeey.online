import { Link } from "react-router-dom";
import { PaymentCard } from "../cards/PaymentCard";
import { usePayment } from "../../hooks/usePayment";
import { useEffect } from "react";
import { logData } from "../../utils/console";


const PaymentList = ({payments}) => {
logData("payments", payments)
  return (
    <div className="grid gap-3 py-3 ">
      {payments.map((payment) => (
        <PaymentCard payment={payment} key={payment.id}/>
      ))}
    </div>
  );
};

export default PaymentList;