import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Lazy Function */
import Lazy from '@utils/lazies/Lazy';

/* Components */
import Home from '@pages/homes/Home';

/* Route Setup */
import RouteProduct from "./RouteProduct";

export default function RouteSetup() {
  return (
    <BrowserRouter>
        <Routes>
            {/* Home - Navbar + Footer */}
            <Route path="/" element={<Home></Home>}>
              <Route path="about" element={Lazy(() => import("@components/About"))()}></Route>
              <Route path="infor" element={Lazy(() => import("@components/Infor"))()}></Route>
              {RouteProduct}
            </Route>
            
             {/* Users */}
            <Route path="register" element={Lazy(() => import("@components/Register"))()}></Route>
            <Route path="login" element={Lazy(() => import("@components/Login"))()}></Route>

            {/* Admins */}
            <Route path="admin" element={Lazy(() => import("@pages/admins/Admin"))()}></Route>
            <Route path="admin/users" element={Lazy(() => import("@pages/admins/UsersManagement"))()}></Route>
            <Route path="admin/products" element={Lazy(() => import("@pages/admins/ProductsManagement"))()}></Route>
            <Route path="admin/orders" element={Lazy(() => import("@pages/admins/OrdersManagement"))()}></Route>

            <Route path="products-list" element={Lazy(() => import("@pages/products/ProductList"))()}></Route>
            <Route path="cart" element={Lazy(() => import("@pages/products/Cart"))()}></Route>
            <Route path="/check-order" element={Lazy(() => import("@pages/products/CheckOrder"))()}></Route>
        </Routes>
    </BrowserRouter>
  )
}
