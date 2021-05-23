import { readFile, readFileSync } from "fs";
import { join } from "path";
import { rest } from "msw";

const PROJECT_ROOT_DIRECTORY = process.cwd();

export const handlers = [
  rest.get("/tipitaka/**/*.xml", ({ url }, res, ctx) => {
    return new Promise((resolve, reject) => {
      const xmlFilepath = join(PROJECT_ROOT_DIRECTORY, url.pathname);
      readFile(xmlFilepath, (error, buffer) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(res(ctx.xml(buffer.toString())));
      });
    });
  }),
];
