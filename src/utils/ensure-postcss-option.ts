import importCwd from "import-cwd";
import { Parser, Syntax, Stringifier } from "postcss";

export default <T extends Parser | Syntax | Stringifier>(
  option: string | T | undefined,
): T | undefined => (typeof option === "string" ? (importCwd(option) as T) : option);
