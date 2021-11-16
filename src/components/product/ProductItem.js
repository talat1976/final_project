import React from 'react'
import { Button } from 'react-bootstrap'
import Rating from '../rating/Rating'
import "./product.css"

function ProductItem(props) {
    const prod = props.product

    return (
        <div className={`product ${prod.sale > 0 ? 'sale' : ''}`}>
            <img className="product-img" src={prod.image} onClick={props.onClick} />

            <div className="content">
                {prod.sale > 0 ?
                    <div className="sale-text">
                        %{prod.sale} מבצע
                    </div>
                    :
                    null
                }

                <h5 className="text-center" >{prod.name}</h5>

                <div className="text-center">₪{prod.price - (prod.price * (prod.sale / 100))}</div>

                {prod.rating > 0 && <Rating rating={prod.rating} />}

                <div>
                    <div className="buttons">
                        {prod.qty > 0 ?
                            <div>
                                {props.hideButton ? null :
                                    <Button size="sm" className="mb-1" onClick={() => props.onAddToCart(prod.id)}>הוספה לסל</Button>
                                }
                            </div>
                            :
                            <div className="not_found">
                                מוצר אזל מהמלאי
                            </div>
                        }

                        <Button size="sm" variant="success" className="mb-1" onClick={props.onClick}>פרטים</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem

