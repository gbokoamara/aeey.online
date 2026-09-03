import { dateUi } from "../../helper/date";
import { Modal } from "../../utils/Modal";
import { useState } from "react";
import { useExpense } from "../../hooks/useExpense";
import { capitalize } from "../../helper/Capitalizer";
import { ExpenseDetailsCard } from "./ExpenseDetailCard";
import Button from "../../utils/button";
import { EllipsisVertical } from "lucide-react";

export const ExpenseCard = ({ expense, setReschedule, resetForm, setActiveUpdateModal, handleEdit, handleDelete }) => {
    const [activeModal, setActiveModal] = useState(false)
    const [expenseId, setExpenseId] = useState(false)
    const [activeMobile, setActiveMobile] = useState(false)

    const {deleteExpense, getAllExpenses} = useExpense()

    const handleClick = (expense) => {
        setExpenseId(expense.id);
        setActiveModal(true)
    }

    const statusField = [
      {status: "PENDING", label:"retrait en attente de validation", color:"text-gray-500"},
      {status: "APPROVED", label:"retrait validé", color:"text-green-500"},
      {status: "REJECTED", label:"retrait refusé", color:"text-red-500"},
    ]
    const currentField = statusField.find((field) => field.status === expense?.status)
  return (
    <>
      <div
        // to={`/paiment-detail/${expense.id}`}
        // key={index}
        onClick={() =>handleClick(expense)}
        className=" relative grid grid-cols-2 md:grid-cols-3 p-1 md:p-3 rounded-lg bg-slate-100  hover:bg-gray-100 transition w-full  md:justify-around cursor-pointer"
      >
        <div className="col-span-1 text-start">
          <p className="font-semibold ">{expense?.name}</p>
          {currentField && ( <p className={`text-sm ${currentField.color} `} >{currentField.label}</p>)}
        </div>

        <div className="text-center col-span-1">
          <p className="font-bold text-green-600">{expense?.amount} FCFA</p>
        </div>
        
        <div className="absolute top-0 right-0 space-x-3 flex">
        { expense?.status === "PENDING" ? (
          <Button
          children="Modifier"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Modifier");
            setActiveUpdateModal(true);
            handleEdit(expense)
          }}
          className="bg-indigo-600 text-white md:inline hidden px-4 py-2 rounded-xl "
        />
        ):null}
        <Button
          children="Suprimer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(expense)
          }}
          className="bg-red-600 text-white md:inline hidden px-4 py-2 rounded-xl w-full"
        />
        </div>
        <div className="md:hidden absolute top-1 right-0"><EllipsisVertical onClick={(e) => {e.stopPropagation(); setActiveMobile(true)}}/></div>
      </div>
      {activeModal &&(
        <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={true}
        >
            <ExpenseDetailsCard expenseId={expenseId}/>
        </Modal>
      )}
      {activeMobile &&(
        <Modal
            isOpen={activeMobile}
            onClose={() => setActiveMobile(false)}
            showCloseButton={true}
        >
        <div className="flex justify-around  gap-1">
        {expense.status === "PENDING" ? (
          <Button
          children="Modifier"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Modifier");
            setActiveUpdateModal(true);
            handleEdit(expense)
          }}
          className="bg-indigo-600 text-white   flex-1 rounded-xl "
        />
        ) : null}
        <Button
          children="Suprimer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(expense)
          }}
          className="bg-red-600 text-white   flex-1 rounded-xl"
        />
        </div>
         </Modal>
      )}
    </>
  );
};
