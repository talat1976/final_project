import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { firebaseDB } from '../../../services/firebase'

const OrderProducts = (props) => {
    const [product, setProduct] = useState()

    useEffect(() => {
        const fetch = async () => {
            const prodRef = firebaseDB.collection("products").doc(props.prodId)
            const doc = await prodRef.get()
            setProduct(doc.data())
        }

        fetch()
    }, [])

    if (!product) {
        return null;
    }

    return (
        <Link to={`/product/${props.prodId}`}>
            <img src={product.image} width="80px" />
            <div style={{ fontSize: 12 }}>{product.name}</div>
        </Link>
    )
}

export default OrderProducts
