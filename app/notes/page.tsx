//retieve paginated data
//chaching the cahing behaviour

import Link from "next/link";
import CreateNotes from "./ CreateNotes";
// export const dynamic = 'auto',
// dynamicParams = true,
// revalidate = 0,
// fetchCache = 'auto',
// runtime = 'nodejs',
// preferredRegion = 'auto'

export async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090//api/collections/notes/records?page=1&perPage=10",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="flex flex-col  gap-10">
      <div>
        <h1>Notes</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {notes.map((noteEl, key) => (
            <NotesWrapper noteEl={noteEl} key={noteEl.id} />
          ))}
        </div>
      </div>
      <CreateNotes />
    </div>
  );
}

function NotesWrapper({ noteEl, key }: { noteEl: any; key: string }) {
  //each el is object(json - js object)
  const { id, title, content, created } = noteEl || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className=" border bg-red-300 w-[200px] p-4  h-[200px]">
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <p className="text-xs">{created}</p>
      </div>
    </Link>
  );
}

//cache no store - for not caching
//using the pocket
//changing the caching behaviour
