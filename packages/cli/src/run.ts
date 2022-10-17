import * as path from "path";
import { Strategy, UvuStrategy } from "@ts-junit/core";
import { debug } from "@ts-junit/utils";
import { CliContext } from "./context";

export * from "./run";
export * from "./watch";
export * from "./context";

/**
 * for cli invoke (need compile ts to js)
 *
 * run([path.resolve(process.cwd(), "./tests/")])
 * run([path.resolve(process.cwd(), "./tests/"),path.resolve(process.cwd(), "./tests/test.ts")])
 *
 * @public
 */
export function runCli(rest: any, strategy: Strategy = new UvuStrategy()) {
  debug("runCli With UvuStrategy");
  console.time("build ts");

  // get file base
  const buildRoot = path.resolve(__dirname, "..");
  const buildBase = path.resolve(__dirname, "../output");

  const base = process.cwd();

  // set context use default strategy
  const context = new CliContext(strategy, {
    rest: rest,
    base: base,
    buildRoot: buildRoot,
    buildBase: buildBase,
  });

  // compile and watch, then run test
  context.watch();

  // time statistics
  console.timeEnd("build ts");
}
