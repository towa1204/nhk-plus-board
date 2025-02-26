import { assertEquals } from "$std/assert/assert_equals.ts";
import { today, toJSTMMDDhhmmFormat, week } from "./date.ts";

Deno.test("today", () => {
  assertEquals(today(new Date(2025, 0, 26)), "2025-01-26");
});

Deno.test("week", () => {
  assertEquals(week(new Date(2025, 0, 26)), [
    "2025-01-26",
    "2025-01-27",
    "2025-01-28",
    "2025-01-29",
    "2025-01-30",
    "2025-01-31",
    "2025-02-01",
  ]);
});

Deno.test("toJSTMMDDhhmmFormat", () => {
  assertEquals(toJSTMMDDhhmmFormat("2025-01-19T05:00:00+09:00"), "01/19 05:00");
  // 05:00+08:00 -> 06:00+09:00(JSTは1時間進んでいるので1時間加算する)
  assertEquals(toJSTMMDDhhmmFormat("2025-01-19T05:00:00+08:00"), "01/19 06:00");
});
