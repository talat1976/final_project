
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { firebaseDB } from '../../../services/firebase'
import OrderProduct from './OrderProduct'

export const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const unsub = firebaseDB.collection("orders").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ personID: item.data().id, ...item.data(), id: item.id }))
            setOrders(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        return () => unsub()
    }, [])

    const onDelete = async (id) => {
        await firebaseDB.collection('orders').doc(id).delete()
    }

    const onDeliverChange = (e, id) => {
        const reportRef = firebaseDB.collection("orders").doc(id)

        reportRef.update({
            deliver: e.target.value
        })
            .catch(() => console.log("error"))
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">id</th>
                        <th scope="col">phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">status</th>
                        <th scope="col">deliver</th>
                        <th scope="col">created</th>
                        <th scope="col">products </th>
                        <th scope="col">amount</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>
                        <tr key={order.id}>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.personID}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>{order.status}</td>
                            <td>
                                <select value={order.deliver} onChange={(e) => onDeliverChange(e, order.id)}>
                                    <option value="in_progress">In Progress</option>
                                    <option value="in_way">In The Way</option>
                                    <option value="sent">Customer received</option>
                                </select>
                            </td>
                            <td>{order.created.toDate().toLocaleDateString("he-IL")}</td>
                            <td>
                                {order.products.map(prodId => <OrderProduct key={prodId} prodId={prodId} />)}
                            </td>
                            <td>{order.amount}</td>

                            <td>
                                <button className="btn btn-danger" onClick={() => onDelete(order.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )

}
