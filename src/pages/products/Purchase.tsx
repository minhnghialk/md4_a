import './purchase.scss'
import { useEffect, useState } from 'react'
import api from '@/services/apis'

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
    des: string;
    categoryId: string;
    productPictures: {
        id: string;
        path: string;
    }[]
}
interface CartItem {
    productId: string;
    quantity: number;
}
interface CartItemDetail extends CartItem{
   productDetail: Product
}

export default function Purchase() {
    const [cart, setCart] = useState<CartItemDetail[]>([]);
        
    async function formatCart() {
        let cartTemp: CartItemDetail[] = [];
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        for (let i in carts) {
            let productDetail = await api.productApi.findById(carts[i].productId).then(res => res.data.data)
            cartTemp.push({
                ...carts[i],
                productDetail
            })
        }
        setCart(cartTemp)
    }

    useEffect(() => {
        formatCart();
    }, [])

    // Tính tổng giá trị đơn hàng
    function calculateTotal() {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].productDetail.price * cart[i].quantity;
        }
        // Lưu thông tin đơn hàng vào localStorage
        localStorage.setItem("orderHistory", JSON.stringify(cart));
        return total;
    }

    
  return (
    <div>
        <div className="container">
            <div className="header">
                <h1>Purchase Order</h1>
                </div>
                <div className="order-details">
                    <h2>Order Details</h2>
                    <table>
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map(item => (
                                <tr key={item.productId}>
                                    <td>{item.productDetail.name}</td>
                                    <td>{item.productDetail.price.toLocaleString('vi-VN')},000 VNĐ</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.productDetail.price * item.quantity},000 VNĐ</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
                <div className="total">
                    <p>
                    <strong>Total:</strong>{calculateTotal()},000 VNĐ
                    </p>
            </div>
        </div>
    </div>
  )
}
