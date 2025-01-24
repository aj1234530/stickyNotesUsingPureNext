"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNote() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "http://127.0.0.1:8090/api/collections/notes/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      }
    );
    router.refresh(); //using to reload the data as we are using ssr for data fetching
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col  max-w-[300px]">
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          ></input>
          <input
            onChange={(e) => setContent(e.target.value)}
            placeholder="content"
          ></input>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
