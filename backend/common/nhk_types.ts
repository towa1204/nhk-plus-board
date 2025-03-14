type Image = {
  url: string;
  width?: string;
  height?: string;
};

type Service = {
  id: string;
  name: string;
  images: {
    logo_s?: Image;
    logo_m?: Image;
    logo_l?: Image;
    badgeSmall?: Image;
    badge?: Image;
    logoSmall?: Image;
    badge9x4?: Image;
  };
};

type Area = {
  id: string;
  name: string;
};

type Program = {
  id: string;
  area: Area;
  date: string;
  service: Service;
  event_id: string;
  start_time: string;
  end_time: string;
  genre: string[];
  title: string;
  subtitle: string;
  content: string;
  images: {
    logo_l?: Image;
    thumbnail_m?: Image;
    hsk_posterframe?: Image;
    nol_image?: Image;
  };
  info?: string;
  act?: string;
  music?: string;
  free?: string;
  rate?: string;
  flags: Record<string, string>;
  change: unknown[];
  icis: {
    series_id: string;
    contents_id: string;
  };
  lastupdate: string;
  site_id: string;
  url: {
    pc: string;
    short: string;
    nod?: string;
    nod_portal?: string;
  };
  keywords: string[];
  hashtags: string[];
  codes: {
    code: string;
    split1: string[];
  };
  ch: {
    id: string;
    name: string;
    station: string;
  };
  hsk: Record<string, string>;
  extra: {
    pr_movies: unknown[];
  };
};

type StreamType = {
  type: string;
  current_position: number;
  program_id: string;
  service_id: string;
  date: string;
  start_time: string;
  program: Program;
};

type Stream = {
  stream_id: string;
  stream_fmt: string;
  stream_name: string;
  stream_type: StreamType;
  play_control: {
    simul: boolean;
    dvr: boolean;
    vod: boolean;
    multi: boolean | null;
  };
  published_period_from: string;
  published_period_to: string;
  play_mode: {
    has_controls: boolean;
    is_mute: boolean;
    autoplay_delay: number;
  };
};

export type PlaylistResponse = {
  playlist_id: string;
  playlist_name: string;
  playlist_description: string;
  playlist_seeds: string;
  playlist_category: string;
  playlist_type: string;
  schema_version: number;
  styles: string;
  operations: unknown[];
  created_at: string;
  modified_at: string;
  expired_at: string;
  images: {
    logo_l?: Image;
    thumbnail_m?: Image;
  };
  behavior: {
    if_empty: string;
    if_expired: string;
    if_finished: string;
  };
  config_ext: string;
  hsk: {
    service_id: string;
    qf_mode: string;
  }[];
  total_hits: number;
  body: Stream[];
};
