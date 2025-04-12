import { Head } from "$fresh/runtime.ts";

export default function Error500() {
  return (
    <>
      <Head>
        <title>500 - Internal Server Error</title>
      </Head>
      <div className="px-4 py-8 mx-auto bg-[#86efac]">
        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            className="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 className="text-4xl font-bold">500 - Internal Server Error</h1>
          <p className="my-4">
            An error occurred during route handling or page rendering.
          </p>
          <a href="/" className="underline">Go back home</a>
        </div>
      </div>
    </>
  );
}
