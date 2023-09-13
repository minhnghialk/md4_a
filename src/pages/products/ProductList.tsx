import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import api from '@services/apis'
import unidecode from 'unidecode'; // Import thư viện unidecode


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

export default function ProductList() {
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]); // Lưu trữ danh sách sản phẩm gốc
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // Thêm state để lưu trữ từ khóa tìm kiếm
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState<number>(3); // Ban đầu hiển thị 3 sản phẩm

    useEffect(() => {
        api.productApi.findMany()
        .then(res => {
          if(res.status != 200) {
            alert(res.data.message)
          }else {
            console.log(res.data.data);
            setOriginalProducts(res.data.data); // Lưu trữ danh sách sản phẩm gốc
            setProducts(res.data.data)
            setVisibleProducts(res.data.data.slice(0, visibleCount));
          }
        })
      }, [])

      const handleLoadMore = () => {
        // Tăng số lượng sản phẩm hiển thị thêm khi nhấn "Load more"
        const newVisibleCount = visibleCount + 3; // Tăng lên 3 sản phẩm, bạn có thể điều chỉnh số lượng tùy ý.
        setVisibleCount(newVisibleCount);
    
        // Hiển thị thêm sản phẩm từ danh sách đã có
        setVisibleProducts(products.slice(0, newVisibleCount));
      }

      function handleAddToCart(productId: string) {
        let carts: CartItem[] = JSON.parse(localStorage.getItem("carts") ?? "[]");
        if(carts.length == 0) {
            // cart rỗng
            carts.push({
                productId,
                quantity: 1
            })
        }else {
            // cart có sp
            let flag:boolean = false;
            carts = carts.map(item => {
                if(item.productId == productId) {
                    item.quantity += 1
                    flag = true;
                    window.location.href="http://localhost:5173/cart"
                }
                return item
            })
            if(!flag) {
                carts.push({
                    productId,
                    quantity: 1
                })
            }
        }
        localStorage.setItem("carts", JSON.stringify(carts)) // save to local
    }

  //  // Hàm xử lý tìm kiếm sản phẩm theo tên
  // function handleSearch() {
  //   // Chuẩn hóa chuỗi tìm kiếm và danh sách sản phẩm trước khi so sánh
  // const normalizedSearchTerm = searchTerm.toLowerCase();
  //   // Sử dụng danh sách sản phẩm gốc để tìm kiếm
  //   const filteredProducts = originalProducts.filter(product =>
  //     // product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     product.name.toLowerCase().includes(normalizedSearchTerm)
  //   );

  //   // Cập nhật danh sách sản phẩm hiển thị
  //   setProducts(filteredProducts);
  // }

  // Hàm xử lý tìm kiếm sản phẩm theo tên (không phân biệt dấu)
  function handleSearch() {
    // Chuẩn hóa chuỗi tìm kiếm và danh sách sản phẩm trước khi so sánh
    const normalizedSearchTerm = unidecode(searchTerm.toLowerCase()); // Sử dụng unidecode
    const filteredProducts = originalProducts.filter(product => {
      const normalizedProductName = unidecode(product.name.toLowerCase());
      return normalizedProductName.includes(normalizedSearchTerm);
    });

    // Cập nhật danh sách sản phẩm hiển thị
    setVisibleProducts(filteredProducts);
  }



  return (
    <div>
        <h1 style={{textAlign: 'center', fontSize: '1.5em', fontFamily: 'Comic Sans MS', marginTop: '5px'}}>New Products List</h1>
        <img
            src="https://web.nvnstatic.net/tp/T0295/img/seperate-icon.png?v=2"
            style={{marginLeft: '46%', marginTop: '5px'}}
          />

      <div style={{ textAlign: 'center' }}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '300px',
            marginTop: '20px',
            marginRight: '20px',
          }}
        />
        <button 
        onClick={handleSearch} 
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          color: 'black',
          border: '1px solid black',
          cursor: 'pointer',
        }}>
         Search
        </button>
      </div>


        {visibleProducts.map(product => 
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        style={{marginLeft: '420px', marginTop: '50px', marginBottom: '50px'}}
        key={product.id}
      >
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={product.avatar} 
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal" >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{borderBottom: '1px solid rgba(0,0,0,0.068)'}}>
          {product.des}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{borderBottom: '1px solid rgba(0,0,0,0.068)'}}>
            1000 ml
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{borderBottom: '1px solid rgba(0,0,0,0.068)'}}>
          {product.price},000 VNĐ
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <a
              href="#"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              style={{marginLeft: '160px'}}
              onClick={() => {
                handleAddToCart(product.id)
            }}
            >
              Add to cart
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" style={{marginLeft: '160px', marginTop: '15px', display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '5px'}}><AiOutlineHeart/> </span>
            <span>Favourite</span>
          </p>
          </p>

        </div>
        
      </a>
      )}
      <button style={{border: '1px solid black', width: '140px', height: '40px', margin: '5% 45%', borderRadius: '5px'}} onClick={handleLoadMore}>
        Load more
        <span> &gt;&gt;</span>
        </button>
      
    </div>
    
  )
} 
