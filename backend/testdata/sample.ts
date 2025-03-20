import { Program, WatchProgram } from "../client/nhk_api_types.ts";
import { WatchProgramKeys } from "../model.ts";

export const configProgram: WatchProgramKeys = {
  "programs": [
    {
      "enabled": true,
      "title": "こころの時代選",
    },
    {
      "enabled": false,
      "title": "ＮＨＫ短歌",
    },
    {
      "enabled": true,
      "title": "大相撲",
    },
  ],
};

const e1Programs: Program[] = [
  {
    "id": "2025011928422",
    "event_id": "28422",
    "start_time": "2025-01-19T05:00:00+09:00",
    "end_time": "2025-01-19T06:00:00+09:00",
    "area": {
      "id": "140",
      "name": "横浜",
    },
    "service": {
      "id": "e1",
      "name": "ＮＨＫＥテレ１",
      "logo_s": {
        "url": "//www.nhk.or.jp/common/img/media/etv-100x50.png",
        "width": "100",
        "height": "50",
      },
      "logo_m": {
        "url": "//www.nhk.or.jp/common/img/media/etv-200x100.png",
        "width": "200",
        "height": "100",
      },
      "logo_l": {
        "url": "//www.nhk.or.jp/common/img/media/etv-200x200.png",
        "width": "200",
        "height": "200",
      },
    },
    "title":
      "こころの時代選　宮沢賢治　久遠の宇宙に生きる（４）あまねく「いのち」を見つめて",
    "subtitle":
      "今年没後９０年を迎える宮沢賢治。名作を生む原動力となった知られざる宗教観に迫るシリーズ。第４回は最愛の妹トシとの死別がもたらした賢治の死生観を連作詩から探る。",
    "content":
      "２４歳で逝去した妹トシは賢治にとって「信仰をともにする唯一の道連れ」と呼ぶほどの存在だった。その死の日に作った詩「永訣の朝」「松の針」からうかがえる賢治の慟哭。そして、８か月後に書かれた「青森挽歌」「オホーツク挽歌」の詩から読み取れる賢治の「死」のとらえ方。そこに見える「法華経」「歎異抄」などの影響をあげながら、仏教の視点から読み解く賢治の晩年の死生観とトシの生き方に見られる菩薩道について考える。",
    "act":
      "【出演】東京立正短期大学名誉教授…北川前肇，【朗読】加瀬亮，井上二郎，【語り】守本奈実",
    "genres": [
      "0804",
      "1011",
      "1102",
    ],
  },
  {
    "id": "2025011928423",
    "event_id": "28423",
    "start_time": "2025-01-19T06:00:00+09:00",
    "end_time": "2025-01-19T06:25:00+09:00",
    "area": {
      "id": "140",
      "name": "横浜",
    },
    "service": {
      "id": "e1",
      "name": "ＮＨＫＥテレ１",
      "logo_s": {
        "url": "//www.nhk.or.jp/common/img/media/etv-100x50.png",
        "width": "100",
        "height": "50",
      },
      "logo_m": {
        "url": "//www.nhk.or.jp/common/img/media/etv-200x100.png",
        "width": "200",
        "height": "100",
      },
      "logo_l": {
        "url": "//www.nhk.or.jp/common/img/media/etv-200x200.png",
        "width": "200",
        "height": "200",
      },
    },
    "title": "ＮＨＫ短歌“ものがたり”の深みへ　テーマ「踊る」",
    "subtitle":
      "大森静佳さんが選者の「“ものがたり”の深みへ」。今回のテーマは「踊る」。ゲストは作家で、歌集も出版している町田康さん。司会はミュージシャンの尾崎世界観さん。",
    "content":
      "大森静佳さんが選者の「“ものがたり”の深みへ」。今回のテーマは「踊る」。ゲストは作家で、歌集も出版している町田康さん。今回は、おなじみの日本の昔話の一編を取り上げて、その深みへ。町田さん自身の現代語訳も紹介、本人による朗読も見どころ。大森さんは、独特の言葉のリズムを生かした短歌を詠むことに挑戦。「踊る」をテーマにした投稿歌から、入選作品９首も紹介。司会はミュージシャンの尾崎世界観さん。",
    "act": "【司会】尾崎世界観，【出演】大森静佳，【ゲスト】町田康，宮田愛萌",
    "genres": [
      "1011",
    ],
  },
];

const g1Programs: Program[] = [
  {
    "id": "2025011928288",
    "event_id": "28288",
    "start_time": "2025-01-19T03:55:00+09:00",
    "end_time": "2025-01-19T04:20:00+09:00",
    "area": {
      "id": "140",
      "name": "横浜",
    },
    "service": {
      "id": "g1",
      "name": "ＮＨＫ総合１",
      "logo_s": {
        "url": "//www.nhk.or.jp/common/img/media/gtv-100x50.png",
        "width": "100",
        "height": "50",
      },
      "logo_m": {
        "url": "//www.nhk.or.jp/common/img/media/gtv-200x100.png",
        "width": "200",
        "height": "100",
      },
      "logo_l": {
        "url": "//www.nhk.or.jp/common/img/media/gtv-200x200.png",
        "width": "200",
        "height": "200",
      },
    },
    "title": "大相撲（２０２５年）　幕内の全取組　初場所　七日目",
    "subtitle": "",
    "content": "",
    "act": "",
    "genres": [
      "0105",
      "0100",
      "0804",
    ],
  },
];

export const allPrograms: Program[] = [...e1Programs, ...g1Programs];

const e1WatchPrograms: WatchProgram[] = [
  {
    "title":
      "こころの時代選　宮沢賢治　久遠の宇宙に生きる（４）あまねく「いのち」を見つめて",
    "subtitle":
      "今年没後９０年を迎える宮沢賢治。名作を生む原動力となった知られざる宗教観に迫るシリーズ。第４回は最愛の妹トシとの死別がもたらした賢治の死生観を連作詩から探る。",
    "content":
      "２４歳で逝去した妹トシは賢治にとって「信仰をともにする唯一の道連れ」と呼ぶほどの存在だった。その死の日に作った詩「永訣の朝」「松の針」からうかがえる賢治の慟哭。そして、８か月後に書かれた「青森挽歌」「オホーツク挽歌」の詩から読み取れる賢治の「死」のとらえ方。そこに見える「法華経」「歎異抄」などの影響をあげながら、仏教の視点から読み解く賢治の晩年の死生観とトシの生き方に見られる菩薩道について考える。",
    "act":
      "【出演】東京立正短期大学名誉教授…北川前肇，【朗読】加瀬亮，井上二郎，【語り】守本奈実",
    "genres": [
      "0804",
      "1011",
      "1102",
    ],
    "start_time": "2025-01-19T05:00:00+09:00",
    "end_time": "2025-01-19T06:00:00+09:00",
  },
];

const g1WatchPrograms: WatchProgram[] = [
  {
    "title": "大相撲（２０２５年）　幕内の全取組　初場所　七日目",
    "subtitle": "",
    "content": "",
    "act": "",
    "genres": [
      "0105",
      "0100",
      "0804",
    ],
    "start_time": "2025-01-19T03:55:00+09:00",
    "end_time": "2025-01-19T04:20:00+09:00",
  },
];

export const allWatchPrograms: WatchProgram[] = [
  ...e1WatchPrograms,
  ...g1WatchPrograms,
];
