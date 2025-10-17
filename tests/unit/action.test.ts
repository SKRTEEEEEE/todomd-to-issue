import { vi } from "vitest";

import { Action } from "@/src/action";
import { Inputs } from "@/src/inputs/inputs";

import { LoggerMock } from "./logger/logger-mock";
import { OutputsMock } from "./outputs/outputs-mock";

vi.mock("fs");
vi.mock("@actions/github");

describe("Action", () => {
  let logger: LoggerMock;
  let outputs: OutputsMock;
  let action: Action;

  beforeEach(() => {
    logger = new LoggerMock();
    outputs = new OutputsMock();
    action = new Action({
      logger,
      outputs,
    });
  });

  describe("When todo.md file does not exist", () => {
    it("should log that file was not found and set outputs to 0", async () => {
      const inputs: Inputs = {
        githubToken: "test-token",
        todoFilePath: "todo.md",
        labels: "automated,agente666",
        deleteTodoAfter: false,
      };

      // Mock fs.existsSync to return false
      // eslint-disable-next-line unicorn/prefer-module, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment
      const fs = require("node:fs");
      vi.spyOn(fs, "existsSync").mockReturnValue(false);

      await action.run(inputs);

      outputs.assertSaveToHaveBeenCalledWith("issues-created", 0);
      outputs.assertSaveToHaveBeenCalledWith("issue-urls", JSON.stringify([]));
    });
  });
});
