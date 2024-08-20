import React from 'react'
import './sidebar.css'
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  Bs0CircleFill
} from 'react-icons/bs';
import ReactLogout from '../../helpers/Logout';
import CheckSession from '../../helpers/CheckSession';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const {username, admin_id, access_token} = CheckSession()
  
  const {logout} = ReactLogout()
  return (
      <section className='sidebar'>
        {/* links  */}
        <div className="sidebar-top">
          <div className="sidebar-brand">
          <BsCart3/>
          <span>sneakerHUB</span>
          </div>

          {/* sidebar links */}
          <div className="sidebar-links">
          <ul>
            <li><Link to="/"> <Bs0CircleFill/> Dashboard</Link></li>
            <li><Link to="/profile"> <BsGrid1X2Fill/>  My Profile</Link></li>
            <li><Link to="/addcategory"> <BsFillArchiveFill/> Add Shoe Category</Link></li>
            <li><Link to="/addshoes"><BsFillGrid3X3GapFill/>Add Shoes</Link></li>
            <li><Link to="/vieworders"> <BsPeopleFill />View Orders</Link></li>
            <li><Link to="/get-all-shoes"> <BsFillArchiveFill />View products</Link></li>

            

          </ul>
          </div>
        </div>

       

        {/* logout division */}
        <div className="p-5 mt-10 sidebar-logout">
          <button className="btn btn-dark btn-sm" style={{padding:"10px"}}  onClick={logout}>
           Logout
          </button>
        </div>
      </section>
  )
}

export default SideBar
