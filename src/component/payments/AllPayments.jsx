import { useState } from "react";
import { PaymentCard } from "../cards/PaymentCard";
import { payments } from "../../data/payment";
import Pagination from "../../utils/pagination";

const AllPaymentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // nombre de paiements par page

  // 🔹 calcul des éléments à afficher
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(payments.length / itemsPerPage);

  return (
    <div className="py-3">
      
      {/* Liste */}
      <div className="grid gap-3 justify-center">
        {currentPayments.map((payment, index) => (
          <PaymentCard payment={payment} key={index} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  );
};

export default AllPaymentsPage;