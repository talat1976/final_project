import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import "./reports.css"
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { firebaseDB, firebaseStorage, timestamp } from '../../services/firebase'
import Loader from 'react-loader-spinner'

const Reports = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        type: "",
        content: "",
        image: "",
        deviceImage: ""
    })

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setForm({ ...form, [name]: value })
    }

    const onSubmit = async () => {
        setError("")
        setLoading(true)

        let url = ""
        let deviceUrl = ""

        if (!form.name || !form.email || !form.content || !form.phone) {
            setLoading(false)
            setError("חובה לרשום את  השם /והמייל /והטלפון /ותיאור הבעייה ... !")
            return
        }

        if (form.image) {
            url = await uploadFile(form.image)
        }

        if (form.deviceImage) {
            deviceUrl = await uploadFile(form.deviceImage)
        }

        firebaseDB.collection("reports").add({
            name: form.name,
            email: form.email,
            phone: form.phone,
            content: form.content,
            type: form.type,
            status: "new",
            image: url,
            deviceImage: deviceUrl,
            created: timestamp()
        })
            .then(ref => {
                console.log("success")

                setForm({
                    name: "",
                    email: "",
                    phone: "",
                    type: "",
                    content: ""
                })

                setLoading(true)
                setSuccess(true)
            })
            .catch((err) => console.log(err))
    }

    const uploadFile = (file) => {
        return new Promise(function (resolve, reject) {
            //Upload file
            const task = firebaseStorage.child(file.name).put(file)

            //Update progress bar
            task.on('state_changed',
                (snapshot) => { },
                (err) => {
                    reject(err)
                    console.error(err)
                },
                () => {
                    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const onFileChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.files[0] })
    }

    return (
        <div className="container mt-1" id="reports">
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
                        <div className="form-label">תמונת המכשיר</div>
                        <div class="badge badge-secondary mb-1">אין חובה לצלם אך כל מידע נוסף יסייע באיתור מהיר יותר לתקלה</div>
                        <div>
                            <input
                                type="file"
                                onChange={onFileChange}
                                name="image"
                            />
                        </div>

                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <label className="form-label">   סוג המכשיר</label>
                        <select type="text" className="form-control"
                            value={form.type}
                            onChange={onChange}
                            name="type"
                        >
                            <option value="" >תבחר סוג מכשיר</option>
                            <option value="galaxy">גלאקסי</option>
                            <option value="iphone">איפון</option>
                            <option value="laptop">מחשב נייד</option>
                            <option value="computer">מחשב נייח</option>
                            <option value="another">אחר</option>
                        </select>


                    </div>

                    <div className="col-md-6 offset-md-3 mb-3">
                        <div className="form-label">תמונת התקלה</div>
                        <div class="badge badge-secondary mb-1">אין חובה לצלם אך כל מידע נוסף יסייע באיתור מהיר יותר לתקלה</div>
                        <div>
                            <input
                                type="file"
                                onChange={onFileChange}
                                name="deviceImage"
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
                        {loading ? <Loader type="TailSpin" color="#00BFFF" height={60} width={60} /> :
                            <button className="btn btn-primary" onClick={onSubmit}>אישור</button>
                        }
                    </div>

                </div>
            }
        </div>
    )
}

export default Reports
