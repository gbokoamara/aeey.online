const BASE_URL = import.meta.env.VITE_API_URL

export const API_CONFIG = {
    BASE_URL: BASE_URL ,
    ENDPOINTS:{
        AUTH:{
            REGISTER : "/auth/login",
            PASSWORD : "/auth/password",
            VERIFY_PASSWORD : "/auth/password-verify"
        },
        USER:{
            UPDATE : "/user/update-profil",
            MEMBER_REQUEST : "/user/password",
            // VERIFY_PASSWORD : "/user/password-verify"
        }

    }
}