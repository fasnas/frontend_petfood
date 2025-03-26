import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/User/Home/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loginpage from './Components/User/Register/Login/Login';
import RegistrationPage from './Components/User/Register/Signup/Signup';
import Cart from './Components/User/Cart/Cart';
import Banner from './Components/User/Home/Banner/Banner';
import Products from './Components/User/Home/Products/Product/Products';
import ProdectDetiles from './Components/User/Home/Products/ProductDetiles/ProdectDetiles';
import Address from './Components/User/Order/Adress/Adress';
import PaymentComponent from './Components/User/Order/Payment/Payment';
import ViewOrderDetails from './Components/User/Order/OrderDetails/OrderDetile';
import AdminProduct from './Components/Admin/Products/AdminProduct';
import Layout from './Components/Admin/Layout/Layout';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Users from './Components/Admin/Users/Users';
import RevenueReport from './Components/Admin/Revenue/Revenue';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Navbar />}>
                    <Route path='/' element={<Banner />} />
                </Route>
                <Route path='/login' element={<Loginpage />} />
                <Route path='/create' element={<RegistrationPage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/adrs' element={<Address />} />
                <Route path='/payment' element={<PaymentComponent />} />
                <Route path='/product' element={<Products />} />
                <Route path='/detail/:id' element={<ProdectDetiles />} />
                <Route path='/view' element={<ViewOrderDetails />} />
            
                {/* admin */}
                <Route path='/ahome' element={<Layout />} >
                    <Route index element={<Dashboard />} />
                    <Route path='aproducts' element={<AdminProduct />} />
                    <Route path='ausers' element={<Users />} />
                    <Route path='revenue' element={<RevenueReport/>} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
