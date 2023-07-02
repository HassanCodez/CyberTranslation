"use client";

import { useState } from "react";
import './animations.css'
export default function OpenTranslator({}) {
  const [input, setInput] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('ar')
  const url = "https://opentranslator.p.rapidapi.com/translate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "4d953eeb49msh5c3db1eecb0b299p15899ejsncb2254e56bb3",
      "X-RapidAPI-Host": "opentranslator.p.rapidapi.com",
    },
    body: JSON.stringify({
      text: input,
      target: selectedLanguage,
    }),
  };
  const handleTranslate = async () => {
    try {
        setLoading(true)
      const response = await fetch(url, options);
      const results = await response.text();
      const result = JSON.parse(results);
      setTranslated(result[0].result.text);
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false)

    }
  };
  console.log(translated);

  return (
    <section className="flex flex-row max-sm:flex-col justify-start items-start h-96 px-5">
      <div className="w-1/2 max-sm:w-full flex flex-col gap-5 justify-center items-center px-5">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-tl-3xl h-60 rounded-tr-md max-sm:rounded-tr-3xl rounded-bl-3xl rounded-br-md max-sm:rounded-br-3xl outline-none p-3 shadow-violet-500/50 shadow-2xl"
          rows="9"
          cols="120"
          placeholder="Type here..."
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
  <div class="divider" aria-hidden="true"></div>
  <p class="loading-text" aria-label="Loading">
    <span class="letter" aria-hidden="true">L</span>
    <span class="letter" aria-hidden="true">o</span>
    <span class="letter" aria-hidden="true">a</span>
    <span class="letter" aria-hidden="true">d</span>
    <span class="letter" aria-hidden="true">i</span>
    <span class="letter" aria-hidden="true">n</span>
    <span class="letter" aria-hidden="true">g</span>
  </p>
</div> :
        <div style={{height:'100%', overflowY:'scroll'}}>{translated}</div>}
      </div>
    </section>
  );
}
