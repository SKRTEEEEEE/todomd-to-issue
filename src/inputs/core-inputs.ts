import { getBooleanInput, getInput } from "@actions/core";

import { Inputs } from "./inputs";

export class CoreInputs implements Inputs {
  get githubToken(): string {
    return getInput("github-token", { required: true });
  }

  get todoFilePath(): string {
    return getInput("todo-file-path") || "todo.md";
  }

  get labels(): string {
    return getInput("labels") || "automated,agente666";
  }

  get deleteTodoAfter(): boolean {
    return getBooleanInput("delete-todo-after");
  }
}
