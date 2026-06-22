import { dateUi } from "../../helper/date";
import { Modal } from "../../utils/Modal";
import { useState } from "react";
import { useExpense } from "../../hooks/useExpense";
import { capitalize } from "../../helper/Capitalizer";
import { ExpenseDetailsCard } from "./ExpenseDetailCard";
import Button from "../../utils/button";

export const ExpenseCard = ({ expense, setReschedule, resetForm, setActiveUpdateModal, handleEdit, handleDelete }) => {
    const [activeModal, setActiveModal] = useState(false)
    const [expenseId, setExpenseId] = useState(false)

    const {deleteExpense, getAllExpenses} = useExpense()

    const handleClick = (expense) => {
        setExpenseId(expense.id);
        setActiveModal(true)
    }

  return (
    <>
      <button
        // to={`/paiment-detail/${expense.id}`}
        // key={index}
        onClick={() =>handleClick(expense)}
        className=" relative grid grid-cols-2 md:grid-cols-3 p-1 md:p-3 rounded-lg bg-slate-100  hover:bg-gray-100 transition w-full  md:justify-around cursor-pointer"
      >
        <div className="col-span-1 text-start">
          <p className="font-semibold ">{expense?.name}</p>
          <p className="text-sm text-gray-500 md:hidden">{expense?.date}</p>
        </div>

        <div className="text-center col-span-1">
          <p className="font-bold text-green-600">{expense?.amount} FCFA</p>
        </div>
        <div className="md:col-span-1 text-end">
          <p className="text-sm text-gray-500 hidden md:block">
            {dateUi(expense?.createdAt)}
          </p>
        </div>
        <div className="absolute top-0 right-0 space-x-3">
        <Button
          children="Modifier"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Modifier");
            setActiveUpdateModal(true);
            handleEdit(expense)
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl "
        />
        <Button
          children="Suprimer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(expense)
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        />
        </div>
      </button>
      {activeModal &&(
        <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={true}
        >
            <ExpenseDetailsCard expenseId={expenseId}/>
        </Modal>
      )}
    </>
  );
};
