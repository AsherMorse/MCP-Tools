import { exec } from "child_process";
import { promisify } from "util";

// Types
type DirectoryParams = {
  path: string;
};

type DirectoryResult = {
  content: Array<{
    type: "text";
    text: string;
  }>;
};

const execAsync = promisify(exec);

async function isGitRepo(path: string): Promise<boolean> {
  try {
    await execAsync(`cd "${path}" && git rev-parse --is-inside-work-tree`);
    return true;
  } catch {
    return false;
  }
}

export async function directoryStructure(params: DirectoryParams, _extra: any): Promise<DirectoryResult> {
  try {
    const isGit = await isGitRepo(params.path);
    const command = isGit
      ? `cd "${params.path}" && git ls-files && git ls-files --others --exclude-standard`
      : `cd "${params.path}" && find . -type f -not -path "*/\\.*"`;

    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      throw new Error(stderr);
    }
    return {
      content: [{
        type: "text" as const,
        text: stdout
      }]
    };
  } catch (error: any) {
    return {
      content: [{
        type: "text" as const,
        text: `Failed to get directory structure: ${error.message}`
      }]
    };
  }
} 