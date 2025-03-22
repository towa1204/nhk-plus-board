import { Handlers, PageProps } from "$fresh/server.ts";
import { watchProgramKeysService } from "../../backend/init.ts";
import {
  getErrorMessageOnCookie,
  setErrorMessageOnCookie,
} from "../../backend/cookie.ts";
import { WatchProgramKeys } from "../../backend/model.ts";
import { HomeButton } from "../../components/HomeButton.tsx";
import ProgramForm from "../../islands/ProgramForm.tsx";
import { WithErrorMessage } from "../types.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { message, resHeaders } = getErrorMessageOnCookie(req.headers);

    const programProps = await watchProgramKeysService.get();

    const initData: WithErrorMessage<WatchProgramKeys> = {
      ...programProps,
      errorMessage: message,
    };

    return ctx.render(initData, { headers: resHeaders });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const receivedPrograms = form.getAll("programEnabled").map((_, i) => {
      return {
        enabled: form.getAll("programEnabled")[i] === "on" ? true : false,
        title: form.getAll("programTitle")[i],
      };
    });

    const resHeaders = new Headers({
      "Location": ctx.url.pathname,
    });

    const result = await watchProgramKeysService.validateAndSave({
      programs: receivedPrograms,
    });
    if (!result.success) {
      setErrorMessageOnCookie(resHeaders, result.message.join("\n"));
    }

    return new Response(null, {
      status: 303,
      headers: resHeaders,
    });
  },
};

export default function ProgramPage(
  { data }: PageProps<WithErrorMessage<WatchProgramKeys>>,
) {
  const { errorMessage } = data;

  return (
    <>
      <div className="rounded-md border border-gray-200/60 bg-gray-100/30 p-6">
        <header className="mb-4 flex justify-between gap-3">
          <hgroup>
            <h2 className="text-lg font-medium !leading-none text-black">
              Program
            </h2>
            <h3 className="mt-1 !leading-tight text-gray-500">
              通知したい番組を設定
            </h3>
          </hgroup>
        </header>

        {errorMessage && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <ProgramForm initData={data} />
      </div>
      <div class="mt-2">
        <HomeButton />
      </div>
    </>
  );
}
