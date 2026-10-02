import { useEffect, useRef, useState } from "react";
import { URLSearchHelper } from "../helper/URLSearchHelper";
import { toastError } from "../helper/toasterHelper";
import { useAuth } from "../hooks/useAuth";
import { ArrowRightLeft,Lock, CircleCheckBig} from "lucide-react";

import { useNavigate } from "react-router-dom";

export const ResetPasswordPage = () => {
    const token = URLSearchHelper();
    const { resetPin } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    const resetExecuted = useRef(false);
    const resetPassword = async () => {
        try {
            if (!token) {
                toastError("Token de réinitialisation absent");
                return;
            }

            const response = await resetPin(token);

            console.log("RESET RESPONSE :", response);

            if (response?.status === 200) {
                setSuccess(true);
            }

        } catch (error) {
            console.error("reset password error :", error);

            const message =
                error.response?.data?.message ||
                "Impossible de réinitialiser le mot de passe";

            toastError(message);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        // Empêche une deuxième exécution
        if (resetExecuted.current) {
            return;
        }

        resetExecuted.current = true;

        resetPassword();

    }, [token]);
    
    // Chargement
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>

                    <h2 className="text-xl font-semibold text-gray-800">
                        Réinitialisation en cours...
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Veuillez patienter quelques secondes.
                    </p>
                </div>
            </div>
        );
    }

    // Succès
    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">

                    {/* Icône */}
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                            <CircleCheckBig className="text-green-600 text-6xl" />
                        </div>
                    </div>

                    {/* Titre */}
                    <h1 className="text-3xl font-bold text-gray-900">
                        Youpi ! 🎉
                    </h1>

                    <h2 className="text-xl font-semibold text-gray-800 mt-2">
                        Votre mot de passe a été modifié
                    </h2>

                    {/* Message */}
                    <p className="text-gray-500 mt-4 leading-relaxed">
                        Votre nouveau mot de passe a été enregistré avec succès.
                        Vous pouvez maintenant vous connecter avec votre nouveau
                        mot de passe.
                    </p>

                    {/* Sécurité */}
                    <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4 mt-6 text-left">
                        <Lock className="text-green-600 text-xl shrink-0" />

                        <p className="text-sm text-green-800">
                            Votre compte est maintenant sécurisé avec votre
                            nouveau mot de passe.
                        </p>
                    </div>

                    {/* Bouton */}
                    <button
                        onClick={() => navigate("/")}
                        className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2"
                    >
                        Se connecter
                        <ArrowRightLeft />
                    </button>

                </div>
            </div>
        );
    }

    // Si échec sans redirection automatique
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800">
                    Réinitialisation impossible
                </h1>

                <p className="text-gray-500 mt-3">
                    Le lien de réinitialisation est invalide ou a expiré.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold"
                >
                    Retour à la connexion
                </button>
            </div>
        </div>
    );
};