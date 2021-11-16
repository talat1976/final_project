import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { firebaseDB } from '../../../services/firebase'

export default function CreateProducts(props) {
    const { openmodal, onSubmit, onClose, item } = props
    const [categories, setCategories] = useState([])

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        qty: 0,
        image: undefined,
        desc: "",
        category: "",
        warranty: "",
        sale: 0,
        comp: "",
        rating: 0
    })


    useEffect(() => {
        const unsub = firebaseDB.collection("categories").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ id: item.id, ...item.data() }))
            setCategories(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        return () => unsub()
    }, [])

    useEffect(() => {
        if (item) {
            setProduct(item)
        }
    }, [item])

    const onChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const onFileChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] })
    }

    return (
        <Modal show={openmodal} onHide={onClose}>
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
                    <textarea className="form-control" type="text" name="desc" value={product.desc} onChange={onChange}>
                    </textarea>
                </div>

                <div>
                    <label>Category</label>
                    <select className="custom-select" name="category" value={product.category} onChange={onChange}>
                        <option value="">Not Selected</option>
                        {categories.map(category =>
                            <option key={category.id} value={category.value}>{category.display}</option>
                        )}
                    </select>
                </div>

                <div>
                    <label>Sale</label>
                    <input className="form-control" type="number" name="sale" value={product.sale} onChange={onChange} />
                </div>

                <div>
                    <label>Company</label>
                    <input className="form-control" type="text" name="comp" value={product.company} onChange={onChange} />
                </div>

                <div>
                    <label>אחריות</label>
                    <input className="form-control" type="text" name="warranty" value={product.warranty} onChange={onChange} />
                </div>

                <div>
                    <label>דירוג</label>
                    <input className="form-control" type="text" name="rating" value={product.rating} onChange={onChange} />
                </div>

                <button className="btn btn-primary mt-3" onClick={() => onSubmit(product)}>Submit</button>
            </div>
        </Modal>
    )
}
