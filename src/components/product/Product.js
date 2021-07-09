import React from 'react'
import { Button } from 'react-bootstrap'
import "./product.css"

function Product(props) {

    const prod = props.product

    console.log(prod)

    return (
        <div className={`product ${prod.sale > 0 ? 'sale' : ''}`}>
            <img className="product-img" src={prod.image} />

            
            {prod.sale > 0 ? 
                <div className="sale-text">
                        %{prod.sale} מבצע
                </div> 
            : null}
            
            <h4>{prod.name}</h4>

            <div className="text-center">₪{prod.price - (prod.price*(prod.sale/100))}</div>
            
            <div>{prod.desc}</div>

            {props.hideButton ? null :
                <Button size="sm" className="mb-1">קנייה</Button>
            }
        </div>
    )
}

export default Product

