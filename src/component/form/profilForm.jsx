import { useState } from "react";
import { pendingMembers } from "../../data/payment";
import { useRedirect } from "../../hooks/useNavigate";
import Input from "../../utils/input";
import ImageUpload from "../../utils/imageUpload";
import Button from "../../utils/button";
import { memberOnLocal, userOnLocal } from "../../helper/getUser";
import { logData } from "../../utils/console";

export const UpdateForm = ({ handleValidate, title }) => {
  const user = userOnLocal();
  const member = memberOnLocal();
  const redirect = useRedirect();
  const [step, setStep] = useState(0);
  const finalUser = user ? user : member;
  const [photo, setPhoto] = useState(user.photo || null);

  const [form, setForm] = useState({
    firstName: finalUser.firstName || "",
    lastName: finalUser.lastName || "",
    dateNaissance: finalUser.birthDate ? finalUser.birthDate.split("T")[0] : "",
    sex: finalUser.sex || "",
    telephone: finalUser.number || "",
    email: finalUser.email || "",
    city: finalUser.city || "",
    address: finalUser.address || "",

    etablissement: finalUser.etablissement || "",
    niveau: finalUser.niveau || "",
    filiere: finalUser.filiere || "",
    matricule: finalUser.matricule || "",

    profession: finalUser.profession || "",
    occupation: finalUser.occupation || "",
    entreprise: finalUser.entreprise || "",
    document: finalUser.document || null,
    dejaMembre: false,
    numeroMembre: finalUser.numeroMembre || "",
    section: finalUser.section || "",
    certifie: false,
    poste: finalUser.poste || "",
    memberType: finalUser.memberType || "",
    statut: finalUser.memberStatus || "", // en_attente | refuse | valide
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
    logData("form", form);
    handleValidate(form);
  };

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
            value={form.dateNaissance}
            onChange={(e) => handleChange("dateNaissance", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Sexe"
            value={form.sex}
            onChange={(e) => handleChange("sex", e.target.value)}
          />

          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Ville"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Village/Quartier"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
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
            value={form.etablissement}
            onChange={(e) => handleChange("etablissement", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Niveau"
            value={form.niveau}
            onChange={(e) => handleChange("niveau", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Filière"
            value={form.filiere}
            onChange={(e) => handleChange("filiere", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Matricule"
            value={form.matricule}
            onChange={(e) => handleChange("matricule", e.target.value)}
          />

          <Input
            type="file"
            onChange={(e) => handleChange("document", e.target.files[0])}
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

          <label className="flex items-center gap-2 text-sm">
            {" "}
            statut social{" "}
          </label>
          <select
            name="memberType"
            id="memberType"
            className="w-full p-2 border rounded-md" // Ajoute tes classes de style ici
            value={form.memberType}
            onChange={(e) => handleChange("memberType", e.target.value)}
          >
            <option value="">Sélectionnez un statut</option>
            <option value="ELEVE">ELEVE</option>
            <option value="ETUDIANT">ETUDIANT</option>
            <option value="PROFESSIONNEL">PROFESSIONNEL</option>
          </select>

          {/* On affiche ces champs UNIQUEMENT si le type est PROFESSIONNEL */}
          {form.memberType === "PROFESSIONNEL" && (
            <>
              <Input
                type="text"
                placeholder="Métier"
                value={form.profession}
                onChange={(e) => handleChange("profession", e.target.value)}
              />

              <Input
                type="text"
                placeholder="Poste en entreprise"
                value={form.occupation}
                onChange={(e) => handleChange("occupation", e.target.value)}
              />

              <Input
                type="text"
                placeholder="Entreprise"
                value={form.entreprise}
                onChange={(e) => handleChange("entreprise", e.target.value)}
              />
            </>
          )}

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

          <Input
            type="text"
            placeholder="Poste dans à l'AEEY"
            value={form.poste}
            onChange={(e) => handleChange("poste", e.target.value)}
          />

          <Input
            type="text"
            placeholder="Section / Promotion"
            value={form.section}
            onChange={(e) => handleChange("section", e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              value={form.certifie}
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
