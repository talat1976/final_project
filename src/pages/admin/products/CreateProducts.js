import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ReactModal from 'react-modal'
import { firebaseDB, firebaseStorage, timestamp } from '../../../services/firebase'

export default function CreateProducts(props) {

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        qty: 0,
        image: undefined,
        desc: "",
        sale: 0,
        comp: ""
    })

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const onFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] })
    }

    const onAdd = async () => {
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
        <Modal show={props.openmodal} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new product</Modal.Title>
            </Modal.Header>
            <div className="p-4">
                <div>
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" value={product.name} onChange={onChange} />
                </div>

                <div>
                    <label>Price</label>
                    <input className="form-control" type="number" name="price" value={product.price} onChange={onChange} />
                </div>

                <div>
                    <label>Quantity</label>
                    <input className="form-control" type="number" name="qty" value={product.qty} onChange={onChange} />
                </div>

                <div>
                    <label>Image</label>
                    <input className="form-control" type="file" onChange={onFileChange} />
                </div>

                <div>
                    <label>Description</label>
                    <input className="form-control" type="text" name="desc" value={product.desc} onChange={onChange} />
                </div>

                <div>
                    <label>Sale</label>
                    <input className="form-control" type="number" name="sale" value={product.sale} onChange={onChange} />
                </div>

                <div>
                    <label>Company</label>
                    <input className="form-control" type="text" name="comp" value={product.company} onChange={onChange} />
                </div>

                <button className="btn btn-primary mt-3" onClick={onAdd}>Add</button>
            </div>
        </Modal>
    )
}
