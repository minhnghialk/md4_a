// import './product.scss'
// import { Outlet } from 'react-router-dom'
// import { useState, useCallback } from 'react'
// import Test from '@components/Test'

// export interface Prop {
//   count: number, 
//   handlePrintCount: (count: number) => void
// }

// export default function Product() {
//   const [count, setCount] = useState(0)
//   const [count2, setCount2] = useState(0)

//   const handlePrintCount = useCallback((count: number) => {
//     alert('Count value is: ' + count)
//   }, [count])

//   console.log('rerender Product Component')

//   return (
//     <div>
//       <h1>Product { count }</h1>
//       <Test count = { count } handlePrintCount = { handlePrintCount }/>
//       <Outlet/>
//       <button onClick={() => {
//         setCount(count + 1);
//       }}>Tăng 1</button>

//       <button onClick={() => {
//         setCount(count2 + 1);
//       }}>Tăng 2</button>
//     </div>
//   )
// }
import './product.scss'
import { useState, useEffect, useRef } from 'react'
import api from '@services/apis'

interface Category {
  id: string;
  title: string;
  avatar: string;
}

interface Picture {
  file: File;
  url: string;
}

export default function Product() {
  const imgPreviewRef = useRef();
  const [categories, setCategories] = useState([]);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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

  function addNewProduct(e: FormDataEvent) {
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
    .catch(err => {

    }) 

    window.alert("OK")
  }
  return (
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
  )
}
