import React, { useState } from "react";
import { dowloadImage } from "../../utils";

const Posts = ({ posts }) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      {posts?.length !== 0 ? (
        <div>
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className=" w-full h-[40px] border rounded-md outline-none my-5 p-2"
          />
        </div>
      ) : null}
      <div className="grid grid-cols1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {posts?.length !== 0 ? (
          posts
            ?.filter((i) =>
              i.prompt.toLowerCase().includes(search.toLowerCase())
            )
            ?.map((post, i) => (
              <div className="relative group " key={i}>
                <img className="w-full rounded-md" src={post.photo} alt="" />
                <div className="bg-black duration-500 hidden group-hover:bottom-2 group-hover:flex flex-col gap-2 w-11/12 text-white bottom-0 rounded-lg  absolute left-1/2 -translate-x-1/2 p-2">
                  <div>{post.prompt}</div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="h-[24px] rounded-md flex justify-center items-center w-[24px] bg-green-700 text-white">
                        {post.name[0]}
                      </div>{" "}
                      {post.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => dowloadImage(post._id, post.photo)}
                    >
                      <img
                        className="w-10 h-5 cursor-pointer object-contain invert text-white"
                        src="/assets/download.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-[#776dc2] font-semibold text-3xl">
            NO POSTS FOUND
          </div>
        )}
      </div>
      {posts?.filter((i) =>
        i.prompt.toLowerCase().includes(search.toLowerCase())
      ).length === 0
        ? "Unfortunately no results found"
        : null}
    </div>
  );
};

export default Posts;
