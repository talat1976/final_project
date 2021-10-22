import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { firebaseDB, timestamp } from '../../services/firebase'
import "./payment.css"

const init = {
    name: "",
    email: "",
    phone: "",
    address: "",
    card: "",
    exp: "",
    cvv: "",
    id: "",
}

const Payment = (props) => {

    const [form, setForm] = useState(init)

    const [errors, setErrors] = useState(init)

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [cookies, setCookie] = useCookies(['cart'])

    const total = props.match.params.amount

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setForm({ ...form, [name]: value })
    }

    const validate = () => {
        setErrors(init)
        let valid = true

        if (!form.name) {
            setErrors(errors => ({ ...errors, name: " שדה חובה" }))
            valid = false
        }

        if (!form.email) {
            setErrors(errors => ({ ...errors, email: " שדה חובה" }))
            valid = false
        }

        if (!form.phone) {
            setErrors(errors => ({ ...errors, phone: " שדה חובה" }))
            valid = false
        }
        if (!form.address) {
            setErrors(errors => ({ ...errors, address: " שדה חובה" }))
            valid = false
        }

        if (!form.id) {
            setErrors(errors => ({ ...errors, id: " שדה חובה" }))
            valid = false
        }

        if (!form.card) {
            setErrors(errors => ({ ...errors, card: " שדה חובה" }))
            valid = false
        }

        if (!form.cvv) {
            setErrors(errors => ({ ...errors, cvv: " שדה חובה" }))
            valid = false
        }

        if (!form.exp) {
            setErrors(errors => ({ ...errors, exp: "שדה חובה" }))
            valid = false
        }

        return valid
    }

    const onSubmit = () => {
        if (!validate()) {
            return
        }

        setLoading(true)

        const prds = cookies.cart.split(",")

        firebaseDB.collection("orders").add({
            products: prds,
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
            id: form.id,
            status: "paid",
            deliver: "in_progress",
            amount: total,
            created: timestamp()
        })
            .then(ref => {
                console.log("success")

                setSuccess(true)
                setLoading(false)
                setCookie("cart", "")

            })
            .catch((err) => console.log(err))
    }

    return (
        <div >


            {success ?
                (
                    <div className="success" >
                        <div>
                            <h2>ההזמנה נקלטה בהצלחה</h2>
                            <FontAwesomeIcon className="check-icon" icon={faCheckCircle} />
                        </div>
                        <div className="success-text">
                            <h2>Talat Tech תודה שקניתם מ </h2>

                            <h3>המוצר יגיע אליכם תוך 14 ימי עסקים </h3>
                            <h3>נשמח לראות אותכם שוב</h3>

                        </div>
                    </div>
                )
                :
                (loading ?
                    <div>
                        <Spinner animation="border" />
                        <h4>אנא המתן אנחנו מכינים את ההזמנה שלך ...</h4>
                    </div>
                    :
                    <div className="row" id="dataText">

                        <div className="col-md-6 offset-md-3 mb-3 mt-3">
                            <h2 className="text-center" >לתשלום</h2>
                        </div>

                        <div className="col-md-6 offset-md-3 mb-3 ">
                            <label className="form-label">שם מלא</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="שם מלא"
                                value={form.name}
                                onChange={onChange}
                                name="name"
                            />
                            {errors.name && <div className="text-danger small">{errors.name}</div>}
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
                            {errors.email && <div className="text-danger small">{errors.email}</div>}
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
                            {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                        </div>

                        <div className="col-md-6 offset-md-3 mb-3">
                            <label className="form-label">כתובת כולל רחוב</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Jerusalem, street 10"
                                value={form.address}
                                onChange={onChange}
                                name="address"
                            />
                            {errors.address && <div className="text-danger small">{errors.address}</div>}
                        </div>

                        <div className="col-md-6 offset-md-3 mb-3">
                            <label className="form-label">מספר זהות</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.id}
                                onChange={onChange}
                                name="id"
                            />
                            {errors.id && <div className="text-danger small">{errors.id}</div>}
                        </div>

                        <div className="col-md-6 offset-md-3 mb-3">
                            <label className="form-label">מספר הכרטיס</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.card}
                                onChange={onChange}
                                name="card"
                            />
                            {errors.card && <div className="text-danger small">{errors.card}</div>}
                        </div>

                        <div className="col-md-6 offset-md-3 mb-3">
                            <div className="row">

                                <div className="col-md-6">
                                    <label className="form-label">תוקף הכרטיס</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.exp}
                                        onChange={onChange}
                                        name="exp"
                                    />
                                    {errors.exp && <div className="text-danger small">{errors.exp}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={form.cvv}
                                        onChange={onChange}
                                        name="cvv"
                                    />
                                    {errors.cvv && <div className="text-danger small">{errors.cvv}</div>}
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6 offset-md-3 mb-3">
                            <button className="btn btn-primary" onClick={onSubmit}>לתשלום ₪{total}</button>
                        </div>

                    </div>
                )}

        </div>
    )
}

export default Payment
