import React from 'react'

import { Helmet } from 'react-helmet'

import './rent-form.css'

const RentForm = (props) => {
  return (
    <div className="rent-form-container">
      <Helmet>
        <title>Direct Giving Seal</title>
        <meta property="og:title" content="Direct Giving Seal" />
      </Helmet>
      <div className="rent-form-container1">
        <h1>Įkelti skelbimą</h1>
      </div>
      <div className="rent-form-container2">
        <div className="rent-form-container3"></div>
        <input type="text" placeholder="Pavadinimas" className="input" />
      </div>
      <div className="rent-form-container4">
        <div className="rent-form-container5"></div>
        <input type="text" placeholder="Kaina" className="input" />
      </div>
      <div className="rent-form-container6">
        <div className="rent-form-container7"></div>
        <input type="text" placeholder="Aprašymas" className="input" />
      </div>
      <div className="rent-form-container8">
        <button type="button" className="rent-form-button button">
          <span>
            <span>Įkelti</span>
            <br></br>
          </span>
        </button>
      </div>
    </div>
  )
}

export default RentForm
