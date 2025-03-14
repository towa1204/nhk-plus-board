import { z } from "zod";

export const ConfigProgramSchema = z.object({
  programs: z.array(
    z.object({
      enabled: z.boolean(),
      title: z.string().nonempty(),
    }),
  ),
});
export type ConfigProgram = z.infer<typeof ConfigProgramSchema>;

export const NhkApiSchema = z.object({
  area: z.string(),
  services: z.array(z.string()),
  nhkApiKey: z.string().nonempty(),
});
export type NhkApi = z.infer<typeof NhkApiSchema>;

export const AppSettingSchema = z.object({
  selectNow: z.literal("LINE"),
  LineApi: z.object({
    userid: z.string().nonempty(),
    accessToken: z.string().nonempty(),
  }),
});
export type AppSetting = z.infer<typeof AppSettingSchema>;

export const ConfigSchema = ConfigProgramSchema
  .merge(NhkApiSchema)
  .merge(AppSettingSchema);

export type Config = z.infer<typeof ConfigSchema>;
