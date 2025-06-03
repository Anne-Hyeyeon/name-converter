export function snakeToCamel(str: string): string {
  return str.replace(/([-_][a-z])/gi, (match) => {
    return match.toUpperCase().replace("-", "").replace("_", "");
  });
}
