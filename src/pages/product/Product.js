import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import Rating from '../../components/rating/Rating'
import { firebaseDB } from '../../services/firebase'
import "./product.css"


const Product = (props) => {
    const [product, setProduct] = useState()
    const [cookies, setCookie] = useCookies(['cart'])
    const productId = props.match.params.id

    useEffect(() => {
        const fetch = async () => {
            const prodRef = firebaseDB.collection("products").doc(productId)
            const doc = await prodRef.get()
            setProduct(doc.data())
        }

        fetch()
    }, [productId])

    const addToCart = () => {
        if (cookies.cart) {
            setCookie("cart", `${cookies.cart},${productId}`)
        } else {
            setCookie("cart", `${productId}`)
        }
    }

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="main-content">
            <div className="card">
                <div className="image">
                    <img src={product.image} />
                </div>
                <h4>{product.name}</h4>
                <p>{product.desc}</p>
                <h2>₪{product.price}</h2>
                {product.warranty ? <div>אחריות: {product.warranty}</div> : null}
                {product.comp && <div>מותג: {product.comp}</div>}
                {product.rating > 0 && <Rating rating={product.rating} />}

                <div className="mt-4">
                    {product.qty > 0 ?
                        <button className="btn btn-success" onClick={addToCart}>הוספה לסל</button>
                        :
                        <div className="not_found">מוצר אזל מהמלאי</div>

                    }
                </div>
            </div>
        </div>


    )
}

export default Product
