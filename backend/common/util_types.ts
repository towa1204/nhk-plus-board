import { Config } from "../schema.ts";

export interface Repository<T> {
  get: () => Promise<T>;
  save: (value: T) => void;
}

export interface IConfigRepository {
  get: () => Promise<Config | null>;
}

export type ToUnknown<T> = {
  [K in keyof T]: unknown;
};
