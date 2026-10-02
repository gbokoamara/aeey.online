import { useEffect, useState } from "react";
import { PaymentCard } from "../cards/PaymentCard";
import Pagination from "../../utils/pagination";
import { usePayment } from "../../hooks/usePayment";
import { Loading } from "../../utils/loading";

const AllPaymentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // nombre de paiements par page
  const { stats, loading, payments, paymentStats, getAllPayments, getPaymentStat } = usePayment();

  useEffect(() =>  {
    getAllPayments(),
    getPaymentStat()
  }, [])

  // 🔹 calcul des éléments à afficher
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  if (loading) {
    return <Loading fullScreen text="Chargement des paiements..." />;
  }
  return (
    <div className="py-3">
      
      {/* Liste */}
      <div className="grid gap-3 justify-center">
        {currentPayments.map((payment) => (
          <PaymentCard payment={payment} key={payment.id} />
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