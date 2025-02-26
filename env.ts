export function env(key: string) {
  const value = Deno.env.get(key);
  if (value === undefined) {
    throw new Error(`env: ${key} is not found`);
  }
  return value;
}
