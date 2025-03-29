import { Handlers, PageProps } from "$fresh/server.ts";
import Select from "../components/Select.tsx";
import SaveButton from "../components/SaveButton.tsx";
import Input from "../islands/Input.tsx";
import {
  getErrorMessageOnCookie,
  setErrorMessageOnCookie,
} from "../backend/cookie.ts";
import { AppSetting } from "../backend/model.ts";
import { appSettingService } from "../backend/init.ts";
import { WithErrorMessage } from "./types.ts";
import { HomeButton } from "../components/HomeButton.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { message, resHeaders } = getErrorMessageOnCookie(req.headers);

    const appSettingProps = await appSettingService.get();

    const initData: WithErrorMessage<AppSetting> = {
      ...appSettingProps,
      errorMessage: message,
    };

    return ctx.render(initData, { headers: resHeaders });
  },
  async POST(req, ctx) {
    const form = await req.formData();

    const resHeaders = new Headers({
      "Location": ctx.url.pathname,
    });

    const result = await appSettingService.validateAndSave({
      notificationApp: form.get("target"),
      cosenseProject: form.get("project"),
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

export default function NotificationPage(
  { data }: PageProps<WithErrorMessage<AppSetting>>,
) {
  const { notificationApp: notificationTarget, cosenseProject, errorMessage } =
    data;
  return (
    <>
      <div className="rounded-md border border-gray-200/60 bg-gray-100/30 p-6">
        {errorMessage && (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <form method="post">
          <header className="mb-4 flex justify-between gap-3">
            <hgroup>
              <h2 className="text-lg font-medium !leading-none text-black">
                Notification Target
              </h2>
              <p className="mt-1 !leading-tight text-gray-500">
                通知先の情報を設定
              </p>
            </hgroup>
          </header>

          <Select
            name="target"
            selected={notificationTarget ?? ""}
            options={[
              {
                value: "LINE",
                label: "LINE",
              },
              {
                value: "Discord",
                label: "Discord",
              },
              { value: "", label: "未設定" },
            ]}
          />

          <div className="mt-5">
            <header className="mb-4 flex justify-between gap-3">
              <hgroup>
                <h2 className="mt-1 font-medium !leading-tight text-black">
                  Cosense Project
                </h2>
                <p className="mt-1 !leading-tight text-gray-500">
                  番組メモ用のプロジェクト名を設定
                </p>
              </hgroup>
            </header>

            <Input
              name="project"
              placeholder="project name"
              isSecret={false}
              value={cosenseProject ?? ""}
            />
          </div>

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
