import Link from "next/link";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default async function CategoryPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/categories`, {
    cache: "no-store",
  });

  const data = await res.json();

  const categories = data.data as Category[];

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Categories</h1>

      {categories.map((c) => (
        <div key={c.id}>
          <Link href={`/category/${c.slug}`}>{c.name}</Link>
        </div>
      ))}
    </div>
  );
}
