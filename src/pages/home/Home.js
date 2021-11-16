import React, { useEffect, useState } from 'react'
import "./home.css"
import ProductItem from "../../components/product/ProductItem"
import { firebaseDB } from '../../services/firebase'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Home = (props) => {

    const [products, setProducts] = useState([])
    const [filterdProducts, setFilterdProducts] = useState([])
    const [filter, setFilter] = useState("")
    const [search, setSearch] = useState("")
    const [categories, setCategories] = useState([])

    const [cookies, setCookie] = useCookies(['cart'])

    useEffect(() => {
        const unsub = firebaseDB.collection("products").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ id: item.id, ...item.data() }))
            setProducts(arr)
            setFilterdProducts(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        firebaseDB.collection("categories").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ id: item.id, ...item.data() }))
            setCategories(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        return () => unsub()
    }, [])

    useEffect(() => {
        let searchProduct = []

        if (filter) {
            if (filter === "sale") {
                const prods = products.filter(p => p.sale > 0)
                searchProduct = prods
            } else {
                const prods = products.filter(p => p.category === filter)
                searchProduct = prods
            }
        } else {
            searchProduct = products
        }

        if (search.length > 0) {
            searchProduct = searchProduct.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilterdProducts(searchProduct)
    }, [filter, search])

    const onView = (id) => {
        props.history.push(`/product/${id}`)

    }

    const onAddToCart = (id) => {
        if (cookies.cart) {
            setCookie("cart", `${cookies.cart},${id}`)
        } else {
            setCookie("cart", `${id}`)
        }
    }

    return (
        <div className="page" id="home">
            <div className="links">
                <div
                    className={`link ${filter === "" ? "active" : ""}`}
                    onClick={() => setFilter("")}
                >
                    הכל
                </div>

                <div className={`link ${filter === "sale" ? "active" : ""}`} onClick={() => setFilter("sale")}>מבצע השבוע</div>

                {categories.map(category =>
                    <div
                        key={category.id}
                        className={`link ${filter === category.value ? "active" : ""}`}
                        onClick={() => setFilter(category.value)}
                    >
                        {category.display}
                    </div>
                )}

            </div>

            {(filter === "sale") && <h1 className="sale-banner"> TALAT TECH  מבצעי השבוע  ב  </h1>}

            <div className="search">
                <label>חיפוש</label>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="חיפוש" />
            </div>

            <div className="products">
                {filterdProducts.map(prod =>
                    <ProductItem
                        key={prod.id}
                        onAddToCart={onAddToCart}
                        product={prod}
                        onClick={() => onView(prod.id)}
                    />
                )}
            </div>
        </div>
    )

}

export default Home
