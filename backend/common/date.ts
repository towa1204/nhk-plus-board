/**
 * 日本時間ISO8601拡張形式の日付をJSTの MM/DD(曜日) hh:mm 形式に変換する
 * @param from 開始日時 例: 2025-03-13T20:41:00+09:00
 * @param to 終了日時 例: 2025-03-27T20:41:00+09:00
 * @returns 例: 03/13(木) 20:41 ~ 03/27(木) 20:41
 */
export function formatPeriod(from: string, to: string): string {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  const format = (dateStr: string) => {
    const date = new Date(dateStr);
    const jstDate = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
    );
    const month = String(jstDate.getMonth() + 1).padStart(2, "0");
    const day = String(jstDate.getDate()).padStart(2, "0");
    const weekday = weekdays[jstDate.getDay()];
    const hours = String(jstDate.getHours()).padStart(2, "0");
    const minutes = String(jstDate.getMinutes()).padStart(2, "0");

    return `${month}/${day}(${weekday}) ${hours}:${minutes}`;
  };

  return `${format(from)} ~ ${format(to)}`;
}
