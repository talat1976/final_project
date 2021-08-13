import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { firebaseDB, timestamp } from '../../services/firebase'

const init = {
    name: "",
    email: "",
    phone: "",
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
            setErrors(errors => ({ ...errors, name: "Name is required" }))
            valid = false
        }

        if (!form.email) {
            setErrors(errors => ({ ...errors, email: "Email is required" }))
            valid = false
        }

        if (!form.phone) {
            setErrors(errors => ({ ...errors, phone: "Phone is required" }))
            valid = false
        }

        if (!form.id) {
            setErrors(errors => ({ ...errors, id: "ID is required" }))
            valid = false
        }

        if (!form.card) {
            setErrors(errors => ({ ...errors, card: "Card is required" }))
            valid = false
        }

        if (!form.cvv) {
            setErrors(errors => ({ ...errors, cvv: "Cvv is required" }))
            valid = false
        }

        if (!form.exp) {
            setErrors(errors => ({ ...errors, exp: "Exp is required" }))
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
            id: form.id,
            status: "paid",
            amount: total,
            created: timestamp()
        })
            .then(ref => {
                console.log("success")

                setSuccess(true)


            })
            .catch((err) => console.log(err))

        setCookie("cart", "")

        setLoading(false)
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6 offset-md-3 mb-3 mt-3">
                    <h2>Payments</h2>
                </div>
            </div>

            {success ?
                <div>
                    Thank for buying from Talet TECH,
                    you will recive your order up to working 14 days
                </div>
                :
                loading ?
                    <div>
                        <Spinner animation="border" />
                        <h4>Please wait unitl we proccess your order</h4>
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
                            {errors.name && <div className="text-danger small">{errors.name}</div>}
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
                            {errors.email && <div className="text-danger small">{errors.email}</div>}
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
                            {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                        </div>

                        <div className="col-md-6 offset-md-3 mb-3">
                            <label className="form-label">ID</label>
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
                            <label className="form-label">Credit Card</label>
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
                                    <label className="form-label">Exp</label>
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
                            <button className="btn btn-primary" onClick={onSubmit}>Pay ₪{total}</button>
                        </div>

                    </div>
            }

        </div>
    )
}

export default Payment
