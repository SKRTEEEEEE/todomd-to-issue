// Represents a parsed issue from todo.md
export interface TodoIssue {
  // Version from title (e.g., "v1.0.0" or "v0.0.0" if not specified)
  version: string;
  // Issue title
  title: string;
  // Sections from the todo.md (## Sections)
  sections: Record<string, string>;
}

// Represents a created GitHub issue
export interface CreatedIssue {
  number: number;
  url: string;
  title: string;
}
