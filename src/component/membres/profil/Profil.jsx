
import { Navigate } from "react-router-dom"
import { userOnLocal } from "../../../helper/getUser"
import Button from "../../../utils/button"
import { useState } from "react"
import {UpdateForm} from "../../form/profilForm"
import { useUser } from "../../../hooks/useUser"
import { Modal } from "../../../utils/Modal"


export const ProfilPage = () => {
  const [ activeModal, setActiveModal] = useState(false)
    const user = userOnLocal()
    const { update } = useUser()

    const handleValidate = (updateData) => {
      alert(`modification profil avec succès ! ${updateData}`)
      update(updateData)
    }
  
    return(
        <>
        <div className=" space-y-6   ">

          {/* USER CARD */}
          <div className="bg-white p-3 rounded-2xl shadow ">
            <div className="flex items-center gap-3">
              <img
                src={user.photo}
                className="w-14 h-14 rounded-full object-cover border"
              />

              <div>
                <p className="font-bold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>

                <span className="text-xs mt-1 inline-block px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 space-y-1">
              <p>📍 {user.city}</p>
              <p>🏢 {user.occupation}</p>
              <p>📞 {user.number}</p>
              <p>🆔 {user.numeroMembre}</p>
            </div>
          </div>

          {/* FINANCE PREVIEW */}
          <div className="bg-white p-3 rounded-2xl shadow">
            <h2 className="font-bold mb-3">💰 Activité</h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Cotisations :{" "}
                <span className="font-bold">
                  {user.cautisation?.length || 0}
                </span>
              </p>

              <p>
                Total :{" "}
                <span className="font-bold">
                  {user.cautisation?.reduce((a, b) => a + b.montant, 0)} FCFA
                </span>
              </p>

              <p>
                Carte :{" "}
                <span className="font-bold">
                  {user.memberCard?.status || "Aucune"}
                </span>
              </p>
            </div>
 
          </div>
          <Button children="Modifier le profil"  onClick={() => setActiveModal(true)}/>
        </div>
        {activeModal && (
          // formulaire de mise à jour
          <Modal
            isOpen={activeModal}
            onClose={() => setActiveModal(false)}
            showCloseButton={false}
          >
          <UpdateForm handleValidate={handleValidate} title={"modifier le profil"} />    
          </Modal>
          // <div className="fixed inset-0  bg-black/90 py-20">
          //   <Button children="X" onClick={() => setActiveModal(false)} className="bg-amber-50 text-black"/>
          //   <UpdateForm handleValidate={handleValidate} title={"modifier le profil"} />
          // </div>
        )}
        </>
    )
}