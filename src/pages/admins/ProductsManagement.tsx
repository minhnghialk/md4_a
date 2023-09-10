import './productsManagement.scss'
import { useState, useEffect, useRef, FormEvent } from 'react'
import api from '@services/apis'
import { AiOutlineHeart } from "react-icons/ai";
import { MutableRefObject } from 'react';

interface Category {
  id: string;
  title: string;
  avatar: string;
}

interface Picture {
  file: File;
  url: string;
}

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

export default function ProductsManagement() {



  const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
  const [categories, setCategories] = useState([]);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    api.categoryApi.findMany()
    .then(res => {
      if(res.status != 200) {
        alert(res.data.message)
      }else {
        setCategories(res.data.data)
      }
    })
  }, [])


  useEffect(() => {
    api.productApi.findMany()
    .then(res => {
      if(res.status != 200) {
        alert(res.data.message)
      }else {
        console.log(res.data.data);
        setProducts(res.data.data)
      }
    })
  }, [])


  function addNewProduct(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("product", JSON.stringify({
      categoryId: (e.target as any).categoryId.value,
      name: (e.target as any).name.value,
      des: (e.target as any).des.value,
      price: (e.target as any).price.value,
    }))
    formData.append("imgs", avatarFile!)
    for(let i in pictures) {
      formData.append("imgs", pictures[i].file)
    }

    api.productApi.create(formData)
    .then(res => {
      console.log("res", res)
    })
    .catch(_err => {

    }) 

    window.alert("OK")
  }
  return (
    <div>
      <form onSubmit={(e) => {
      addNewProduct(e);
    }}>
        <div className='a'>
        <h1 style={{fontSize: '24px', textAlign: 'center'}}>Add A New Product</h1>
        <div>
          Category:
          <select name='categoryId' >
            {
              categories.map(category => <option key={Math.random() * Date.now()} value={(category as Category).id}>{(category as Category).title}</option>)
            }
          </select>
        </div>
        <div>
        Product Name:
          <input name='name' type="text" placeholder='Type product name'/>
        </div>
        <div>
          Description:
          <input name='des' type="text" placeholder='Your description here'/>
        </div>
        <div>
          Price:
          <input name='price' type="text" placeholder='$'/>
        </div>
        <div>
        Product Avatar:
          <input name='imgs' type="file" onChange={(e) => {
            if(e.target.files) {
              if(e.target.files.length > 0) {
                (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                setAvatarFile(e.target.files[0])
              }
            }
          }}/>
          <img ref={imgPreviewRef} style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
        </div>
        <div>
        Product Pictures:
          <input name="imgs" type="file" multiple onChange={(e) => {
            if(e.target.files) {
              if(e.target.files.length > 0) {
                let tempPictures: Picture[] = [];
                for (let i in e.target.files) {
                  if(i == "length") {
                    break
                  }
                  tempPictures.push({
                    file: e.target.files[i],
                    url: URL.createObjectURL(e.target.files[i])
                  })
                }
                setPictures(tempPictures)
              }
            }
          }}/>
          <div>
              {
                pictures.map(picture =>  <img src={picture.url} style={{width: "100px", height: "100px", borderRadius: "50%"}}/>)
              }
          </div>
        </div>
        <button type='submit'>Add product</button>
        </div>
    </form>

    {products.map(product => 
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        style={{marginLeft: '420px', marginTop: '50px', marginBottom: '50px'}}
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
    </div>
  )
}
