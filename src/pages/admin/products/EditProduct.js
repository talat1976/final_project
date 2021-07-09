import React from 'react'
import ProudctModal from "./ProductModal"
import { firebaseDB } from '../../../services/firebase'

const EditProduct = (props) => {

    const onSubmit = (product) => {
        const productRef = firebaseDB.collection("products").doc(props.product.id)

        productRef.update({
            ...product
        })
            .then(() => props.onSuccess())
            .catch(() => console.log("error"))
    }

    return (
        <ProudctModal
            openmodal={props.openmodal}
            onSubmit={onSubmit}
            onClose={props.onClose}
            item={props.product}
        />
    )
}

export default EditProduct
