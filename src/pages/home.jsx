
import { useState } from 'react'
import '../App.css'
import Button from '../utils/button'
import Input from '../utils/input'
import {useLocation, useNavigate} from 'react-router-dom'
// import ImageFull from '../utils/Image'
import CarteMembreAEEY from '../component/membres/Carte/CarteMembreAEEY'
import IconNav from '../component/services/nav'
// import PaymentList from '../component/membres/payment/Payment'
import { payments } from '../data/payment'
import { useAppNavigation } from '../hooks/useAppNavigation'
import PaymentList from '../component/payments/Payment'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { logData } from '../utils/console'
import { useEffect } from 'react'
import PinInput from '../utils/pinInput'
import { useAuth } from '../hooks/useAuth'
import { userOnLocal } from '../helper/getUser'
import { Events } from '../component/events/events'


export const HomePage = () => {
  const [showCreatePin, setShowCreatePin] = useState(false);
  const {getItem, setItem} = useLocalStorage()
  const { getState } = useAppNavigation();
  const state = getState();
  if (state) { console.log("state at home :=>", state)}
  const user = userOnLocal()
  const { createPin } = useAuth();
  logData("userData at home", user)

  useEffect(() => {
  if (user && user.havePass === false) {
    setShowCreatePin(true);
  }
}, [user]);

const handleCreatePin = async (pin) => {
  console.log("Nouveau PIN:", pin);

  // API backend
  const updatedUser = await createPin(pin, user.id)
  logData("user modifié", updatedUser)
  setItem("user", updatedUser);

  setShowCreatePin(false);
};

  const finalFirstName = user?.firstName ||  state?.member?.name || state?.user?.firstName
  const finalLastName= user?.lastName ||  state?.member?.name || state?.user?.lastName
  const finalPhoto = user?.photo ||  state?.member?.photo || state?.user?.photo
  const finalDate= user?.date ||  state?.member?.date || state?.user?.date


  return (
    <>
      <section className='relative bg-green-600 grid  h-full  '>
        <div className='h-36 '></div>
        <div className='bg-blue-400 h-40 md:h-70 w-[70%] md:w-[40%] absolute rounded-2xl z-30 top-16 left-1/2 -translate-x-1/2 '>
        <CarteMembreAEEY 
              nom={finalFirstName}
              prenoms={finalLastName}
              photo={state?.member?.photo}
              days={state?.member?.date}
        />
        </div>
        
          <div className=' flex flex-col gap-10 pt-24  md:pt-56 text-center w-full  h-auto  text-black justify-start items-center rounded-t-2xl '>
          <div className='grid gap-5 '>
            <h1>bienvenue chez A.E.E.Y !</h1>
            <IconNav/>
          </div>
          <div>
            <Events/>
          </div>
          <div className=" w-[80%] md:w-[40%]">
            <PaymentList payments={payments} />
          </div>
        </div>
      </section>
      {showCreatePin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-[90%] max-w-sm">
            <h2 className="mb-2 font-semibold text-lg">
              Créer votre code PIN
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Ce code vous permettra d'accéder à votre solde
            </p>

            <PinInput length={4} onComplete={handleCreatePin} />

            {/* ❌ pas de bouton annuler ici → obligatoire */}
          </div>
        </div>
      )}
    </>
  )
}

