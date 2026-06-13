import Header from "./_components/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="max-w-[80%] mx-auto">{children}</div>
    </>
  );
}