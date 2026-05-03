import BackButton from "../utils/backButton";
import { UpdateForm } from "../component/form/profilForm";

export const MemberPage = () => {


  const handleSubmit = () => {
     alert("demande de verification soumis avec succès !")
    // console.log({ ...form, photo });
    redirect("/home")
  };
  const title= "Vérification membre"
  return (
    <div className="min-h-screen  flex justify-center items-center p-4">
      <BackButton className="absolute top-10 max-md:left-4" />
      <UpdateForm handleValidate={handleSubmit} title={title} />
    </div>
  );
};