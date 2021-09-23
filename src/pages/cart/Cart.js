import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { firebaseDB } from '../../services/firebase'
import "./cart.css"

const Cart = (props) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const total = products.reduce((t, pr) => t += (+pr.price), 0)

    const [cookies, setCookie] = useCookies(['cart'])



    useEffect(() => {
        if (cookies.cart) {
            const productIds = cookies.cart.split(",")



            const fetch = async () => {
                if (!productIds.length) {
                    return
                }

                setLoading(true)
                let prods = []

                for (let i = 0; i < productIds.length; i++) {
                    const prodRef = firebaseDB.collection("products").doc(productIds[i])
                    const doc = await prodRef.get()
                    prods.push({ ...doc.data(), id: doc.id })
                }

                setProducts(prods)
                setLoading(false)
            }

            fetch()

        }

    }, [cookies.cart])

    const onPayment = () => {
        props.history.push(`/payment/${total}`)
    }

    const onDeleteItem = (id) => {
        let pids = cookies.cart.split(",")
        pids = pids.filter(pid => pid != id)
        setCookie("cart", pids.join(","))
        window.location.reload()
    }


    return (
        <Container>
            <h1>  סל הקניות </h1>

            {loading && <Spinner animation="border" />}

            {products.map(prod =>
                <div className="cart-product" key={prod.id}>
                    <div className="cart-prodcut-info">
                        <img src={prod.image} />
                        <h3>{prod.name}</h3>
                    </div>
                    <div className="cart-prodcut-info">
                        <h4>₪{prod.price}</h4>
                        <Button size="sm" variant="danger" onClick={() => onDeleteItem(prod.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </div>
            )}

            {cookies.cart ?

                <div style={{ textAlign: "right" }}>

                    <h4> סה"כ לתשלום: ₪{total}</h4>
                    <Button onClick={onPayment}>לתשלום</Button>
                </div>
                :
                <div className="cart-empty">הסל ריק </div>
            }

        </Container>
    )
}

export default Cart
