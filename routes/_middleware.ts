import { FreshContext } from "$fresh/server.ts";
import { basicAuth } from "https://deno.land/x/basic_auth@v1.1.1/mod.ts";
import { env } from "../env.ts";

const BASIC_AUTH_USER = env("BASIC_AUTH_USER");
const BASIC_AUTH_PASSWORD = env("BASIC_AUTH_PASSWORD");

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  const unauthorized = basicAuth(req, "nhk-program-notify", {
    [BASIC_AUTH_USER]: BASIC_AUTH_PASSWORD,
  });
  // TODO: エラーページへ遷移する
  if (unauthorized) return unauthorized;

  return await ctx.next();
}
