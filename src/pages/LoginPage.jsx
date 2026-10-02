
import { useState } from 'react'
import '../App.css'
import Button from '../utils/button'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { formatPhoneNumber } from '../helper/formatInputNumber'
import PhoneInput from '../utils/phoneInput'
import { logData } from '../utils/console'
import { toastWarning } from '../helper/toasterHelper'

export const LoginPage = () => {
  const { login } = useAuth();  
  
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || sessionStorage.getItem("redirectAfterLogin") || localStorage.getItem("redirectAfterLogin");
  logData("redirect", redirect)

  
const [form, setForm]=useState({
    name:"",
    number:"",
    countryName:"Côte d'Ivoire",
    countryCode:"+225",
    countryIso:"ci",
});

const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
};

const handleCountryChange = ({ code, iso, name }) => {
  setForm((prev) => ({
    ...prev,
    countryName: name,
    countryCode: code,
    countryIso: iso,
  }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.number) {
        return toastWarning(" Numero de téléphone obligatoire !");
    }

    try {
        setLoading(true);

        const userData = await login(form);

        if (userData) {
            navigate(redirect || "/home", {
                state: { userData },
                replace: true,
            });
        }

    } catch (error) {
        console.error("LOGIN ERROR :", error);
    } finally {
        setLoading(false);
    }
};

  return (
    <>
      <section className='grid text-center justify-center items-center h-screen  md:px-10 px-2 '>
        {/* <div className='   min-w-screen md:px-10 '        > */}
          
          <div className='flex flex-col gap-10 p-5 text-center bg-amber-50 text-black   h-96 w-full justify-center items-center md:w-2xl md:h-96 rounded-2xl'>
            <div className='grid gap-5 '>
              <h1 className='uppercase font-serif font-bold'>bienvenue chez A.E.E.Y !</h1>
              <p className='font-serif text-blue-800'>Pour commencer, entrez votre numero de téléphone.</p>
            </div>
            
            <div className='text-center w-full'>
             
              <div className="flex rounded-xl ">
                <PhoneInput
                  type="tel"
                  value={form.number} //countryName
                  countryName={form.countryName}
                  countryCode={form.countryCode}
                  countryIso={form.countryIso}
                  defaultCountry="ci"
                  onCountryChange={handleCountryChange}
                  onChange={(e) =>
                    handleChange("number", e.target.value)
                  }
                  className="flex-1 px-3 py-3 outline-none"
                  placeholder=" 00 05 06 08 11"
                />
              </div>
            </div>
              <div className='text-center w-full'>
                <Button children="se connecter" onClick={handleSubmit} loadingChild="Connexion en cours... " loading={loading} />
              </div>
          </div>
          
        {/* </div> */}
      </section>
    </>
  )
}


