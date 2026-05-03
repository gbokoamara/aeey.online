
import { useState } from 'react'
import '../App.css'
import Button from '../utils/button'
import Input from '../utils/input'
import {useNavigate} from 'react-router-dom'
// import { user } from '../data/payment'
import { useAppNavigation } from '../hooks/useAppNavigation'
import { useAuth } from '../hooks/useAuth'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { logData } from '../utils/console'


export const LoginPage = () => {
  const { goTo } = useAppNavigation();
  const { login } = useAuth();
  const {getItem} = useLocalStorage()
  
  
  
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!number) {
      return alert("Numero de téléphone obligatoire !")
    }
    const userData =  await login(name, number);
    goTo("/home", {state:{userData}})
  }

  return (
    <>
      <section className=' flex justify-center items-center h-[88vh] md:h-[91vh] min-w-screen px-10'
      // className='bg-slate-800 text-white flex justify-center items-center min-h-screen min-w-screen p-10'
      >
        
        <div className='flex flex-col gap-10 text-center bg-amber-50 text-black h-full w-full justify-center items-center md:w-3xl md:h-96 rounded-2xl'>
          <div className='grid gap-5 '>
            <h1>bienvenue chez A.E.E.Y !</h1>
            <p>Pour commencer, entrez votre nom et votre numero mobile.</p>
          </div>
          <div>
            <Input type={"text"} placeholder={"Nom"}  onChange={(e)=> setName(e.target.value)} />
          </div>
          <div>
            <Input type={"tel"} placeholder={"Telephone"} onChange={(e)=> setNumber(e.target.value)} value={number} required={true}  />
            </div>
            <div className='text-center'>
              <Button children="se connecter" onClick={handleSubmit}/>
            </div>
        </div>
        
      </section>

    </>
  )
}


