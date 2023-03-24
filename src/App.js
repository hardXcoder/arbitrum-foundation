import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import oops from './oops';
import { CircleLoader } from 'react-spinners';
import IntractAttribution from "@intract/attribution";
import { trackCustomWallet } from "@intract/attribution";




function App() {

  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    IntractAttribution("641d6158f80e98ca5c736c26", {
      configAllowCookie: true
    });
  }, []);


  function handleInputChange(event) {
    setText(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    const response = await fetch('https://twitterapi.ftwdao.xyz/api/check-address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        "address": text,
        "url": "sdf"
      })
    });

    const data = await response.json();
    console.log(data);


    trackCustomWallet(text);

    setLoading(false);

    setSubmitted(true);

  }



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>Check your hidden arbitrum airdrop ? </b>
        </p>



        {loading ? (
          <div className="loader-container">
            <CircleLoader color="#669ACF" size={100} />
          </div>
        ) : submitted ? (
          <h2 className="App-link">Oops! You got no extra airdrop.</h2>
        ) :
          (
            <div class="form-container">
              <form onSubmit={handleSubmit}>
                <div class="input-container">
                  <input type="text" placeholder="Just enter your arbitrum address here..." value={text} onChange={handleInputChange} />
                </div>
                <button type="submit" class="submit-button">Submit</button>
              </form>
            </div>
          )
        }





      </header>
    </div>
  );
}

export default App;
