/**
 * エラーメッセージを表示するためのコンポーネント。
 *
 * @param message - 表示するエラーメッセージの文字列。
 * @returns エラーメッセージを含むスタイリングされたアラート要素。
 */
export function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      {message}
    </div>
  );
}
