import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <header className="flex w-full items-center justify-start space-x-4 px-4 py-4">
        <div className="text-2xl font-bold">
          <a href="/">NHK Plus Board</a>
        </div>
      </header>
      <div className="mx-auto w-full px-4 md:max-w-7xl">
        <Component />
      </div>
    </>
  );
}
