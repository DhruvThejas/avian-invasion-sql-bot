import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import ThemeButton from "../components/ThemeButton";
import LoadingDots from "../components/LoadingDots";
import { useTheme } from "next-themes";
import Toggle from "../components/Toggle";
import { Header } from "../components/Header/Header";
import { GreenOrb, OrangeOrb, WhiteOrb } from "../components/atoms/Orbs";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";



const page = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState([]);
  const [outputText, setOutputText] = useState("");
  const submit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const input = inputText.trim();
    if (input === "") {
      return;
    }
    fetch(
      "http://127.0.0.1:5000/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputText: input,
        }),
      }
    ).then((response) => response.json())
      .then((data) => {
        setOutputText(data.outputText);
        setData(data.result);
        console.log(data);
      });
      
  }
  return (
    <div className=" max-w-4xl mx-auto ">
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <Head>
        <title className="flex justify-between items-center w-full mt-5 pb-7 sm:px-4 px-2">
          Human to SQL Translator
        </title>
      </Head>

      <div className="flex flex-col md:flex-row w-full justify-around  gap-6  text-white bg-black border-2 border-white/20 rounded-2xl p-2">
        <div className=" w-full">
          <form
            onSubmit={(event) =>(event)}
            className="rounded-xl bg-[#171717] container-w-gradient-border dark-container-w-gradient-border p-3 h-full w-full"
          >
            <div className="flex flex-col h-full">
              <label
                htmlFor="inputText"
                className="block font-medium mb-2 text-gray-200"
              >
                Human Language
              </label>
              <textarea
                className={`appearance-none border-0 rounded-lg w-full py-2 px-3 bg-[#1d1d1d] text-white leading-tight focus:outline-none focus:shadow-outline ${
                  "placeholder-dark"
                }`}
                id="inputText"
                rows={3}
                placeholder={
                    "e.g. show me all the cars that are red"
                }
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    (event.metaKey || event.ctrlKey)
                  ) {
                    event.preventDefault();
                    // handleCopy(outputText, true);
                  }
                }}
                required
              />

              <div className="flex items-center justify-between my-3 last:mb-0 space-x-10">

                <button
                  type="submit"
                  className={`cursor-pointer bg-white  py-2 px-4 rounded-full  [text-shadow:0_0_1px_rgba(0,0,0,0.25)] shadow-2xl flex flex-row items-center justify-start `}
                  onClick={(event) => {submit(event)}}
                >
                  <div className="relative text-sm font-semibold font-inter text-black text-center inline-block mx-auto">
                    {
                    (
                      `Generate SQL `
                    )}
                  </div>
                </button>
              </div>

            </div>
          </form>
        </div>
        <div className=" my-auto">
          {/*  swap icon*/}
          <svg width="64px" height="64px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.256"></g><g id="SVGRepo_iconCarrier"><polyline points="32 24 40 24 40 16 56 28 40 40 40 32 24 32 24 24 8 36 24 48 24 40 32 40"></polyline></g></svg>
        </div>
        <div className=" w-full">
          <div className="flex flex-col rounded-xl bg-[#171717] p-3 h-full w-full custom-width sm:w-auto">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="outputText"
                className="block mb-2 font-medium text-gray-200"
              >
                SQL
              </label>
              <textarea
                className={`appearance-none border-0 rounded-lg w-full py-2 px-3 bg-[#1d1d1d] text-white leading-tight focus:outline-none focus:shadow-outline ${
                  "placeholder-dark"
                }`}
                id="outputText"
                rows={3}
                value={outputText}
                onChange={(e)=>(setOutputText(e.target.value))}
                placeholder={
                  "e.g. SELECT * FROM cars WHERE color = 'red'"
                }
                />
            </div>

            <div className="flex items-center mt-3 justify-between">
              <div className="flex items-center gap-1">

              </div>
            </div>
            <textarea
              className="hidden"
              id="outputText"
              readOnly
            />
          </div>
        </div>
      </div>
      
    </div></div>
  );
}

export default page;