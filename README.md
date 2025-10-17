# TODO.md to GitHub Issue Action

[![GitHub](https://img.shields.io/badge/GitHub-Action-blue)](https://github.com/features/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/node-20.x-green)](https://nodejs.org)

A GitHub Action that automatically converts `todo.md` files into properly formatted GitHub Issues, following the **agente666** workflow specifications.

## 🚀 Quick Start

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
```

## 📝 Input Format

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
- Create login endpoint

## Frontend Implementation

- Add login form
- Handle authentication state
```

### Minimum Format

```markdown
# Add feature

- Implement the feature
```

## ⚙️ Inputs

| Input               | Description                     | Required | Default               |
| ------------------- | ------------------------------- | -------- | --------------------- |
| `github-token`      | GitHub token for API access     | ✅ Yes   | N/A                   |
| `todo-file-path`    | Path to todo.md file            | No       | `todo.md`             |
| `labels`            | Comma-separated labels          | No       | `automated,agente666` |
| `delete-todo-after` | Delete todo.md after processing | No       | `true`                |

## 📤 Outputs

| Output           | Description              |
| ---------------- | ------------------------ |
| `issues-created` | Number of issues created |
| `issue-urls`     | JSON array of issue URLs |

## 📋 Example Output

The action creates issues with this structure:

```markdown
# [v1.0.0] Add authentication feature #42

## 🎯 Objective

Implement user authentication with JWT tokens

## 🔑 Key Points

### 🖲️/💻/⛓️ Backend Implementation

- [ ] Create auth middleware
  - Validate JWT tokens
  - Handle token expiration
- [ ] Create login endpoint

### 🖲️/💻/⛓️ Frontend Implementation

- [ ] Add login form
- [ ] Handle authentication state

## ⏱️ Time

### 🤔 Estimated

4-8h

### 😎 Real

🧠 _Tick this part just before you're going to close this issue - RECHECK_

## ✅ Definition of Done

🧠 _Tick this part just before you're going to close this issue - RECHECK_

- [ ] Code tested and validated
- [ ] Documentation updated (if needed)
```

## 🔧 Advanced Usage

### Custom Configuration

```yaml
- name: Convert TODO to Issues
  uses: yourusername/todomd-to-issue@v1
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
    todo-file-path: "docs/tasks.md"
    labels: "feature,automated,high-priority"
    delete-todo-after: "false"
```

### Using Outputs

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

## 🎯 Features

- ✅ **Version Support**: Extracts version from `[v1.0.0]` or defaults to `v0.0.0`
- ✅ **Automatic Checkboxes**: Converts tasks to `- [ ]` format
- ✅ **Section Mapping**: Intelligent section organization
- ✅ **Dynamic Content**: All placeholders filled with actual content
- ✅ **Multiple Issues**: Define multiple issues in one todo.md
- ✅ **Error Handling**: Graceful handling of missing files or invalid formats

## 🔗 Integration with agente666

This action is part of the **agente666** workflow automation:

1. 📝 Developer creates `todo.md` with tasks
2. 🔄 This action converts it to GitHub Issues
3. 🎯 `issue-to-task.yml` converts issues to `task/<issue>.md`
4. 🤖 agente666 CLI processes tasks automatically

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 9+

### Setup

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build
pnpm build

# Lint
pnpm lint
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📚 Documentation

For detailed documentation, see [USAGE.md](docs/USAGE.md)

## 💡 Based On

This action is built using the excellent [github-action-nodejs-template](https://github.com/AlbertHernandez/github-action-nodejs-template) by Albert Hernandez.
