import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { firebaseDB, timestamp } from '../../../services/firebase'
import "./categories.css"

const Categories = () => {
    const [category, setCategory] = useState("")
    const [categoryValue, setCategoryValue] = useState("")
    const [categories, setCategories] = useState([])

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

    const onClick = () => {
        firebaseDB.collection("categories").add({
            value: categoryValue,
            display: category,
            created: timestamp()
        })
            .then(() => console.log("success"))
            .catch((err) => console.log(err))

        setCategory("")
        setCategoryValue("")
    }

    const onDelete = async (id) => {
        await firebaseDB.collection('categories').doc(id).delete()
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Display"
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        value={categoryValue}
                        onChange={(e) => setCategoryValue(e.target.value)}
                        placeholder="Value"
                    />
                </div>
            </div>


            <button className="btn btn-primary mt-2" onClick={onClick}>Add Category</button>

            <hr />

            <h2>Categories List</h2>

            <div>
                {categories && categories.map(cate =>
                    <div className="category" key={cate.id}>
                        <div className="text">
                            <div>{cate.display}</div>
                            {" - "}
                            <div>{cate.value}</div>
                        </div>
                        <div>
                            <button className="btn btn-danger" onClick={() => onDelete(cate.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categories
