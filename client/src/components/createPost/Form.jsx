import React, { useState } from "react";
import { getRandomPrompt } from "../../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [shareing, setShareing] = useState(false);
  const [submit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSuprize = async () => {
    const res = await getRandomPrompt();
    setPrompt(res);
  };

  const generateImage = async () => {
    if (prompt.trimStart() !== "") {
      try {
        setGeneratingImage(true);
        const response = await fetch(
          "https://dall-e-clone-backend.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt }),
          }
        );
        const data = await response.json();
        setPhoto(`data:image/jpeg;base64,${data.photo}`);
        setGeneratingImage(false);
      } catch (error) {
        console.log(error);
        setGeneratingImage(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !prompt || !photo) {
      error("Please fill the form completely");
    } else {
      try {
        setSubmit(true);
        setShareing(true);
        const response = await fetch(
          "https://dall-e-clone-backend.onrender.com/api/v1/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt, name, photo }),
          }
        );
        await response.json();
        navigate("/");
        setShareing(false);
        setSubmit(false);
      } catch (error) {
        console.log(error);
        setShareing(false);
        setSubmit(false);
      }
    }
  };
  const error = (message) => toast.error(message);
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="">
          Your name
        </label>
        <input
          className="h-[40px] outline-none p-2 border rounded-md"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold" htmlFor="">
          Prompt{" "}
          <button
            type="button"
            onClick={() => handleSuprize()}
            className="rounded-md bg-[#EDEDF3] p-1 px-2"
          >
            Suprise me{" "}
          </button>
        </label>
        <input
          className="h-[40px] outline-none p-2 border rounded-md"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A plush toy robot sitting againts a yellow wall"
        />
      </div>
      <div className="bg-white w-fit border rounded-md relative">
        {photo ? (
          <img className="w-[200px] text-gray  rounded-md" src={photo} alt="" />
        ) : (
          <img
            className="w-[200px] text-gray"
            src="/assets/preview.png"
            alt=""
          />
        )}
        <div
          className={`${
            generatingImage ? "block" : "hidden"
          } absolute left-1/2 top-1/2 -translate-x-1/2 text-black -translate-y-1/2 bg-[rgb(174,174,174,0.7)] p-1 rounded-md `}
        >
          <AiOutlineLoading3Quarters className="animate-spin text-4xl  " />
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => generateImage()}
          className="bg-[#146B35] font-semibold text-white w-fit px-5 py-2 rounded-md"
        >
          {generatingImage ? "Generating..." : "Generate"}
        </button>
      </div>
      <div className="text-[#858586]">
        Once you have created the iamge you want,you can share it with others in
        the community
      </div>
      <button
        className="bg-[#6968FF] font-semibold text-white w-fit  px-5 py-2 rounded-md"
        type="submit"
        disabled={submit}
      >
        {shareing ? "Being shared..." : "Share with the community"}
      </button>
    </form>
  );
};

export default Form;
