import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { faFacebook, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import "./footer.css"

export default class Footer extends Component {
    render() {
        let date = new Date()

        return (
            <div className="footer">
                <div>
                    <h2 className="talat">Copyright &copy; {date.getFullYear()} -- Talat Salmh </h2>
                </div>

                <div className="social">
                    <a href="https://www.facebook.com/talat.salmh/">
                        <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                    </a>
                    <a href="https://www.youtube.com/watch?v=iNcwqdotnOQ">
                        <FontAwesomeIcon className="social-icon" icon={faYoutube} />
                    </a>
                    <a href="https://web.whatsapp.com/?send=+972523034046">
                        <FontAwesomeIcon className="social-icon" icon={faWhatsapp} />
                    </a>
                </div>
            </div>
        )
    }
}
