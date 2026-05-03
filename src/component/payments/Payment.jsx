import { Link } from "react-router-dom";
import { PaymentCard } from "../cards/PaymentCard";


const PaymentList = ({ payments }) => {
  return (
    <div className="grid gap-3 py-3 ">
      {payments.map((payment, index) => (
        <PaymentCard payment={payment} key={index}/>
      ))}
    </div>
  );
};

export default PaymentList;