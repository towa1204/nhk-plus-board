import { formatPeriod } from "../backend/common/date.ts";
import { WatchProgram } from "../backend/model.ts";

export default function ProgramCard({
  title,
  published_period_from,
  published_period_to,
  subtitle,
  content,
  series_url,
  stream_url,
  thumbnail,
}: WatchProgram) {
  function generateCosenseLink() {
    const project = "lsadsfj-private"; // TODO: DBからプロジェクト名を取得
    const body = `> ${encodeURIComponent(content)}`;
    return `https://scrapbox.io/${project}/${
      encodeURIComponent(title)
    }?body=${body}`;
  }

  return (
    <div className="flex justify-center items-center bg-white py-8">
      <div className="max-w-2xl w-full bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden">
        {/* 番組のサムネイル画像 */}
        <a
          href={stream_url}
          className="block"
        >
          <img
            src={thumbnail}
            alt="番組のアイキャッチ"
            className="w-full h-auto rounded-t-lg"
          />
        </a>

        {/* 番組情報 */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 mt-2">
            📅 {formatPeriod(published_period_from, published_period_to)}
          </p>

          {/* 番組の説明 */}
          <p className="text-gray-700 mt-4">
            {subtitle}
          </p>

          {/* ボタン一覧 */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a
              href={stream_url}
              target="_blank"
              className="bg-gray-500 text-white text-center px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200 w-full sm:w-auto max-w-xs"
            >
              NHKプラスで見る
            </a>
            <a
              href={series_url}
              target="_blank"
              className="bg-blue-500 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full sm:w-auto max-w-xs"
            >
              公式番組ページ
            </a>
            <a
              href={generateCosenseLink()}
              target="_blank"
              className="bg-green-500 text-white text-center px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-auto max-w-xs"
            >
              Cosenseページ
            </a>
          </div>

          {/* 詳細説明 */}
          <p className="text-gray-700 mt-6 text-sm">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
