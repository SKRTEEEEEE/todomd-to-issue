# TODO.md to GitHub Issue - Usage Guide

## Overview

This GitHub Action automatically converts `todo.md` files into properly formatted GitHub Issues following the agente666 workflow specifications.

## Input Format

### Complete Format

```markdown
# [v1.0.0] Add authentication feature

## Objective

Implement user authentication with JWT tokens

## Time

4-8h

## Backend Implementation

- Create auth middleware
  - Validate JWT tokens
  - Handle token expiration
  - Add refresh token logic
- Create login endpoint

## Frontend Implementation

- Add login form
- Handle authentication state

## Another Section

More details here
```

### Minimum Format

```markdown
# Add feature

- Implement the feature
```

## Output Format

The action creates GitHub Issues with the following structure:

```markdown
# [<version>] <Title> #<issue-number>

## 🎯 Objective

<!-- Brief description of what needs to be accomplished -->

<Explanation from todo.md or default text>

## 🔑 Key Points

### 🖲️/💻/⛓️ <Section Name>

<!-- Key point what needs to be accomplished, representing the idea of this Task -->

- [ ] <Task from todo.md>
          <Task information>
          - <Nested list items>
          - <More nested items>
          <Continued information>
          - <More list items>
- [ ] <Another task>

## ⏱️ Time

### 🤔 Estimated

<Time from todo.md or default "4-8h">

### 😎 Real

🧠 _Tick this part just before you're going to close this issue - RECHECK_

## ✅ Definition of Done

🧠 _Tick this part just before you're going to close this issue - RECHECK_

<!-- Key point what needs to be accomplished, representing the must of this Task based on the Key Points -->

- [ ] <!-- Criterion 1 -->
- [ ] <!-- Criterion 2 -->
- [ ] Code tested and validated
- [ ] Documentation updated (if needed)
```

## Features

- **Version Support**: Extracts version from title `[v1.0.0]` or defaults to `v0.0.0`
- **Automatic Checkboxes**: Converts tasks (lines starting with `-`) to checkboxes `- [ ]`
- **Section Mapping**: Maps todo.md sections to issue sections with proper formatting
- **Dynamic Content**: All `<>` placeholders are filled with actual content from todo.md
- **Comments Preserved**: Maintains all HTML comments for guidance
- **Default Values**: Uses sensible defaults when information is missing

## Usage Examples

### Example 1: Basic Workflow

**.github/workflows/todo-to-issue.yml**

```yaml
name: Convert TODO to Issues

on:
  push:
    branches:
      - main
    paths:
      - "todo.md"

permissions:
  contents: write
  issues: write

jobs:
  convert:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Convert TODO to Issues
        uses: yourusername/todomd-to-issue@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          todo-file-path: "todo.md"
          labels: "automated,agente666"
          delete-todo-after: "true"
```

### Example 2: Custom Configuration

```yaml
- name: Convert TODO to Issues
  uses: yourusername/todomd-to-issue@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    todo-file-path: "docs/tasks.md"
    labels: "feature,automated,high-priority"
    delete-todo-after: "false"
```

### Example 3: With Outputs

```yaml
- name: Convert TODO to Issues
  id: convert
  uses: yourusername/todomd-to-issue@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}

- name: Show Results
  run: |
    echo "Issues created: ${{ steps.convert.outputs.issues-created }}"
    echo "URLs: ${{ steps.convert.outputs.issue-urls }}"
```

## Inputs

| Input               | Description                     | Required | Default               |
| ------------------- | ------------------------------- | -------- | --------------------- |
| `github-token`      | GitHub token for API access     | Yes      | N/A                   |
| `todo-file-path`    | Path to todo.md file            | No       | `todo.md`             |
| `labels`            | Comma-separated labels          | No       | `automated,agente666` |
| `delete-todo-after` | Delete todo.md after processing | No       | `true`                |

## Outputs

| Output           | Description              |
| ---------------- | ------------------------ |
| `issues-created` | Number of issues created |
| `issue-urls`     | JSON array of issue URLs |

## Error Handling

- If `todo.md` doesn't exist, the action completes successfully with 0 issues created
- If parsing fails for an issue, it's skipped and logged
- If GitHub API fails, the error is logged but other issues continue processing

## Integration with agente666

This action is designed to work seamlessly with the agente666 workflow:

1. Developer creates `todo.md` with tasks
2. This action converts it to GitHub Issues
3. `issue-to-task.yml` action converts issues to `task/<issue>.md`
4. agente666 CLI processes tasks automatically

## Best Practices

1. **Version Control**: Always include version tags in titles for tracking
2. **Clear Objectives**: Write clear objectives for better issue understanding
3. **Time Estimates**: Provide realistic time estimates
4. **Structured Sections**: Use meaningful section names for better organization
5. **Multiple Issues**: You can define multiple issues in a single todo.md (each starting with `#`)

## Troubleshooting

**Issue: Action doesn't create issues**

- Check that `todo.md` exists in the repository
- Verify the file path is correct
- Ensure GitHub token has `issues: write` permission

**Issue: Formatting is incorrect**

- Verify your todo.md follows the expected format
- Check that sections start with `##`
- Ensure tasks start with `-`

**Issue: File not deleted after processing**

- Check `delete-todo-after` is set to `'true'` (string, not boolean)
- Verify workflow has `contents: write` permission
