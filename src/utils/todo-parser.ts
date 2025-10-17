import { TodoIssue } from "../types/todo-issue";

/**
 * Parses todo.md content and extracts issues
 *
 * Expected format:
 * # [version] Title of the issue
 * ## Objective
 * Explanation of the objective
 * ## Time
 * 4-8h
 * ## Section of the body
 * - Task of the issue
 *   - Information of the task
 *     - List element inside the task
 *     - Another list element inside the task
 *   - Continue information after the previous list
 *     - List element after task information
 * - Another task of the issue
 * ## Another section of the body
 *
 * Minimum format:
 * # Title of the issue
 * - Task of the issue
 */
export const TodoParser = {
  /**
   * Parse todo.md content into structured issues
   */
  parse(content: string): TodoIssue[] {
    const lines = content.split("\n");
    const issues: TodoIssue[] = [];
    let currentIssue: TodoIssue | undefined;
    let currentSection: string | undefined;
    let currentContent: string[] = [];

    for (const line of lines) {
      // Main title (# [version] Title)
      if (line.startsWith("# ")) {
        // Save previous issue before starting a new one
        if (currentIssue) {
          if (currentSection) {
            currentIssue.sections[currentSection] = currentContent
              .join("\n")
              .trim();
          }
          issues.push(currentIssue);
        }

        // Parse title with optional version
        const titleMatch = line.match(/^#\s*(?:\[([^\]]+)\])?\s*(.+)$/);
        if (titleMatch) {
          const version = titleMatch[1] ? titleMatch[1].trim() : "v0.0.0";
          currentIssue = {
            version,
            title: titleMatch[2].trim(),
            sections: {},
          };
          currentSection = undefined;
          currentContent = [];
        }
        continue;
      }

      // Section (## Section Name)
      if (line.startsWith("## ")) {
        if (currentIssue && currentSection) {
          // Save previous section content
          currentIssue.sections[currentSection] = currentContent
            .join("\n")
            .trim();
          currentContent = [];
        }
        currentSection = line.replace(/^##\s*/, "").trim();
        continue;
      }

      // Content lines - add to current section
      if (currentSection && currentIssue) {
        currentContent.push(line);
      }
    }

    // Save last issue
    if (currentIssue) {
      if (currentSection) {
        currentIssue.sections[currentSection] = currentContent
          .join("\n")
          .trim();
      }
      issues.push(currentIssue);
    }

    return issues;
  },
};
