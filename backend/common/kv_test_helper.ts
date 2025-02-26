/**
 * Deno.Kvにファイルから単一のデータをセットする関数
 * @param kv データベースインスタンス
 * @param key データのキー
 * @param fileName データを格納したJSONファイルのパス
 * @returns 正常にデータがセットされた場合、何も返さない
 * @throws {Error} データのセットに失敗した場合に例外をスローする
 */
export async function setTestDataFromFile(
  kv: Deno.Kv,
  key: Deno.KvKey,
  fileName: string,
) {
  const json = JSON.parse(await Deno.readTextFile(fileName));

  const result = await kv.set(key, json);
  if (!result.ok) throw new Error("Failed to set data: commit error");
}

/**
 * Deno.Kvに単一のデータをセットする関数
 * @param kv データベースインスタンス
 * @param key データのキー
 * @param object セットするデータオブジェクト
 * @returns 正常にデータがセットされた場合、何も返さない
 * @throws {Error} データのセットに失敗した場合に例外をスローする
 */
export async function setTestDataFromObject(
  kv: Deno.Kv,
  key: Deno.KvKey,
  object: unknown,
) {
  const result = await kv.set(key, object);
  if (!result.ok) throw new Error("Failed to set data: commit error");
}

/**
 * Deno.Kvにファイルから複数のデータをセットする関数
 * @param kv データベースインスタンス
 * @param key データのキー
 * @param dataPairs セットするキーとJSONファイルパスのペア
 * @returns 正常にデータがセットされた場合、何も返さない
 * @throws {Error} トランザクションのコミットに失敗した場合に例外をスローする
 */
export async function setTestDataMultipleFromFile(
  kv: Deno.Kv,
  dataPair: { key: Deno.KvKey; fileName: string }[],
) {
  if (dataPair.length === 0) return;

  const atomic = kv.atomic();

  for (const { key, fileName } of dataPair) {
    const json = JSON.parse(await Deno.readTextFile(fileName));
    atomic.set(key, json);
  }

  const result = await atomic.commit();
  if (!result.ok) throw new Error("Failed to set data: commit error");
}

/**
 * Deno.Kvに複数のデータをセットする関数
 * @param kv データベースインスタンス
 * @param key データのキー
 * @param dataPairs セットするキーとオブジェクトのペア
 * @returns 正常にデータがセットされた場合、何も返さない
 * @throws {Error} トランザクションのコミットに失敗した場合に例外をスローする
 */
export async function setTestDataMultipleFromObject(
  kv: Deno.Kv,
  dataPair: { key: Deno.KvKey; object: unknown }[],
) {
  if (dataPair.length === 0) return;

  const atomic = kv.atomic();

  for (const { key, object } of dataPair) {
    atomic.set(key, object);
  }

  const result = await atomic.commit();
  if (!result.ok) throw new Error("Failed to set data: commit error");
}
