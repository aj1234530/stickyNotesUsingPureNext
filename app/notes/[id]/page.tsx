async function getNote(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    //this is isr - revalidating cache after 10 sec
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note = await getNote(id);
  const { title, content, created } = note;
  return (
    <div>
      <h1>Notes/{note.id}</h1>
      <div className=" border bg-red-300 w-[200px] p-4  h-[200px]">
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <p className="text-xs">{created}</p>
      </div>
    </div>
  );
}

//as this is dynamic route the next won't cache this page
///isr imple by next:{revalitdate:10} , telling generateing the page if this is older than 10 sec
//equava

//loading.tsx
//error.tsx
//mutate - create notes in the notes directory -
