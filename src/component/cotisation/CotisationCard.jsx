import { dateUi } from "../../helper/date";
import { Modal } from "../../utils/Modal";
import { useState } from "react";
import { capitalize } from "../../helper/Capitalizer";
// import { ExpenseDetailsCard } from "./ExpenseDetailCard";
import Button from "../../utils/button";
import { EllipsisVertical } from "lucide-react";
import { useCotisation } from "../../hooks/useCotisation";

export const CotisationCard = ({ cotisation, setReschedule, resetForm, setActiveUpdateModal, handleEdit, handleDelete }) => {
    const [activeModal, setActiveModal] = useState(false)
    const [cotisationId, setCotisationId] = useState(false)
    const [activeMobile, setActiveMobile] = useState(false)

    const {deleteCotisation, getAllCotisations} = useCotisation()

    const handleClick = (cotisation) => {
        setCotisationId(cotisation.id);
        setActiveModal(true)
    }

  return (
    <>
      <button
        // to={`/paiment-detail/${Cotisation.id}`}
        // key={index}
        onClick={() =>handleClick(cotisation)}
        className=" relative grid grid-cols-2 md:grid-cols-3 p-1 md:p-3 rounded-lg bg-slate-100  hover:bg-gray-100 transition w-full  md:justify-around cursor-pointer"
      >
        <div className="col-span-1 text-start">
          <p className="font-semibold ">{cotisation?.title}</p>
        </div>

        <div className="text-center col-span-1">
          <p className="text-sm text-gray-500 ">{cotisation?.amount}</p>
        </div>
        {/* <div className="md:col-span-1 text-end">
          <p className="text-sm text-gray-500 hidden md:block">
            {dateUi(cotisation?.period)}
          </p>
        </div> */}
        <div className="absolute top-0 right-0 space-x-3">
        <Button
          children="Modifier"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Modifier");
            setActiveUpdateModal(true);
            handleEdit(cotisation)
          }}
          className="bg-indigo-600 text-white md:inline hidden px-4 py-2 rounded-xl "
        />
        <Button
          children="Suprimer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(cotisation)
          }}
          className="bg-red-600 text-white md:inline hidden px-4 py-2 rounded-xl"
        />
        </div>
        <div className="md:hidden absolute top-1 right-0"><EllipsisVertical onClick={(e) => {e.stopPropagation(); setActiveMobile(true)}}/></div>
      </button>
      {/* {activeModal &&(
        <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={true}
        >
            <CotisationDetailsCard cotisationId={cotisationId}/>
        </Modal>
      )} */}
      {activeMobile &&(
        <Modal
            isOpen={activeMobile}
            onClose={() => setActiveMobile(false)}
            showCloseButton={true}
        >
        <div className="flex justify-around">
        <Button
          children="Modifier"
          onClick={(e) => {
            e.stopPropagation();
            resetForm();
            setReschedule("Modifier");
            setActiveUpdateModal(true);
            handleEdit(cotisation)
          }}
          className="bg-indigo-600 text-white  px-4 py-2 rounded-xl "
        />
        <Button
          children="Suprimer"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(cotisation)
          }}
          className="bg-red-600 text-white  px-4 py-2 rounded-xl"
        />
        </div>
         </Modal>
      )}
    </>
  );
};
