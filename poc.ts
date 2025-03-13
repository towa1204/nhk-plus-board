// const url =
//   "https://api-plus.nhk.jp/r5/pl2/search?keyword=ドキュメント７２&area=all&play_vod=true&sort_type=asc";
const url =
  "https://api-plus.nhk.jp/r5/pl2/search?keyword=えぇトコ&area=all&play_vod=true&sort_type=asc";
const response = await fetch(url);
const json = await response.json();
// console.log(json);

// サムネイル画像のURLを取得
const body = json.body;
const result = body.map((item) => {
  return {
    title: item.stream_type.program.title,
    subtitle: item.stream_type.program.subtitle,
    content: item.stream_type.program.content,
    stream_url: `https://plus.nhk.jp/watch/st/${item.stream_id}`,
    thumnail: item.stream_type.program.images.nol_image.url,
    published_period_from: item.published_period_from,
    published_period_to: item.published_period_to,
    series_url: item.stream_type.program.url.pc,
  };
});

console.log(result);
