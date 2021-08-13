import React, { useState } from 'react'
import { firebaseDB, timestamp } from '../../services/firebase'

const Reports = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        content: ""
    })

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setForm({ ...form, [name]: value })
    }

    const onSubmit = () => {
        setError("")

        if (!form.name || !form.email || !form.content) {
            setError("Name and email and content is required")
            return
        }

        firebaseDB.collection("reports").add({
            name: form.name,
            email: form.email,
            phone: form.phone,
            content: form.content,
            status: "new",
            created: timestamp()
        })
            .then(ref => {
                console.log("success")

                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    content: ""
                })

                setSuccess(true)
            })
            .catch((err) => console.log(err))
    }



    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Reports</h1>
                </div>
            </div>

            {error &&
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="mt-3 mb-3 alert alert-danger">{error}</div>
                    </div>
                </div>
            }

            {success ?
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="mt-5">Thank you your report has recived succussfully!</h2>
                    </div>
                </div>
                :
                <div className="row">

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">Fullname</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={form.name}
                            onChange={onChange}
                            name="name"
                        />
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={onChange}
                            name="email"
                        />
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">Phone</label>
                        <input type="phone"
                            className="form-control"
                            placeholder="050000000000"
                            value={form.phone}
                            onChange={onChange}
                            name="phone"
                        />
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">Content</label>
                        <textarea className="form-control"
                            rows="5"
                            value={form.content}
                            onChange={onChange}
                            name="content"></textarea>
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <button className="btn btn-primary" onClick={onSubmit}>Submit</button>
                    </div>

                </div>
            }
        </div>
    )
}

export default Reports
