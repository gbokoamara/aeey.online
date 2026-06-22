import { dateUi } from "../../helper/date";
import { Modal } from "../../utils/Modal";
import { useEffect, useState } from "react";
import { useExpense } from "../../hooks/useExpense";
import { capitalize } from "../../helper/Capitalizer";
import { logData } from "../../utils/console";

export const ExpenseDetailsCard = ({ expenseId }) => {
    const {expense, getExpense} = useExpense()
    useEffect(() =>{
        if (expenseId) {
            getExpense(expenseId)
        }
    }, [expenseId])

    logData("expense",expense)

  return (
    <>
      <div
        className="grid gap-5 p-1 md:p-3 rounded-lg bg-slate-100  hover:bg-gray-100 transition w-full  md:justify-around cursor-pointer"
      >
        <div className=" text-start">
          <p className="font-semibold ">{expense?.name}</p>
        </div>

        <div className="text-start ">
          <p className="font-bold text-green-600">Montant de la depense : {expense?.amount} FCFA</p>
        </div>

        <div className="grid text-start">
            <p>
                Description
            </p>
            <p className="font-semibold ">{expense?.description}</p>
        </div>

        <div className="flex justify-between">
            <p>Creé le </p>
          <p className="text-sm text-gray-500 text-end">
            {dateUi(expense?.createdAt)}
          </p>
        </div>
        {  expense?.updatedAt &&(
            <div className="flex justify-between">
            <p>Modifié le </p>
          <p className="text-sm text-gray-500 text-end">
            {dateUi(expense?.updatedAt)}
          </p>
        </div>
        )}
      </div>
    </>
  );
};
