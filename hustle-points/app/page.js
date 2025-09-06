import Image from "next/image";
import ResponsiveSearchBar from "./searchBar";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-start p-4 gap-y-4">
      <Image
        src="/logo.webp"
        alt="HustlePoints"
        width={400}
        height={400}
        quality={100}
      />
      <ResponsiveSearchBar />
      <h1 className="">HustlePoints</h1>
    </main>
  );
}
