import { Handlers, PageProps } from "$fresh/server.ts";
import Select from "../components/Select.tsx";
import SaveButton from "../components/SaveButton.tsx";
import Input from "../islands/Input.tsx";
import {
  getErrorMessageOnCookie,
  setErrorMessageOnCookie,
} from "../backend/cookie.ts";
import { configNhkApiService } from "../backend/bean.ts";
import { NhkApi } from "../backend/schema.ts";
import { WithErrorMessage } from "./types.ts";
import { HomeButton } from "../components/HomeButton.tsx";
import { NhkClient } from "../backend/client/NhkClient.ts";

const AREA_MASTER = Array.from(
  NhkClient.AREA_MASTER_MAP,
  ([label, _]) => ({ label, value: label }),
);

export const handler: Handlers = {
  async GET(req, ctx) {
    const { message, resHeaders } = getErrorMessageOnCookie(req.headers);

    const nhkapiProps = await configNhkApiService.get();

    const initData: WithErrorMessage<NhkApi> = {
      ...nhkapiProps,
      errorMessage: message,
    };

    return ctx.render(initData, { headers: resHeaders });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const resHeaders = new Headers({
      "Location": ctx.url.pathname,
    });

    const result = await configNhkApiService.validateAndSave({
      area: form.get("area"),
      services: ["g1", "e1"],
      nhkApiKey: form.get("apiKey"),
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

export default function NhkApiPage(
  { data }: PageProps<WithErrorMessage<NhkApi>>,
) {
  const { area, nhkApiKey, errorMessage } = data;

  return (
    <>
      <div className="rounded-md border border-gray-200/60 bg-gray-100/30 p-6">
        <header className="mb-4 flex justify-between gap-3">
          <hgroup>
            <h2 className="text-lg font-medium !leading-none text-black">
              NHK API
            </h2>
            <h3 className="mt-1 !leading-tight text-gray-500">
              放送エリアとAPIキーを設定
            </h3>
          </hgroup>
        </header>

        {errorMessage && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 whitespace-pre-wrap"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <form method="post">
          <Select
            name="area"
            selected={area}
            options={AREA_MASTER}
          />
          <Input
            name="apiKey"
            placeholder="NHK APIキー"
            isSecret
            value={nhkApiKey}
          />
          <div className="mt-3">
            <SaveButton isDisabled={false} />
          </div>
        </form>
      </div>
      <div class="mt-2">
        <HomeButton />
      </div>
    </>
  );
}
