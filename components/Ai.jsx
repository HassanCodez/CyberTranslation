"use client";

import { useState } from "react";
import './animations.css'
import {HiSwitchHorizontal} from 'react-icons/hi'
export default function Ai({}) {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('ar')
  const url = 'https://chatgpt-bing-ai-chat-api.p.rapidapi.com/ask';
  const options = {
      method: 'POST',
      headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '4d953eeb49msh5c3db1eecb0b299p15899ejsncb2254e56bb3',
          'X-RapidAPI-Host': 'chatgpt-bing-ai-chat-api.p.rapidapi.com'
      },
      body: JSON.stringify({
          question: `translate to ${selectedLanguage}: ${input}`,
          bing_u_cookie: '1oL8fZvQ-G1Yyw6KCkmRe-eSIuTxBKqaAlbB5TywilgLXn17qluiXezV1BQWWDXB9ZH9njcOZcsL4pJCffcxenLJDZjYGykA-fHnYQ9scoL99k1r-Lq7OgO_d7RFkrWw6INjJv1xyEz8DlnGQjgxRjsmTNdlO5kAEQSnvjesm72H8r88hELwnaN2zSgPd7jdOm66UtG6QxndlgdxMuNNmXQ'
      })
  };
    const handleTranslate = async () => {
    try {
        setLoading(true)
      const response = await fetch(url, options);
      const results = await response.text();
      const result = JSON.parse(results);

      console.log(results)
      console.log(result)
      setTranslated(result.text_response);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)

    }
  };

  const changeLanguage = ()=> {
    if(selectedLanguage === 'ar') {
        setSelectedLanguage('en')
    } else{
        setSelectedLanguage('ar')

    }
  }

  return (
    <section className="flex flex-col justify-start gap-5 items-start h-96 px-5">
        <p className="text-white">Need more accurate translation?</p>
        <p className="text-white">*use it for the longer texts and if the first method didn't fulfill your needs</p>
            <div className="flex w-full justify-between text-white px-12">
        <div>{selectedLanguage === 'ar' ? 'English' : 'Arabic'}</div>
        <HiSwitchHorizontal className="cursor-pointer" onClick={changeLanguage}/>
        <div>{selectedLanguage === 'ar' ? 'Arabic' : 'English'}</div>

            </div>
    <div className="flex w-full">
    <div className="w-1/2 max-sm:w-full flex flex-col gap-5 justify-center items-center px-5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-tl-3xl h-60 rounded-tr-md max-sm:rounded-tr-3xl rounded-bl-3xl rounded-br-md max-sm:rounded-br-3xl outline-none p-3 shadow-violet-500/50 shadow-2xl"
          rows="9"
          cols="120"
          placeholder="Type here..."
          style={{direction:selectedLanguage === 'ar' ? 'ltr' : 'rtl'}}
        />
        <button
          className="rounded-full bg-indigo-600 p-3 shadow-violet-500/50 shadow-md hover:shadow-red-400/50 text-white"
          onClick={() => handleTranslate()}
        >
          translate
        </button>
      </div>
      <div
        className={`w-1/2 max-sm:w-full ${loading && 'flex justify-center items-center'} bg-white h-60 rounded-tl-md rounded-tr-3xl rounded-bl-md rounded-br-3xl outline-none p-3 shadow-violet-500/50 shadow-2xl`}
        style={{ direction: "rtl" }}
      >
    {loading ?  <div id="container" style={{direction:'ltr'}}>
  <div className="divider" aria-hidden="true"></div>
  <p className="loading-text" aria-label="Loading">
    <span className="letter" aria-hidden="true">L</span>
    <span className="letter" aria-hidden="true">o</span>
    <span className="letter" aria-hidden="true">a</span>
    <span className="letter" aria-hidden="true">d</span>
    <span className="letter" aria-hidden="true">i</span>
    <span className="letter" aria-hidden="true">n</span>
    <span className="letter" aria-hidden="true">g</span>
  </p>
</div> :
        <div style={{height:'100%', overflowY:'scroll'}}>{translated}</div>}
      </div>
    </div>
    </section>
  );
}
