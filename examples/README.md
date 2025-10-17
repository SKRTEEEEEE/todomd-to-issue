# Examples

This directory contains example `todo.md` files demonstrating different formats supported by the action.

## Files

### `todo-complete.md`

Demonstrates the complete format with all possible sections:

- Multiple issues in one file
- Version tags
- Objective section
- Time estimates
- Multiple content sections with nested lists
- Rich task information

### `todo-minimum.md`

Demonstrates the minimum viable format:

- Just a title and tasks
- No version (will default to v0.0.0)
- No objective (will use default text)
- No time estimate (will default to 4-8h)

## Testing

You can test the action with these examples by:

1. Copy one of these files to the root of your repository as `todo.md`
2. Push to trigger the workflow
3. Check the created issues

## Expected Outputs

### From `todo-complete.md`

- Will create 2 issues
- First issue: `[v1.2.0] Add user authentication system #X`
- Second issue: `[v1.2.1] Fix login form validation #Y`
- Both with proper formatting, checkboxes, and all sections

### From `todo-minimum.md`

- Will create 1 issue
- Title: `[v0.0.0] Add dark mode toggle #X`
- Will use default objective text
- Will use default time estimate (4-8h)
- Tasks converted to checkboxes
