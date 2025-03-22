import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-start space-x-4 px-4 py-2 bg-white shadow z-50">
        <div className="text-2xl font-bold">
          <a href="/">NHK Plus Board</a>
        </div>
      </header>

      {/* paddingを入れて、ヘッダー分スペース確保 */}
      <div className="pt-20 mx-auto w-full px-4 md:max-w-7xl">
        <Component />
      </div>
    </>
  );
}
