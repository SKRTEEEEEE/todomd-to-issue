import * as fs from "node:fs";
import path from "node:path";

import { context, getOctokit } from "@actions/github";

import { Inputs } from "./inputs/inputs";
import { Logger } from "./logger/logger";
import { Outputs } from "./outputs/outputs";
import { CreatedIssue } from "./types/todo-issue";
import { formatBody, formatTitle } from "./utils/issue-formatter";
import { LabelLoader } from "./utils/label-loader";
import { TodoParser } from "./utils/todo-parser";

export class Action {
  private readonly logger;
  private readonly outputs;

  constructor(dependencies: { logger: Logger; outputs: Outputs }) {
    this.logger = dependencies.logger;
    this.outputs = dependencies.outputs;
  }

  async run(inputs: Inputs) {
    this.logger.info("Starting TODO.md to GitHub Issue converter");

    try {
      // Check if todo.md exists
      const todoPath = path.resolve(inputs.todoFilePath);

      if (!fs.existsSync(todoPath)) {
        this.logger.info(`File not found: ${todoPath}`);
        this.outputs.save("issues-created", 0);
        this.outputs.save("issue-urls", JSON.stringify([]));
        return;
      }

      this.logger.info(`Reading file: ${todoPath}`);
      const todoContent = fs.readFileSync(todoPath, "utf8");

      // Parse todo.md
      this.logger.info("Parsing todo.md content");
      const issues = TodoParser.parse(todoContent);

      if (issues.length === 0) {
        this.logger.info("No issues found in todo.md");
        this.outputs.save("issues-created", 0);
        this.outputs.save("issue-urls", JSON.stringify([]));
        return;
      }

      this.logger.info(`Found ${issues.length} issue(s) to create`);

      // Initialize GitHub client
      const octokit = getOctokit(inputs.githubToken);
      const createdIssues: CreatedIssue[] = [];

      this.logger.info("Resolving labels...");

      // Parse labels
      const requestedLabels = inputs.labels
        .split(",")
        .map(label => label.trim())
        .filter(label => label.length > 0);

      const resolvedLabels = await LabelLoader.resolveLabels(
        inputs.githubToken,
        requestedLabels,
      );

      this.logger.info(`Resolved labels: ${resolvedLabels.join(", ")}`);

      // Create issues
      for (const issue of issues) {
        try {
          const title = formatTitle(issue);
          const body = formatBody(issue);

          this.logger.info(`Creating issue: ${title}`);

          const response = await octokit.rest.issues.create({
            owner: context.repo.owner,
            repo: context.repo.repo,
            title: title,
            body: body,
            labels: resolvedLabels,
          });

          createdIssues.push({
            number: response.data.number,
            url: response.data.html_url,
            title: title,
          });

          this.logger.info(`✅ Issue created: ${response.data.html_url}`);
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          this.logger.error(
            `❌ Error creating issue "${issue.title}": ${errorMessage}`,
          );
        }
      }

      // Save outputs
      this.outputs.save("issues-created", createdIssues.length);
      this.outputs.save(
        "issue-urls",
        JSON.stringify(createdIssues.map(i => i.url)),
      );

      this.logger.info(`Successfully created ${createdIssues.length} issue(s)`);

      // Delete todo.md if configured
      if (inputs.deleteTodoAfter && createdIssues.length > 0) {
        this.logger.info(`Deleting ${todoPath}`);
        fs.unlinkSync(todoPath);
        this.logger.info("todo.md deleted");
      }

      this.logger.info("Finished TODO.md to GitHub Issue converter");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`Fatal error: ${errorMessage}`);
      throw error;
    }
  }
}
