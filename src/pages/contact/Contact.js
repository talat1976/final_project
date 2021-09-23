import React from 'react'
import './contact.css'
import p5 from "../../images/TalatTech.png"

export default function Contact() {
  return (

    <div className="contact">

      <h1><u>אנו עומדים לשירותכם</u></h1>

      <div className="abut">
        <h3> בימים א'-ה' בין השעות 18:30 - 12:00 </h3>
        <h3>כתובת: עין נקובא, רחוב הגנים 114   </h3>
        <h3> talat.salmh21@gmail.com :דוא"ל</h3>
        <h3> טלפון: 052-3034046 </h3>
        <h3> טלפקס: 02-5709321 </h3>
      </div>

      <img src={p5} />

    </div>
  )
}
