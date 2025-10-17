import { TodoIssue } from "../types/todo-issue";

/**
 * Formats a parsed TodoIssue into GitHub issue body format
 *
 * Expected GitHub issue format:
 *
 * ## 🎯 Objective
 * <Explanation of the objective>
 *
 * ## 🔑 Key Points
 *
 * ### 🖲️/💻/⛓️ <Section Name>
 * - [ ] <Task of the issue>
 *   <Information of the task>
 *   - <List element inside the task>
 *   - <Another list element inside the task>
 *   <Continue information after the previous list>
 *   - <List element after task information>
 * - [ ] <Another task of the issue>
 *
 * ## ⏱️ Time
 *
 * ### 🤔 Estimated
 * <Time>
 *
 * ### 😎 Real
 * 🧠 _Tick this part just before you're going to close this issue - RECHECK_
 *
 * ## ✅ Definition of Done
 * 🧠 _Tick this part just before you're going to close this issue - RECHECK_
 * - [ ] <!-- Criterion 1 -->
 * - [ ] <!-- Criterion 2 -->
 * - [ ] Code tested and validated
 * - [ ] Documentation updated (if needed)
 */
/**
 * Format issue title with version
 */
export function formatTitle(issue: TodoIssue, issueNumber?: number): string {
  const title = `[${issue.version}] ${issue.title}`;
  return issueNumber ? `${title} #${issueNumber}` : title;
}

/**
 * Format issue body according to agente666 specifications
 */
export function formatBody(issue: TodoIssue): string {
  let body = "";

  // ## 🎯 Objective
  body += "## 🎯 Objective\n\n";
  body += "<!-- Brief description of what needs to be accomplished -->\n\n";
  const objective = issue.sections.Objective || issue.sections.objective;
  body += objective || "Implement according to specification";
  body += "\n\n";

  // ## 🔑 Key Points
  body += "## 🔑 Key Points\n\n";

  // Add all sections except 'Objective' and 'Time'
  const excludedSections = new Set(["Objective", "objective", "Time", "time"]);
  const otherSections = Object.entries(issue.sections).filter(
    ([key]) => !excludedSections.has(key),
  );

  if (otherSections.length > 0) {
    for (const [sectionName, sectionContent] of otherSections) {
      // If no sections or only basic content, use default section name
      body += `### 🖲️/💻/⛓️ ${sectionName}\n\n`;
      body +=
        "<!-- Key point what needs to be accomplished, representing the idea of this Task -->\n\n";

      // Convert tasks to checkboxes if they start with -
      const formattedContent = formatTaskContent(sectionContent);
      body += formattedContent;
      body += "\n\n";
    }
  } else {
    // Default section if no sections provided
    body += "### 🖲️/💻/⛓️ Implementation\n\n";
    body +=
      "<!-- Key point what needs to be accomplished, representing the idea of this Task -->\n\n";
    body += "- [ ] Complete implementation\n\n";
  }

  // ## ⏱️ Time
  body += "## ⏱️ Time\n\n";
  body += "### 🤔 Estimated\n\n";
  const timeEstimate = issue.sections.Time || issue.sections.time || "4-8h";
  body += timeEstimate;
  body += "\n\n";
  body += "### 😎 Real\n\n";
  body +=
    "🧠 _Tick this part just before you're going to close this issue - RECHECK_\n\n";

  // ## ✅ Definition of Done
  body += "## ✅ Definition of Done\n\n";
  body +=
    "🧠 _Tick this part just before you're going to close this issue - RECHECK_\n\n";
  body +=
    "<!-- Key point what needs to be accomplished, representing the must of this Task based on the Key Points -->\n\n";
  body += "- [ ] <!-- Criterion 1 -->\n";
  body += "- [ ] <!-- Criterion 2 -->\n";
  body += "- [ ] Code tested and validated\n";
  body += "- [ ] Documentation updated (if needed)\n";

  return body;
}

/**
 * Format task content to ensure tasks start with checkboxes
 */
function formatTaskContent(content: string): string {
  const lines = content.split("\n");
  const formattedLines: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Convert top-level tasks (starting with -) to checkboxes if not already
    if (trimmedLine.startsWith("- ") && !trimmedLine.startsWith("- [ ]")) {
      // Replace the first - with - [ ]
      const indentation = line.match(/^(\s*)/)?.[1] ?? "";
      const taskContent = trimmedLine.slice(2); // Remove "- "
      formattedLines.push(`${indentation}- [ ] ${taskContent}`);
    } else {
      formattedLines.push(line);
    }
  }

  return formattedLines.join("\n");
}
