import React from 'react'
import errors from './errors.css'
import p4 from "../../images/notfound.png"


export default function E404() {
    return (
        <div>
            <h1>404</h1>
            <img className="notfound" src={p4} />

        </div>
    )
}
