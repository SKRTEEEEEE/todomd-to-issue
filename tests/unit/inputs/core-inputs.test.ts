import * as core from "@actions/core";
import { Mock, vi } from "vitest";

import { CoreInputs } from "@/src/inputs/core-inputs";

vi.mock("@actions/core", () => ({
  getInput: vi.fn(),
  getBooleanInput: vi.fn(),
}));

describe("CoreInputs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("githubToken", () => {
    it('should return the value of "github-token" input', () => {
      const expectedToken = "test-token";
      (core.getInput as Mock).mockReturnValueOnce(expectedToken);

      const inputs = new CoreInputs();
      const token = inputs.githubToken;

      expect(token).toBe(expectedToken);
      expect(core.getInput).toHaveBeenCalledWith("github-token", {
        required: true,
      });
    });
  });

  describe("todoFilePath", () => {
    it('should return the value of "todo-file-path" input', () => {
      const expectedPath = "custom-todo.md";
      (core.getInput as Mock).mockReturnValueOnce(expectedPath);

      const inputs = new CoreInputs();
      const path = inputs.todoFilePath;

      expect(path).toBe(expectedPath);
      expect(core.getInput).toHaveBeenCalledWith("todo-file-path");
    });

    it('should return default value if "todo-file-path" is not set', () => {
      (core.getInput as Mock).mockReturnValueOnce("");

      const inputs = new CoreInputs();
      const path = inputs.todoFilePath;

      expect(path).toBe("todo.md");
    });
  });

  describe("labels", () => {
    it('should return the value of "labels" input', () => {
      const expectedLabels = "bug,feature";
      (core.getInput as Mock).mockReturnValueOnce(expectedLabels);

      const inputs = new CoreInputs();
      const labels = inputs.labels;

      expect(labels).toBe(expectedLabels);
      expect(core.getInput).toHaveBeenCalledWith("labels");
    });
  });

  describe("deleteTodoAfter", () => {
    it('should return the value of "delete-todo-after" input', () => {
      (core.getBooleanInput as Mock).mockReturnValueOnce(true);

      const inputs = new CoreInputs();
      const deleteAfter = inputs.deleteTodoAfter;

      expect(deleteAfter).toBe(true);
      expect(core.getBooleanInput).toHaveBeenCalledWith("delete-todo-after");
    });
  });
});
