import React from 'react'
import { firebaseDB, firebaseStorage, timestamp } from '../../../services/firebase'
import ProudctModal from "./ProductModal"

export default function CreateProducts(props) {

    const onAdd = async (product) => {
        const file = product.image

        if (file) {
            const uploadTask = firebaseStorage.child(file.name).put(file)

            uploadTask.on("state_changed", (snap) => {
                console.log(snap)
            }, (error) => console.log(error),
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        firebaseDB.collection("products").add({
                            name: product.name,
                            price: +product.price,
                            qty: +product.qty,
                            image: downloadURL,
                            desc: product.desc,
                            sale: +product.sale,
                            comp: product.comp,
                            warranty: product.warranty,
                            category: product.category,
                            rating: product.rating,
                            created: timestamp()
                        })
                            .then(docRef => props.onSuccess())
                            .catch((err) => console.log(err))
                    })
                }
            )
        }
    }

    return (
        <ProudctModal openmodal={props.openmodal} onClose={props.onClose} onSubmit={onAdd} />
    )
}
