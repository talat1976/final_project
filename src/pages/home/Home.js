import React, { useEffect, useState } from 'react'
import "./home.css"
import Product from "../../components/product/Product"
import { firebaseDB } from '../../services/firebase'

const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const unsub = firebaseDB.collection("products").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ id: item.id, ...item.data() }))
            setProducts(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        return () => unsub()
    }, [])

    return (

        <div className="page">
            <div>
                <label to="/">מחשבים נייחים  וניידים</label>|
                <label to="/about">  סמארטפונים טאבלטים</label>|
                <label to="/contact" >  ציוד נלווה</label>|
                <label to="/login">חומרה למחשבים </label>|
                <label to="/login"> מסכים </label>|
            </div>
            <h1 className="welcome"> TALAT TECH מבצעי השבוע  ב  </h1>
           

            <div className="products">
                {products.map(prod =>
                    <Product
                        key={prod.id}
                        product={prod}
                    />
                )}
            </div>
        </div>
    )

}

export default Home
