import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import { Link } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import Categories from './categories/Categories'
import { Orders } from './orders/Orders'
import { ProductsList } from './products/ProductsList'

import ReportsList from './reports/ReportsList'

export default function Admin() {

    const [loggedIn, setLoggedIn] = useState(false)

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
                            <Link to={`${path}/orders`} className="btn btn-primary mr-5">Orders</Link>
                            <Link to={`${path}/reports`} className="btn btn-primary mr-5">Reports</Link>
                            <Link to={`${path}/categories`} className="btn btn-primary">Categories</Link>
                        </div>
                        <Switch>
                            <Route path={`${path}/products`} component={ProductsList} />
                            <Route path={`${path}/reports`} component={ReportsList} />
                            <Route path={`${path}/orders`} component={Orders} />
                            <Route path={`${path}/categories`} component={Categories} />
                        </Switch>
                    </div>
                )
                :
                <AdminLogin onLoginSuccess={onLoginSuccess} />
            }
        </div>
    )
}
