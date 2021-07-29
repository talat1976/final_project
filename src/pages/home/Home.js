import React, { useEffect, useState } from 'react'
import "./home.css"
import ProductItem from "../../components/product/ProductItem"
import { firebaseDB } from '../../services/firebase'
import { Link } from 'react-router-dom'

const Home = (props) => {

    const [products, setProducts] = useState([])
    const [filterdProducts, setFilterdProducts] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
        const unsub = firebaseDB.collection("products").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ id: item.id, ...item.data() }))
            setProducts(arr)
            setFilterdProducts(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        return () => unsub()
    }, [])

    useEffect(() => {
        if (filter) {
            if (filter === "sale") {
                const prods = products.filter(p => p.sale > 0)
                setFilterdProducts(prods)
            } else {
                const prods = products.filter(p => p.category === filter)
                setFilterdProducts(prods)
            }
        } else {
            setFilterdProducts(products)
        }
    }, [filter])

    const onView = (id) => {
        props.history.push(`/product/${id}`)

    }

    return (

        <div className="page" id="home">
            <div className="links">
                <div className="link" onClick={() => setFilter("")}>הכל</div>
                <div className="link" onClick={() => setFilter("sale")}>מבצע השבוע</div>
                <div className="link" onClick={() => setFilter("pc")}>מחשבים נייחים / וניידים</div>
                <div className="link" onClick={() => setFilter("mobile")}>  סמארטפונים / טאבלטים</div>
                <div className="link" onClick={() => setFilter("tools")}>  ציוד נלווה</div>
                <div className="link" onClick={() => setFilter("hardware")}>חומרה למחשבים </div>
                <div className="link" onClick={() => setFilter("monitor")}> מסכים </div>

            </div>

            {(filter === "sale") && <h1 className="sale-banner"> TALAT TECH מבצעי השבוע  ב  </h1>}

            <div className="products">
                {filterdProducts.map(prod =>
                    <ProductItem
                        key={prod.id}
                        product={prod}
                        onClick={() => onView(prod.id)}
                    />
                )}
            </div>
        </div>
    )

}

export default Home
