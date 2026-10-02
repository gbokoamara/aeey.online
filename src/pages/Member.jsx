import BackButton from "../utils/backButton";
import { UpdateForm } from "../component/form/profilForm";
import { useUser } from "../hooks/useUser";
import { PagesCard } from "../component/pages/PagesCard";
import { useAppNavigation } from "../hooks/useAppNavigation";
import { handleVerification } from "../helper/toasterHelper";

export const MemberPage = () => {
  const { memberRequest } = useUser()
  const {goTo} = useAppNavigation()

  const handleSubmit = async (cardData) => {
     handleVerification(" Voulez-vous enregistrer votre demande de verification ? ",
      async () => {
        const response = await memberRequest(cardData)
        if (response.status === true) {
          goTo("/paiement", {
            state: {
              type:"cautisation",
              cautisationName: "Adhésion",
              member: response?.member,
            },
          });
        }

      }
     )
    
  };
  const title= "Vérification membre"
  return (
    <>
      <PagesCard title="Démande de verification membre">
        <div>
         
            <UpdateForm handleValidate={handleSubmit} title={title} />
        </div>
      </PagesCard>
    </>
  );
};