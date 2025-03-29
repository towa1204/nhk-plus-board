import { Config, WatchProgramResult } from "../model.ts";

export interface Repository<T> {
  get: () => Promise<T>;
  save: (value: T) => void;
}

export interface NotificationClient {
  send: (watchProgramResult: WatchProgramResult[]) => Promise<void>;
}

export interface IConfigRepository {
  get: () => Promise<Config | null>;
}

export type ToUnknown<T> = {
  [K in keyof T]: unknown;
};
