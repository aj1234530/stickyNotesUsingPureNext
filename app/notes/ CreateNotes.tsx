// "use client";

import { revalidatePath } from "next/cache";
// import { useRouter } from "next/navigation";
// import { title } from "process";
// import { useState } from "react";

export default function CreateNote() {
  const createNotes = async (formData: FormData) => {
    "use server";
    //we need formdata here,next auto convert into a sever side ep and we can access the data here
    await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: formData.get("title"),
        content: formData.get("content"),
      }),
    });
    revalidatePath(`/notes`);//revalidating cached
  };
  //   const router = useRouter();
  //   const [title, setTitle] = useState("");
  //   const [content, setContent] = useState("");
  //   const handleSubmit = async (e: any) => {
  //     e.preventDefault();
  //     const response = await fetch(
  //       "http://127.0.0.1:8090/api/collections/notes/records",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title,
  //           content,
  //         }),
  //       }
  //     );
  //     router.refresh(); //using to reload the data as we are using ssr for data fetching

  return (
    <div>
      <form action={createNotes}>
        <div className="flex flex-col  max-w-[300px]">
          <input
            name="title"
            // onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          ></input>
          <input
            name="content"
            // onChange={(e) => setContent(e.target.value)}
            placeholder="content"
          ></input>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
