import { useEffect, useState } from "react";
import { useMember } from "../../../hooks/useMember";
import { logData } from "../../../utils/console";

export const MembersPage = () => {
  const [openMemberId, setOpenMemberId] = useState(null);

  const {
    loading,
    VerifyMembers,
    getAllmembers,
  } = useMember();

  const handleToggleMember = (id) => {
    setOpenMemberId((prev) =>
      prev === id ? null : id
    );
  };

  useEffect(() => {
    getAllmembers();
  }, []);

  logData("members", VerifyMembers);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold">
            Membres de l'A.E.E.Y
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Liste des membres enregistrés
          </p>
        </div>

        {/* CHARGEMENT */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Chargement des membres...
          </div>
        )}

        {/* AUCUN MEMBRE */}
        {!loading && VerifyMembers?.length === 0 && (
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <p className="text-gray-500">
              Aucun membre trouvé.
            </p>
          </div>
        )}

        {/* LISTE */}
        {!loading && VerifyMembers?.length > 0 && (
          <div className="space-y-3">

            {VerifyMembers.map((member) => {
              const isOpen = openMemberId === member.id;

              return (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-sm p-4"
                >

                  {/* INFORMATIONS PRINCIPALES */}
                  <div className="flex items-center justify-between gap-4 relative">

                    {/* MEMBRE */}
                    <div className="min-w-0">
                      <h2 className="font-medium truncate">
                        {member.firstName} {member.lastName}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {member.number}
                      </p>

                      {member.email && (
                        <p className="text-sm text-gray-500 truncate">
                          {member.email}
                        </p>
                      )}
                    </div>

                    {/* PHOTO + STATUT */}
                    <div className="shrink-0 flex items-center gap-3">

                      <div className="flex flex-col items-center gap-2">

                        <img
                          src={member.photo}
                          alt={`${member.firstName} ${member.lastName}`}
                          className="h-14 w-14 rounded-full object-cover"
                        />

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            member.isMember
                              ? "bg-green-100 text-green-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {member.isMember
                            ? "Membre validé"
                            : "En attente"}
                        </span>

                      </div>
                    </div>
                  </div>

                    <div className="absolute right-10 2xl:right-30">
                      {/* BOUTON */}
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleMember(member.id)
                        }
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        aria-label={
                          isOpen
                            ? "Masquer les informations"
                            : "Afficher les informations"
                        }
                      >
                        <span
                          className={`text-lg transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        >
                          ^
                        </span>
                      </button>
                    </div>
                  {/* INFORMATIONS SUPPLÉMENTAIRES */}
                  {isOpen && (
                    <div className="mt-4 pt-3 border-t grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">

                      <div>
                        <p className="text-gray-400">
                          Ville
                        </p>
                        <p className="font-medium">
                          {member.city || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          Type
                        </p>
                        <p className="font-medium">
                          {member.memberType || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          Sexe
                        </p>
                        <p className="font-medium">
                          {member.sex || "-"}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400">
                          {member.memberType === "PROFESSIONNEL"
                            ? "Profession"
                            : "Niveau"}
                        </p>

                        <p className="font-medium">
                          {member.occupation ||
                            member.niveau ||
                            "-"}
                        </p>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};