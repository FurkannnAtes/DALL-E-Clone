import React from "react";
import Form from "../components/createPost/Form";

const CreatePost = () => {
  return (
    <div className="flex flex-col gap-5 p-5 px-10 bg-[#F9FAFF] min-h-[90vh]">
      <div className="text-4xl font-semibold">Create</div>
      <div className="text-[#858586]">
        Create imaginative and bisually stunning images through DALL-E AI and
        share them with the community.
      </div>
      <Form />
    </div>
  );
};

export default CreatePost;
