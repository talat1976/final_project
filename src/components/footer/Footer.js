import React, { Component } from 'react'
import "./footer.css"

export default class Footer extends Component {
    render() {
        let date = new Date()

        return (
            <div className="footer">
             <h2 className= "talat">  Copyright &copy; {date.getFullYear()} -- Talat Salmh </h2>   
            </div>
        )
    }
}
