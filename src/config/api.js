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
        MEMBER:{
            //   
            ADD : "/member/add",
            UPDATE : "/member/update",
            GET_ALL: "/member/get-all-members",
            GET_PENDING: "/member/get-pending-members", 
            GET_ONE: "/member/get-member", 
            DELETE_ONE : "/member/delete",
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
        // CARD.    
        CARD:{
            GET_REQUEST : "/card/get",
            GET_ALL : "/card/gat-all",
            GET_ALL_REQUEST : "card/get-all-request",
            REQUEST_CARD : "/card/create",
            UPDATE_CARD : "/card/update",
            DELETE : "/card/delete",
        },
        EXPENSE:{
            //   
            ADD : "/expense/add",
            UPDATE : "/expense/update",
            GET_ALL: "/expense/get-all-expenses", 
            GET_ONE: "/expense/get-expense", 
            DELETE_ONE : "/expense/delete",
         },
         PAYMENT:{
            ADD: "/payment/add",
            GET: "/payment/get",
            GET_ALL: "/payment/get-all",

         }
    }
}