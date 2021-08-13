import { faCheck, faChevronDown, faExclamationCircle, faRunning, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'

const ReportItem = ({ report, onStatusChange, onDelete }) => {

    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(report.content.substring(0, 50))

    useEffect(() => {
        if (open) {
            setContent(report.content)
        } else {
            setContent(report.content.substring(0, 50))
        }
    }, [open])

    const onClick = () => {
        setOpen(!open)
    }

    return (
        <tr key={report.id} onClick={onClick}>
            <th scope="col">
                {report.status === "new" &&
                    <FontAwesomeIcon color="red" icon={faExclamationCircle} />
                }

                {report.status === "processing" &&
                    <FontAwesomeIcon color="gray" icon={faRunning} />
                }

                {report.status === "done" &&
                    <FontAwesomeIcon color="green" icon={faCheck} />
                }
            </th>
            <th scope="col">{report.name}</th>
            <th scope="col">{report.email}</th>
            <th scope="col">{report.phone}</th>
            <th scope="col">
                {content}
                {(!open && report.content.length >= 50) &&
                    <span>...<FontAwesomeIcon icon={faChevronDown} /></span>
                }
            </th>
            <th scope="col">
                <select value={report.status} onChange={(e) => onStatusChange(e, report.id)}>
                    <option value="new">New</option>
                    <option value="processing">Processing</option>
                    <option value="done">Done</option>
                </select>

            </th>
            <th scope="col">
                <button className="btn btn-danger" onClick={() => onDelete(report.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </th>
        </tr>
    )
}

export default ReportItem
