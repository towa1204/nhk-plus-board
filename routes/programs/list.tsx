import { Handlers, PageProps } from "$fresh/server.ts";
import { nhkPlusProgramService } from "../../backend/init.ts";
import { WatchProgramResult } from "../../backend/model.ts";
import { HomeButton } from "../../components/HomeButton.tsx";
import ProgramCard from "../../components/ProgramCard.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const programs = await nhkPlusProgramService.fetchPrograms();
    // 非同期で取っておりプロパティの順番が保証されないためソートしておく
    programs.sort((a, b) => a.keyword.localeCompare(b.keyword));
    return ctx.render(programs);
  },
};

export default function ProgramListPage(
  { data: watchProgramResult }: PageProps<WatchProgramResult[]>,
) {
  const titles = watchProgramResult.map((program) => program.keyword);
  const hasData = titles.length > 0;

  return (
    <div className="bg-white py-8 px-4 max-w-4xl mx-auto">
      {/* 番組一覧 */}
      <h1 className="text-2xl font-bold text-center mb-4">番組一覧</h1>

      {/* --- 1. データが無い場合 --- */}
      {!hasData && (
        <div className="text-center text-gray-500 my-10">
          現在表示できる番組はありません。
        </div>
      )}

      {/* --- 2. データがある場合 --- */}
      {hasData && (
        <>
          <ul className="flex flex-row flex-wrap justify-center gap-4 mb-8">
            {titles.map((title) => (
              <li key={title}>
                <a
                  href={`#${title}`}
                  className="bg-sky-500 text-white text-center px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-200 w-full sm:w-auto max-w-xs"
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>

          {/* 番組セクション */}
          <div className="space-y-16">
            {watchProgramResult.map((program) => {
              return (
                <section id={program.keyword} key={program.keyword}>
                  <h2 className="text-2xl font-bold text-center">
                    {program.keyword}
                  </h2>
                  {program.streamablePrograms.map((streamableProgram) => (
                    <ProgramCard
                      {...streamableProgram}
                    />
                  ))}
                </section>
              );
            })}
          </div>
        </>
      )}
      <div class="mt-2">
        <HomeButton />
      </div>
    </div>
  );
}
