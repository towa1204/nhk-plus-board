import { assertEquals } from "$std/assert/assert_equals.ts";
import { formatPeriod } from "./date.ts";

Deno.test("formatPeriodTest", () => {
  const start = "2025-03-13T20:41:00+09:00";
  const end = "2025-03-27T20:41:00+09:00";
  assertEquals(formatPeriod(start, end), "03/13(木) 20:41 ~ 03/27(木) 20:41");
});
