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
            MEMBER_REQUEST : "/user/member-request",
            CARD_REQUEST : "/user/card-request",
            GET_CARD : "/user/user-card",
            UPDATE_CARD : "/user/card-update",
            GET_PAYMENT : "user/get-payment",
            MAKE_PAYMENT: "user/make-payment",
        },
        EVENT:{
            //   

            ADD : "/event/add",
            UPDATE : "/event/update",
            GET_ALL: "/event/get-all-events", 
            GET_ALL_ACTIVE: "/event/get-all-active-events", 
            GET_ONE: "/event/get-event", 
            MARKE_ONE : "/event/done",
            PUBLISH: "/event/publish",
            DELETE_ONE : "/event/delete",
        },
        CARD:{
            GET : "/card/get",
            MADE : "/card/done",
            DELETE : "/card/delete",
        }
    }
}