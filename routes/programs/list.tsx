import { Handlers, PageProps } from "$fresh/server.ts";
import { nhkPlusProgramService } from "../../backend/init.ts";
import { WatchProgram } from "../../backend/model.ts";
import { HomeButton } from "../../components/HomeButton.tsx";
import ProgramCard from "../../components/ProgramCard.tsx";

const title =
  "えぇトコ　ダイアン津田＆堀田真由　びわ湖満喫２人旅！～滋賀　大津市～";
const period = "03/06(木) 20:41 ~ 03/20(木) 20:41";
const subtitle =
  "滋賀出身・ダイアン津田と堀田真由が大津市をめぐる！うなぎ、近江牛、ふなずし…絶品グルメ／芭蕉も感動！絶景スポット／歴史ある酒蔵／びわ湖の恵みを味わいつくす旅！";
const content =
  "津市はびわ湖の恵みが集まる街！滋賀出身・びわ湖を愛する２人、ダイアン津田篤宏と堀田真由がめぐる！▼松尾芭蕉も感動した絶景スポット▼びわ湖グルメふなずし＆ホンモロコ▼春のびわ湖開きに向けた巨大観光船メンテ現場を特別見学！▼かつて宿場町だったエリアに唯一残る酒蔵で日本酒を作る夫婦▼うなぎ×近江牛！最高コラボ料理▼滋賀トークに花が咲く！笑いありほっこりありの２５分";
const series_url = "https://www.nhk.jp/p/osaka-eetoko/ts/8X53QX9XM5/";
const stream_url = "https://plus.nhk.jp/watch/st/270_g1_2025030649665";
const thumbnail =
  "https://www.nhk.jp/static/assets/images/tvepisode/te/Q6R7X3MGPJ/Q6R7X3MGPJ-eyecatch_a7163dc2ec41c4ca72e204efc9a18a15.jpg";

// const programTitles = [
//   "ブラタモリ",
//   "えぇトコ",
//   "バックヤード",
// ];

export const handler: Handlers = {
  async GET(_, ctx) {
    const programs = await nhkPlusProgramService.fetchPrograms();
    return ctx.render(programs);
  },
};

export default function ProgramListPage(
  { data }: PageProps<Record<string, WatchProgram[]>[]>,
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
        {/* えぇトコ */}
        <section id="eetoko">
          <h2 className="text-2xl font-bold text-center">えぇトコ</h2>
          <ProgramCard
            title={title}
            period={period}
            subtitle={subtitle}
            content={content}
            series_url={series_url}
            stream_url={stream_url}
            thumbnail={thumbnail}
          />
        </section>
      </div>
      <div class="mt-2">
        <HomeButton />
      </div>
    </div>
  );
}
