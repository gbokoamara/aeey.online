import { useEffect, useState } from "react";
import axios from "axios";
import { countries as localCountries } from "../helper/countries";

const PhoneInput = ({
  value,
  onChange,
  required = false,
  className = "",
  placeholder,
  countryName = "",
  countryCode = "+225",
  countryIso = "ci",
  onCountryChange,
  defaultCountry = "ci",
  ...props
}) => {
  const [methods, setMethods] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const methodUrl = import.meta.env.VITE_METHOD_URL;

  useEffect(() => {
    const getMethods = async () => {
      try {
        const response = await axios.get(methodUrl);

        const data = response?.data?.data || [];

        setMethods(data);
      } catch (error) {
        console.error(
          "Erreur de récupération des pays MoneyFusion :",
          error
        );
      }
    };

    getMethods();
  }, [methodUrl]);

  // On prend uniquement les pays disponibles chez MoneyFusion et on leur ajoute les informations provenant de notre helper : - flag
  const countries = methods
    .map((apiCountry) => {
      const localCountry = localCountries.find((country) => country.iso?.toUpperCase() === apiCountry.code?.toUpperCase());

      if (!localCountry) {
        return null;
      }

      return {
        // Informations MoneyFusion
        name: apiCountry.country,
        iso: apiCountry.code,
        code: apiCountry.code,
        currency: apiCountry.currency,
        paymentMethods: apiCountry.paymentMethods,

        // Flag venant du helper
        flag: localCountry.flag,
      };
    })
    .filter(Boolean);

  /*
   * Pays actuellement sélectionné
   */
  const selectedCountry =
    countries.find((country) => country.iso === countryIso) ||
    countries.find((country) => country.name === countryName) ||
    countries.find((country) => country.code === countryCode) ||
    countries.find((country) => country.iso === defaultCountry) ||
    countries[0];

  const handleSelectCountry = (country) => {
    setIsOpen(false);

    if (onCountryChange) {
      onCountryChange({
        name: country.name,
        code: country.code,
        iso: country.iso,
      });
    }
  };

  return (
    <div className="flex gap-2 w-full">

      {/* COUNTRY SELECT */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-full min-w-27.5 flex items-center justify-center gap-2 px-3 py-2 border-2 border-gray-400 rounded-lg bg-white"
        >
          {selectedCountry && (
            <>
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="w-6 h-4 object-cover"
              />

              <span className="font-medium">
                {selectedCountry.code.toUpperCase()}
              </span>

              <span className="text-xs">
                {isOpen ? "▲" : "▼"}
              </span>
            </>
          )}
        </button>

        {/* DROPDOWN */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-70 max-h-75 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-2xl z-9999">

            {countries.map((country) => (
              <button
                key={country.iso}
                type="button"
                onClick={() => handleSelectCountry(country)}
                className="w-full flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-gray-100 text-left"
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-7 h-5 object-cover shrink-0"
                />

                <span className="flex-1 text-sm">
                  {country.name.toUpperCase()}
                </span>

                <span className="text-sm font-medium text-gray-600">
                  {country.code.toUpperCase()}
                </span>
              </button>
            ))}

          </div>
        )}
      </div>

      {/* PHONE NUMBER */}
      <input
        type="tel"
        placeholder={placeholder || "Numéro de téléphone"}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          flex text-center w-full px-4 py-2
          border-2 border-gray-400 rounded-lg
          outline-none focus:ring-2 focus:ring-blue-500
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default PhoneInput;
