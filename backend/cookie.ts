import { deleteCookie, getCookies, setCookie } from "$std/http/cookie.ts";

const ERROR_MESSAGE_NAME = "formError";

/**
 * Cookieからエラーメッセージを取得し、削除する
 *
 * エラーメッセージがない場合はundefinedを返す\
 * Cookieからの削除を反映するにはreturnしたヘッダをHTTPレスポンスにセットする
 *
 * @param reqHeaders リクエストヘッダ
 * @returns エラーメッセージと削除後のヘッダ
 */
export function getErrorMessageOnCookie(
  reqHeaders: Headers,
): { message: string | undefined; resHeaders: Headers } {
  const cookies = getCookies(reqHeaders);

  const errorMessage = cookies[ERROR_MESSAGE_NAME] != undefined
    ? decodeURIComponent(cookies[ERROR_MESSAGE_NAME])
    : undefined;

  const resHeaders = new Headers();
  deleteCookie(resHeaders, ERROR_MESSAGE_NAME, { path: "/" });

  return { message: errorMessage, resHeaders: resHeaders };
}

/**
 * Cookieにエラーメッセージをセットする
 *
 * returnしたヘッダをHTTPレスポンスにセットすること
 *
 * @param headers セットするヘッダ
 * @param message エラーメッセージ
 * @returns セット後のヘッダ
 */
export function setErrorMessageOnCookie(
  headers: Headers,
  message: string,
): Headers {
  setCookie(headers, {
    name: ERROR_MESSAGE_NAME,
    value: encodeURIComponent(message),
    path: "/",
  });
  return headers;
}
