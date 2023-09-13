import { useEffect, useState } from 'react';
import './order.scss';
import purchaseModule from "@services/apis/modules/purchase.module"

interface Order {
  orderId: string;
  items: Array<{
    productId: string;
    productDetail: {
      name: string;
      price: number;
    };
    quantity: number;
  }>;
}


export default function OrdersManagement() {
  const [orderHistory, setOrderHistory] = useState<Array<Order>>([]);
console.log(orderHistory);
console.log(orderHistory);

  useEffect(() => {
    async function addOrderHistory(){
    // Lấy thông tin đơn hàng từ localStorage
    const storedOrderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    let addOrderResult = await purchaseModule.addOrder(localStorage.getItem("token"),localStorage.getItem("orderHistory"));
    console.log("addOrderResult",addOrderResult);
    
    setOrderHistory(storedOrderHistory);
    }
    addOrderHistory();


  }, []);

  //muốn lấy về trang nào import vào trang đó
  useEffect(() => {
    async function getOrderHistory(){
    let getOrderResult:any = await purchaseModule.getOrder(localStorage.getItem("token"));
    console.log("getOrderResult", getOrderResult);
    console.log("getOrderResult data", getOrderResult.data.data[0].data);
    console.log("getOrderResult data1", getOrderResult.data.data[0].id);
    setOrderHistory(getOrderResult.data?.data)
    }
    getOrderHistory();
  }, []);

  return (
    <div>
      <header>
        <h1 style={{ color: '#fff', fontSize: '1.5em' }}>Order history</h1>
      </header>
      <main>
        <section id="order-history">
          {orderHistory.length === 0 ? (
            <p>No orders available</p>
          ) : (
            <ul>
              {orderHistory.map((order, index) => (
                <li key={order.orderId}>
                  <h3>Order {index + 1}</h3>
                  <ul>
                    {order.items?.map((item) => (
                      <li key={item.productId}>
                        <p>Product Name: {item.productDetail?.name}</p>
                        <p>Unit Price: {item.productDetail?.price.toLocaleString('vi-VN')},000 VNĐ</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: {item.productDetail?.price * item.quantity},000 VNĐ</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>

      </main>
      <footer>
        <p style={{ color: "#fff" }}>© 2023 Your Company</p>
      </footer>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import './order.scss';
// import purchaseModule from "@services/apis/modules/purchase.module"

// interface Order {
//   orderId: string;
//   items: Array<{
//     productId: string;
//     productDetail: {
//       name: string;
//       price: number;
//     };
//     quantity: number;
//   }>;
// }

// export default function OrdersManagement() {
//   const [getOrderResult, setGetOrderResult] = useState<Array<Order> | null>(null); // Initialize as null

//   // Fetch order data when the component mounts
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await purchaseModule.getOrder(localStorage.getItem("token"));
//         const resultData = response.data; // Access the 'data' property of the Axios response
//         console.log("getOrderResult", resultData);
//         setGetOrderResult(resultData);
//       } catch (error) {
//         // Handle error here
//         console.error("Error fetching data:", error);
//         setGetOrderResult([]); // Set to an empty array or handle error state
//       }
//     }
//     fetchData();
//   }, []);
  

//   return (
//     <div>
//       <header>
//         <h1 style={{ color: '#fff', fontSize: '1.5em' }}>Order history</h1>
//       </header>
//       <main>
//         <section id="order-history">
//           {getOrderResult === null ? ( // Check for loading state
//             <p>Loading...</p>
//           ) : getOrderResult.length === 0 ? (
//             <p>No orders available</p>
//           ) : (
//             <ul>
//               {getOrderResult.map((order, index) => (
//                 <li key={order.orderId}>
//                   <h3>Order {index + 1}</h3>
//                   <ul>
//                     {order.items.map((item) => (
//                       <li key={item.productId}>
//                         <p>Product Name: {item.productDetail.name}</p>
//                         <p>Unit Price: {item.productDetail.price.toLocaleString('vi-VN')},000 VNĐ</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Total: {item.productDetail.price * item.quantity},000 VNĐ</p>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>
//       </main>
//       <footer>
//         <p style={{ color: "#fff" }}>© 2023</p>
//       </footer>
//     </div>
//   );
// }


