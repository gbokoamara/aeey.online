import BackButton from "../utils/backButton";
import { UpdateForm } from "../component/form/profilForm";
import { useUser } from "../hooks/useUser";

export const MemberPage = () => {
  const { memberRequest } = useUser()

  const handleSubmit = (cardData) => {
     alert("demande de verification soumis avec succès !")
    memberRequest(cardData)
    // redirect("/home")
  };
  const title= "Vérification membre"
  return (
    <div className="min-h-screen  flex justify-center items-center p-4">
      <BackButton className="absolute top-10 max-md:left-4" />
      <UpdateForm handleValidate={handleSubmit} title={title} />
    </div>
  );
};