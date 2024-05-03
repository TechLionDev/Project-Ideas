"use client";
import { FormEvent } from "react";
import { useState } from "react";

const Page = () => {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [inputUrlValid, setInputUrlValid] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState("");
  function check(value: string): void {
    setInputUrl(value);
    const urlRegex = new RegExp(
      "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?$"
    );
    setInputUrlValid(urlRegex.test(value));
  }

  function shorten(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    let url = inputUrl;
    if (!inputUrlValid) {
      alert("Invalid URL");
      return;
    }
    (async () => {
      const response = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      setShortUrl(data.url);
    })();
  }

  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='flex flex-col p-8 rounded-lg w-fit drop-shadow-md items-center m-16 bg-slate-100'>
          <h1 className='text-3xl font-bold'>URL Shortener</h1>
          <p className='text-sm italic mt-2'>Shorten your URLs with ease</p>
          <form onSubmit={shorten} className='mt-4 flex'>
            <input
              type='text'
              placeholder='Enter a URL'
              className='border border-gray-300 px-2 py-1 rounded-md'
              value={inputUrl}
              onChange={(e) => check(e.target.value)}
            />

            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-1 rounded-md ml-2'
            >
              Shorten
            </button>
          </form>
          {inputUrlValid ? (
            <span className='flex gap-1 justify-start p-2 items-center'>
              <p className='bg-green-500 w-2 h-2 rounded-full'></p>
              <p className='text-green-500 text-sm'>Valid URL</p>
            </span>
          ) : (
            <span className='flex gap-1 justify-start p-2 items-center'>
              <p className='bg-red-500 w-2 h-2 rounded-full'></p>
              <p className='text-red-500 text-sm'>Invalid URL</p>
            </span>
          )}
          {shortUrl && (
            <div className='mt-4'>
              <p>Shortened URL:</p>
              <a href={shortUrl.slug} className="text-blue-500 underline" target='_blank' rel='noreferrer'>
                {(window.location.href.endsWith('/') ? window.location.href : window.location.href + '/') + shortUrl.slug}
              </a>
              {/* create a copy button taht copies the current page url domain followed by slug */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    (window.location.href.endsWith('/') ? window.location.href : window.location.href + '/') + shortUrl.slug
                  );
                }}
                className='bg-blue-500 text-white px-4 py-1 rounded-md ml-2'
              >
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
