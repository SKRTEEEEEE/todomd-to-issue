import fs from "node:fs";
import path from "node:path";

import { context, getOctokit } from "@actions/github";
import yaml from "js-yaml";

export interface LabelDefinition {
  name: string;
  description?: string;
  color: string;
}

interface YamlLabel {
  name: string;
  description?: string;
  color: string;
}

export const LabelLoader = {
  loadLocalConfig(): Map<string, LabelDefinition> | undefined {
    const filePath = path.resolve(".github/labels.yml");
    if (!fs.existsSync(filePath)) return undefined;

    const raw = fs.readFileSync(filePath, "utf8");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const parsed: unknown = yaml.load(raw);

    if (!Array.isArray(parsed)) {
      return undefined;
    }

    const labels = parsed as YamlLabel[];

    const map = new Map<string, LabelDefinition>();

    for (const label of labels) {
      // normaliza sin emojis ni mayúsculas
      const normalized = label.name
        .replaceAll(/[^\w\s]/gi, "")
        .trim()
        .toLowerCase();

      map.set(normalized, {
        name: label.name,
        description: label.description ?? "",
        color: label.color || "cccccc",
      });
    }

    return map;
  },

  async resolveLabels(
    token: string,
    requestedLabels: string[],
  ): Promise<string[]> {
    const config = this.loadLocalConfig();

    if (!config) {
      // eslint-disable-next-line no-console
      console.log(
        "⚠️ No .github/labels.yml found — using provided labels directly",
      );
      return requestedLabels;
    }

    const resolvedLabels: string[] = [];
    const missingLabels: LabelDefinition[] = [];
    const octokit = getOctokit(token);
    const { owner, repo } = context.repo;

    for (const label of requestedLabels) {
      const normalized = label.toLowerCase().trim();
      const found = config.get(normalized);

      if (found) {
        resolvedLabels.push(found.name);
      } else {
        // eslint-disable-next-line no-console
        console.log(`⚠️ Label '${label}' not found in labels.yml`);
      }
    }

    // obtiene los labels ya existentes del repo
    const repoLabels = await octokit.paginate(
      octokit.rest.issues.listLabelsForRepo,
      {
        owner,
        repo,
        per_page: 100,
      },
    );

    const existingNames = new Set(
      repoLabels.map((label: { name: string; [key: string]: unknown }) =>
        label.name.toLowerCase(),
      ),
    );

    // crea los que falten del labels.yml
    for (const [, label] of config.entries()) {
      if (!existingNames.has(label.name.toLowerCase())) {
        missingLabels.push(label);
      }
    }

    for (const label of missingLabels) {
      try {
        await octokit.rest.issues.createLabel({
          owner,
          repo,
          name: label.name,
          description: label.description,
          color: label.color, // sin "#"
        });
        // eslint-disable-next-line no-console
        console.log(`🆕 Created missing label: ${label.name}`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `❌ Failed to create label '${label.name}': ${(error as Error).message}`,
        );
      }
    }

    return resolvedLabels.length > 0 ? resolvedLabels : requestedLabels;
  },
};
