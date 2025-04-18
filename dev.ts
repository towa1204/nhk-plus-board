#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import "$std/dotenv/load.ts";
import { env } from "./env.ts";
import { cron } from "./backend/cron.ts";

if (env("CRON_ENABLED") === "true") cron();
await dev(import.meta.url, "./main.ts", config);
