import React, { useState } from 'react'

export default function AdminLogin(props) {

    const [email, setemail] = useState("talat@gmail.com")
    const [password, setpassword] = useState("123456")

    const onClick = () => {
        if (email === "talat" && password === "123456") {
            props.onLoginSuccess()
        }
    }

    return (
        <div className="row">
            <div className="col-6 col-offset-3">
                <h2>Login</h2>
                <label>email</label>
                <input className="form-control" value={email} onChange={e => setemail(e.target.value)} />
                <label>password</label>
                <input className="form-control" type="password" value={password} onChange={e => setpassword(e.target.value)} />
                <button onClick={onClick} className="btn btn-primary mt-3">Login</button>

            </div>
        </div>
    )
}
