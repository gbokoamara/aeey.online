import { useLocation, useNavigate } from "react-router-dom"

export const useAppNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    //  navigation avec state
    const goTo = (path, state = {}) => {
        navigate(path, {state});
    }


    //  récupération du state
    const getState = () => {
        return location?.state?.state;
    }

    return { goTo, getState };
}