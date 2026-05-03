import { useState } from "react";
import { pendingMembers } from "../../data/payment";
import { useRedirect } from "../../hooks/useNavigate";
import Input from "../../utils/input";
import ImageUpload from "../../utils/imageUpload";
import Button from "../../utils/button";
import { userOnLocal } from "../../helper/getUser";

export const UpdateForm = ({ handleValidate, title }) => {
  const user = userOnLocal()
  const redirect = useRedirect();
  const [step, setStep] = useState(0);

  const [photo, setPhoto] = useState(user.photo || null);

    // ,
    // ,
    // photo,
    // city,
    // address,
    // ,
    // occupation,
    // entreprise,
  
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    dateNaissance: user.firstName || "",
    sexe: user.sex || "",
    telephone: user.number || "",
    email: user.email || "",

    etablissement: user.etablissement || "",
    niveau: user.niveau || "",
    filiere: user.filiere || "",
    matricule: user.matricule || "",

    document: user.document || null,

    dejaMembre: false,
    numeroMembre: "",
    section: user.section || "",
    certifie: false,
    statut:"", // en_attente | refuse | valide
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // 🔥 Simulation appel API
  const checkUser = () => {
    // Exemple fake (remplace par API)
    if (form.telephone === "0700000000") {
      setForm((prev) => ({
        ...prev,
        nom: "Kouassi",
        lastName: "Jean",
        statut: "en_attente",
      }));
    }
    nextStep();
  };

  const handleSubmit = () => {
    handleValidate(form)
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
      <h2 className="text-xl font-bold text-center">{title}</h2>

      {/* ---------------- STEP 0 ---------------- */}
      {step === 0 && (
        <>
          <p className="font-semibold">Identification</p>

          <Input
            type="text"
            placeholder="Nom"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Prénom"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />

          <Input
            type="tel"
            placeholder="Téléphone"
            value={form.telephone}
            onChange={(e) => handleChangee("telephone", e.target.value)}
          />

          <Button children="Continuer" onClick={checkUser} />

          {/* Statut */}
          {form.statut && (
            <p className="text-sm text-center text-red-500">
              Statut actuel : {form.statut}
            </p>
          )}
        </>
      )}

      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <>
          <p className="font-semibold">Informations personnelles</p>

          <ImageUpload onImageSelect={setPhoto} />

          <Input
            type="date"
            onChange={(e) => handleChange("dateNaissance", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Sexe"
            onChange={(e) => handleChange("sexe", e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <div className="flex justify-between gap-1">
            <Button children="Retour" onClick={prevStep} />
            <Button children="Suivant" onClick={nextStep} />
          </div>
        </>
      )}

      {/* ---------------- STEP 2 ---------------- */}
      {step === 2 && (
        <>
          <p className="font-semibold">Informations académiques</p>

          <Input
            type="text"
            placeholder="Établissement"
            onChange={(e) => handleChange("etablissement", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Niveau"
            onChange={(e) => handleChange("niveau", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Filière"
            onChange={(e) => handleChange("filiere", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Matricule"
            onChange={(e) => handleChange("matricule", e.target.value)}
          />

          <div className="flex justify-between gap-1">
            <Button children="Retour" onClick={prevStep} />
            <Button children="Suivant" onClick={nextStep} />
          </div>
        </>
      )}

      {/* ---------------- STEP 3 ---------------- */}
      {step === 3 && (
        <>
          <p className="font-semibold">Justificatif (carte scolaire ou cni) </p>

          <input
            type="file"
            onChange={(e) => handleChange("document", e.target.files[0])}
          />

          <div className="flex justify-between gap-1">
            <Button children="Retour" onClick={prevStep} />
            <Button children="Suivant" onClick={nextStep} />
          </div>
        </>
      )}

      {/* ---------------- STEP 4 ---------------- */}
      {step === 4 && (
        <>
          <p className="font-semibold">Lien avec l'association</p>

          {/* Checkbox */}
          {/* <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.dejaMembre}
                onChange={(e) =>
                  handleChange("dejaMembre", e.target.checked)
                }
              />
              Déjà membre
            </label> */}

          {/* Condition */}
          {/* {form.dejaMembre && (
              <Input
                type="text"
                placeholder="Numéro membre"
                onChange={(e) =>
                  handleChange("numeroMembre", e.target.value)
                }
              />
            )} */}

          <Input
            type="text"
            placeholder="Section / Promotion"
            onChange={(e) => handleChange("section", e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              onChange={(e) => handleChange("certifie", e.target.checked)}
            />
            Je certifie que les informations sont exactes
          </label>

          <div className="flex justify-between gap-1">
            <Button children="Retour" onClick={prevStep} />
            <Button children="Envoyer" onClick={handleSubmit} />
          </div>
        </>
      )}
    </div>
  );
};
