// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_500 from "./routes/_500.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $index from "./routes/index.tsx";
import * as $nhkapi from "./routes/nhkapi.tsx";
import * as $notification from "./routes/notification.tsx";
import * as $programs_list from "./routes/programs/list.tsx";
import * as $programs_setting from "./routes/programs/setting.tsx";
import * as $types from "./routes/types.ts";
import * as $Input from "./islands/Input.tsx";
import * as $ProgramForm from "./islands/ProgramForm.tsx";
import * as $ProgramInput from "./islands/ProgramInput.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_500.tsx": $_500,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.ts": $_middleware,
    "./routes/index.tsx": $index,
    "./routes/nhkapi.tsx": $nhkapi,
    "./routes/notification.tsx": $notification,
    "./routes/programs/list.tsx": $programs_list,
    "./routes/programs/setting.tsx": $programs_setting,
    "./routes/types.ts": $types,
  },
  islands: {
    "./islands/Input.tsx": $Input,
    "./islands/ProgramForm.tsx": $ProgramForm,
    "./islands/ProgramInput.tsx": $ProgramInput,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
