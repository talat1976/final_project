import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import { ProductsList } from './products/ProductsList'

export default function Admin() {

    const [loggedIn, setLoggedIn] = useState(true)

    const { path } = useRouteMatch()

    const onLoginSuccess = () => {
        setLoggedIn(true)
    }

    return (
        <div className="container mt-5">
            {loggedIn ?
                (
                    <div>
                        <div className="mb-5">
                            <Link to={`${path}/products`} className="btn btn-primary mr-5">Products</Link>
                            <Link className="btn btn-primary mr-5">Orders</Link>
                            <Link className="btn btn-primary">Reports</Link>
                        </div>
                        <Switch>
                            <Route path={`${path}/products`} component={ProductsList} />
                        </Switch>
                    </div>
                )
                :
                <AdminLogin onLoginSuccess={onLoginSuccess} />
            }
        </div>
    )
}
