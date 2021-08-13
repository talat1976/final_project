import React from "react"
import "./header.css"
import { Link } from "react-router-dom"
import p5 from "../../images/TalatTech.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { useCookies } from "react-cookie"

function Header() {

  const [cookies] = useCookies(['cart'])

  const cartCount = cookies.cart ? cookies.cart.split(",").length : 0

  return (
    <div className="header">
      <img className="logo" src={p5} />

      <div className="links">
        <Link to="/">דף הבית</Link>
        <Link to="/about">עלינו</Link>

        <Link to="/contact" > צרו קשר</Link>
        <Link to="/reports" > פניות / תקלות </Link>
        <Link to="/cart" >
          {cartCount > 0 && <span className="cart">{cartCount}</span>}
          <FontAwesomeIcon icon={faShoppingCart} /> סל קניות
        </Link>
      </div>


    </div>
  );
}


export default Header;
