import { Handlers, PageProps } from "$fresh/server.ts";
import { nhkPlusProgramService } from "../../backend/init.ts";
import { WatchProgram } from "../../backend/model.ts";
import { HomeButton } from "../../components/HomeButton.tsx";
import ProgramCard from "../../components/ProgramCard.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const programs = await nhkPlusProgramService.fetchPrograms();
    return ctx.render(programs);
  },
};

export default function ProgramListPage(
  { data }: PageProps<Record<string, WatchProgram[]>>,
) {
  // 非同期で取ってくるためプロパティの順番が保証されないのでソート
  const titles = Object.keys(data).toSorted();

  return (
    <div className="bg-white py-8 px-4 max-w-4xl mx-auto">
      {/* 番組一覧 */}
      <h1 className="text-2xl font-bold text-center mb-4">番組一覧</h1>
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
        {titles.map((title) => {
          const programs = data[title];
          return (
            <section id={title}>
              <h2 className="text-2xl font-bold text-center">{title}</h2>
              {programs.map((program) => (
                <ProgramCard
                  {...program}
                />
              ))}
            </section>
          );
        })}
      </div>
      <div class="mt-2">
        <HomeButton />
      </div>
    </div>
  );
}
