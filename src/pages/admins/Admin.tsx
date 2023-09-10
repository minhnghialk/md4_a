import './admin.scss'
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineOrderedList } from "react-icons/ai";

export default function Admin() {
  return (
    <div>
      <>
        <header>
          <h1>Admin Dashboard</h1>
        </header>
        <nav>
          <ul>
            <li>
              <a href="/admin/users" style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '5px'}}><AiOutlineUser/></span>
                Users Management
              </a>
            </li>

            <li>
              <a href="/admin/products" style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '5px'}}><AiOutlineShop/></span>
                Products Management
              </a>
            </li>
            
            <li>
              <a href="/admin/orders" style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '5px'}}><AiOutlineOrderedList/></span>
                Orders Management
              </a>
            </li>

          </ul>
        </nav>
      </>
    </div>
  )
}


