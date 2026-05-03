import { Route, BrowserRouter as Router, Routes  } from "react-router-dom"
import Layout  from "./layout/Layout"
import './App.css'
import { LoginPage } from "./pages/LoginPage"
import { HomePage } from "./pages/home"
import { CardPage } from "./pages/Card"
import { HistoryPage } from "./pages/History"
import { MemberPage } from "./pages/Member"
import { PaymentPage } from "./pages/payment"
import { SettingPage } from "./pages/Setting"
import { PaiementDetailPage } from "./pages/PaimentDetail"
import { UserPaymentHistoryPage } from "./component/membres/payment/Payment"
import { EventDetail } from "./pages/EventDetails"




function App() {

  return (
   <>
   <Router>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route element={<Layout/>} >
        <Route path="/home" element={<HomePage/>} />
      </Route>
       <Route path="/carte" element={<CardPage/>} />
        <Route path="/historique" element={<HistoryPage/>} />
        <Route path="/membre" element={<MemberPage/>} />
        <Route path="/paiement" element={<PaymentPage/>} />
        <Route path="/user-payment-history" element={<UserPaymentHistoryPage/>} />
        <Route path="/settings" element={<SettingPage/>} />
        <Route path="/paiment-detail/:id" element={<PaiementDetailPage/>} />
        <Route path="/event/:id" element={<EventDetail />} />
    </Routes>
   </Router>
   </>
  )
}

export default App
