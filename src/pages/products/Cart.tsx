import { useEffect, useState } from 'react'
import api from '@/services/apis'
import './cart.scss'
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

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

interface newGuestReceipt {
    email: string;
    phoneNumber: string;
    total: number;
    payMode: string;
}

export default function Cart() {
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

    function handleOrder() {
        let newGuestReceipt: newGuestReceipt = {
            email: "nghiatest39@gmail.com",
            phoneNumber: "0369274783",
            total: cart.reduce((value, cur) => {
                return value + cur.quantity * cur.productDetail.price
            }, 0),
            payMode: "CASH"
        }
        let guestReceiptDetailList = JSON.parse(localStorage.getItem("carts") ?? "[]")
        
        api.purchaseApi.createGuestReceipt(newGuestReceipt, guestReceiptDetailList)
        .then((res: { data: any; }) => {
            console.log("res", res.data)
        })
        window.location.href="http://localhost:5173/purchase-order"
    }

// Hàm thay đổi số lượng sản phẩm
const changeProductQuantity = (productId: string, changeAmount: number) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + changeAmount;
        if (newQuantity <= 0) {
          // Nếu số lượng mới là 0 hoặc âm, xóa sản phẩm khỏi giỏ hàng
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean) as CartItemDetail[]; // Loại bỏ các phần tử null và ép kiểu về CartItemDetail[]
  
    setCart(updatedCart);
    // Cập nhật giỏ hàng mới vào localStorage
    localStorage.setItem('carts', JSON.stringify(updatedCart));
  };
  
    // Hàm xóa sản phẩm khỏi giỏ hàng
  const deleteProductFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    // Cập nhật giỏ hàng mới vào localStorage
    localStorage.setItem('carts', JSON.stringify(updatedCart));
  };
  return (
    <div>
        <h1>Your cart</h1>
<table>
    <thead>
        <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Tools</th>
        </tr>
    </thead>
    <tbody>
        {cart.map(item => (
            <tr key={item.productId}>
                <td>{item.productDetail.name}</td>
                <td>
                    <img src={item.productDetail.avatar} style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                </td>
                <td>{item.productDetail.price.toLocaleString('vi-VN')},000 VNĐ</td>
                <td>
                    <span> <button onClick={() => changeProductQuantity(item.productId, -1)}> <AiOutlineMinus/> </button> </span>
                        {item.quantity}
                    <span> <button onClick={() => changeProductQuantity(item.productId, 1)}> <AiOutlinePlus/> </button> </span>
                </td>
                <td>
                    <span style={{cursor: 'pointer' }} onClick={() => deleteProductFromCart(item.productId)}><AiOutlineDelete/></span>
                    {/* <span style={{cursor: 'pointer' }}><AiOutlineEdit/></span> */}
                </td>
            </tr>
        ))}
    </tbody>
</table>
        <div style={{textAlign: 'center', marginTop: '15px'}}>
            <select>
                <option value="CASH">Tiền Mặt</option>
                <option disabled value="ZALO">Zalo</option>
            </select>
            
            <button 
                onClick={() => {
                handleOrder()
                }}
                style={{width: '100px', height: '50px', marginLeft: '15px'}}
                >
                Order
            </button>
        </div>
    </div>
  )
}