//retieve paginated data
//changing the cahing behaviour

// export const dynamic = 'auto',
// dynamicParams = true,
// revalidate = 0,
// fetchCache = 'auto',
// runtime = 'nodejs',
// preferredRegion = 'auto'

import Link from "next/link";
import CreateNotes from "./ CreateNotes";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=10"
    // { cache: "no-store" } //telling next not to cache
  );
  const data = await res.json();
  return data?.items as {
    id: string;
    content: string;
    created: string;
    title: string;
  }[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div className="flex flex-col  gap-10">
      <div>
        <h1>Notes</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {notes.map((noteEl) => (
            <NotesWrapper noteEl={noteEl} key={noteEl.id} />
          ))}
        </div>
      </div>
      <CreateNotes />
    </div>
  );
}

function NotesWrapper({
  noteEl,
}: {
  noteEl: { id: string; title: string; content: string; created: string };
}) {
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
