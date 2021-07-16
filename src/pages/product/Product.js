import React, { useEffect, useState } from 'react'
import { firebaseDB } from '../../services/firebase'
import "./product.css"

const Product = (props) => {
    const [product, setProduct] = useState()

    useEffect(() => {
        const fetch = async () => {
            const prodRef = firebaseDB.collection("products").doc(props.match.params.id)
            const doc = await prodRef.get()
            setProduct(doc.data())
        }

        fetch()
    }, [props.match.params.id])

    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="main-content">
            <img src={product.image} />
            <h4>{product.name}</h4>
            <p>{product.desc}</p>
            <h3>${product.price}</h3>
            {product.warranty ? <div>אחריות: {product.warranty}</div> : null}
            {product.comp && <div>מותג: {product.comp}</div>}
        </div>
    )
}

export default Product