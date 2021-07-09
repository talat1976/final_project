import React from "react"
import "./header.css"
import {Link  } from "react-router-dom"
import p5 from "../../images/TalatTech.png"

function Header() {
  return (
    <div className="header">
     <img className="logo" src={p5} />
      
      <div className="links">
          <Link to="/">דף הבית</Link>
          <Link to="/about">עלינו</Link>
          <Link to="/login">הרשמה לאתר</Link>
          <Link to="/contact" > צרו קשר</Link>
      </div>

      
    </div>
  );
}
  

  export default Header;
  