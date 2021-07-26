import React from 'react'
import "./login.css";
import { useState } from 'react'

export default function Login() {

    const [state, setstate] = useState([]);

    return (
        <div>
            <h1 className="login">: הרשמה לאתר </h1>
            <table class="table table-bordered border-primary">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">שם פרטי</th>
                        <th scope="col">שם משפחה</th>
                        <th scope="col">פלאפון</th>
                        <th scope="col">אימייל</th>
                        <th scope="col">תאריך לידה</th>
                        <th scope="col">מגורים</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>

            </table>

        </div>
    )
}
