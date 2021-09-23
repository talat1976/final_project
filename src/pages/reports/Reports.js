import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import "./reports.css"
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { firebaseDB, firebaseStorage, timestamp } from '../../services/firebase'

const Reports = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        content: "",
        image: ""
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

        const file = form.image

        if (file) {
            const uploadTask = firebaseStorage.child(file.name).put(file)

            uploadTask.on("state_changed", (snap) => {
                console.log(snap)
            }, (error) => console.log(error),
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);

                        firebaseDB.collection("reports").add({
                            name: form.name,
                            email: form.email,
                            phone: form.phone,
                            content: form.content,
                            status: "new",
                            image: downloadURL,
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

                    })
                }
            )
        }
    }

    const onFileChange = (e) => {
        setForm({ ...form, image: e.target.files[0] })
    }

    return (
        <div className="container mt-1">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>דיווח על תקלות</h1>
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

                        <h2 className="mt-2">תודה רבה הדיווח שלך התקבל בהצלחה !</h2>
                        <div className="icon">
                            <FontAwesomeIcon className="check-icon" icon={faCheckCircle} />
                        </div>
                    </div>
                </div>
                :
                <div className="row">

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">שם מלא</label>
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
                        <label className="form-label">כתובת מייל</label>
                        <input type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={form.email}
                            onChange={onChange}
                            name="email"
                        />
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">פלאפון</label>
                        <input type="phone"
                            className="form-control"
                            placeholder="050000000000"
                            value={form.phone}
                            onChange={onChange}
                            name="phone"
                        />
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">קובץ/תמונה</label>
                        <div>
                            <input type="file"
                                onChange={onFileChange}
                                name="image"
                            />
                        </div>
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">תאור התקלה</label>
                        <textarea className="form-control"
                            rows="5"
                            value={form.content}
                            onChange={onChange}
                            name="content"></textarea>
                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <button className="btn btn-primary" onClick={onSubmit}>אישור</button>
                    </div>

                </div>
            }
        </div>
    )
}

export default Reports
