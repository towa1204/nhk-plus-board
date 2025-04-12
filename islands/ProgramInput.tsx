import { useSignal } from "@preact/signals";

export default function ProgramInput({
  placeholder,
  initData,
  deletePrograms,
}: {
  placeholder: string | undefined;
  initData: { enabled: boolean; title: string };
  deletePrograms: () => void;
}) {
  const programEnabled = useSignal(initData.enabled);
  const programTitle = useSignal(initData.title);

  return (
    <div className="mt-3 flex flex-row">
      <label className="inline-flex items-center cursor-pointer">
        {
          /*
           * チェック入っているときは   value="on"  を送信
           * チェック入っていないときは value="off" を送信
           * ※checked が false のとき value の値は送信されないという仕様のため
           */
        }
        {!programEnabled.value &&
          <input type="hidden" name="programEnabled" value="off" />}
        <input
          type="checkbox"
          name="programEnabled"
          className="sr-only peer"
          checked={programEnabled.value}
          value="on"
          onChange={(e) => programEnabled.value = e.currentTarget.checked}
        />
        <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
      </label>
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          name="programTitle"
          value={programTitle}
          className="w-full rounded-lg border px-4 py-2 pr-10 shadow outline-none hover:border-gray-500"
          placeholder={placeholder}
          onChange={(e) => programTitle.value = e.currentTarget.value}
        />
        <button
          type="button"
          onClick={() => deletePrograms()}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
