import {Outlet} from "react-router"
import Header from "./Header"
import Footer from "./Footer"


 const Layout = () => {

    return(
        <>
        <Header/>
         <main className="h-screen w-screen ">
            <Outlet/>
         </main>
         {/* <Footer/> */}
        </>
    )
}
export default Layout