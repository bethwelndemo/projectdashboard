import React from 'react'
import './topbar.css'
import { AiFillCalendar } from "react-icons/ai";
import { AiTwotoneAppstore } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import CheckSession from '../../helpers/CheckSession';


const TopBar = () => {
  const {lab_id, access_token} = CheckSession()

  //get lab name from local storage
  const username = localStorage.getItem("username")
  return (
    <nav className='topbar'>
      {/* left side */}
      <div className="topbar-admin">ADMIN PANEL</div>

      {/* right hand side */}
      <div className="topbar-content">
        <div className="topbar-date">
            <AiFillCalendar />
            <span>User: {username}</span>
        </div>

        <div className="topbar-icon">
          <AiTwotoneAppstore />
          <span>/</span>
          <FaBell />
          <div className="topbar-image">
          <CgProfile />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
