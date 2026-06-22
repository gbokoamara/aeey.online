import { useEffect, useState } from "react";
import { pendingMembers } from "../../../data/payment";
import { useMember } from "../../../hooks/useMember";
import { logData } from "../../../utils/console";

export const ValidateMemberPage = () => {
  const {
    loading,
    member,
    members,
    updatemember,
    getAllmembers,
    getmember,
    deletemember,
    getPendingMembers,
  } = useMember()
  // const [members, setMembers] = useState(pendingMembers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  logData("members",members)
  // const members = members.filter(m => !m.isMember);

  useEffect(() =>{
    getAllmembers()
    getPendingMembers()
  }, [])

  const handleOpenModal = () => {
    if (members.length === 0) return;
    setCurrentIndex(0);
    setIsOpen(true);
  };

  const handleValidate = () => {
    const memberToValidate = members[currentIndex];

    const updatedMembers = members.map(m =>
      m.id === memberToValidate.id
        ? { ...m, isMember: true }
        : m
    );

    setMembers(updatedMembers);

    // passer au suivant
    if (currentIndex + 1 < members.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsOpen(false); // fini
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-lg font-semibold mb-4">
        Validation des membres
      </h1>

      {/* LISTE */}
      <div className="space-y-3">
        {members.map(member => (
          <div
            key={member.id}
            className="bg-white p-3 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {member.firstName} {member.lastName}
              </p>
              <p className="text-sm text-gray-500">
                {member.number}
              </p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                member.isMember
                  ? "bg-green-100 text-green-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {member.isMember ? "Validé" : "En attente"}
            </span>
          </div>
        ))}
      </div>

      {/* BOUTON */}
      {members.length > 0 && (
        <button
          onClick={handleOpenModal}
          className="fixed bottom-4   bg-black text-white py-3 rounded-xl w-90 md:w-4xl "
        >
          Valider ({members.length})
        </button>
      )}

      {/* MODAL */}
      {isOpen && members[currentIndex] && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-2xl p-4 md:w-6xl ">
            <h2 className="text-lg font-semibold mb-3">
              Vérification membre
            </h2>

            <div className="space-y-2">
              <p>
                <strong>Nom:</strong>{" "}
                {members[currentIndex].firstName}{" "}
                {members[currentIndex].lastName}
              </p>
              <p>
                <strong>Téléphone:</strong>{" "}
                {members[currentIndex].number}
              </p>
              <p>
                <strong>Statut:</strong>{" "}
                {members[currentIndex].satisfiestatut}
              </p>
            </div>

            <button
              onClick={handleValidate}
              className="mt-4 w-full bg-green-500 text-white py-3 rounded-xl"
            >
              Valider
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full text-gray-500"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};