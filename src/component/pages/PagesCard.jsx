
import BackButton from "../../utils/backButton"


export const PagesCard = ({children, title="", showBackButton=true }) => {
    return(
        <>
        <BackButton className="top-5 left-0 text-white"  title={title} show={showBackButton } /> 
        <div className="grid md:justify-center md:items-center  rounded bg-white  text-black p-1 absolute bottom-0 left-1 right-1 md:left-50 md:right-50 top-15">
            {children}
        </div>
        </>
    )
}