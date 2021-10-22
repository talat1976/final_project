import { faCheck, faExclamationCircle, faRunning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { firebaseDB } from '../../../services/firebase'
import ReportItem from './ReportItem'

const ReportsList = () => {

    const [reports, setReports] = useState([])

    useEffect(() => {
        const unsub = firebaseDB.collection("reports").onSnapshot((snap) => {
            const arr = snap.docs.map(item => ({ id: item.id, ...item.data() }))
            setReports(arr)
        },
            (error) => console.log(error),
            () => console.log("complete")
        )

        return () => unsub()
    }, [])

    const onStatusChange = (e, id) => {
        const reportRef = firebaseDB.collection("reports").doc(id)

        reportRef.update({
            status: e.target.value
        })
            .catch(() => console.log("error"))
    }

    const onDeleteReport = async (id) => {
        await firebaseDB.collection('reports').doc(id).delete()
    }

    return (
        <div>
            <div className="d-flex justify-content-between" >
                <h2>Reports</h2>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">name</th>
                        <th scope="col">email</th>
                        <th scope="col">phone</th>
                        <th scope="col">type</th>
                        <th scope="col">content</th>
                        <th scope="col">image</th>
                        <th scope="col">device image</th>
                        <th scope="col">status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map(report =>
                        <ReportItem
                            onDelete={onDeleteReport}
                            report={report}
                            onStatusChange={onStatusChange}
                            key={report.id}
                        />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ReportsList
