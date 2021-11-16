import React, { useEffect, useState } from 'react'
import { firebaseDB } from '../../../services/firebase'
import CreateProducts from './CreateProducts'
import EditProduct from './EditProduct'

export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState()
    const [openmodal, setopenmodal] = useState(false)
    const [editModal, setEditModal] = useState(false)

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

    const oncreateClick = () => {
        setopenmodal(true)
    }

    const onModalClose = () => {
        setopenmodal(false)
    }

    const onSuccess = () => {
        setopenmodal(false)
        setEditModal(false)
    }

    const onEditClick = (prd) => {
        setEditModal(true)
        setProduct(prd)
    }

    const onEditModalClose = () => {
        setEditModal(false)
    }

    const onDelete = async (id) => {
        const res = await firebaseDB.collection('products').doc(id).delete();
    }

    return (
        <div>
            <div className="d-flex justify-content-between" >

                <h2>Products</h2>
                <button className="btn btn-success" onClick={oncreateClick}>Create new Product</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">desc</th>
                        <th scope="col">qty</th>
                        <th scope="col">sale</th>
                        <th scope="col">category</th>
                        <th scope="col">comp</th>
                        <th scope="col">Rating</th>
                        <th scope="col" >img</th>
                        <th scope="col" > </th>

                    </tr>
                </thead>
                <tbody>
                    {products.map(prd =>
                        <tr key={prd.id}>
                            <th scope="row">{prd.name}</th>
                            <th scope="row">₪{prd.price}</th>
                            <th scope="row">{prd.desc}</th>
                            <th scope="row">{prd.qty}</th>
                            <th scope="row">{prd.sale}</th>
                            <th scope="row">{prd.category ? prd.category : "---"}</th>
                            <th scope="row">{prd.comp}</th>
                            <th scope="row">{prd.rating}</th>
                            <th scope="row"><img src={prd.image} width="100px" /></th>
                            <th scope="row">
                                <button onClick={() => onEditClick(prd)} className="btn btn-primary">Edit</button>
                                <button className="btn btn-danger" onClick={() => onDelete(prd.id)}>Delete</button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>

            <CreateProducts openmodal={openmodal} onSuccess={onSuccess} onClose={onModalClose} />

            <EditProduct
                product={product}
                openmodal={editModal}
                onSuccess={onSuccess}
                onClose={onEditModalClose}
            />
        </div>
    )
}
