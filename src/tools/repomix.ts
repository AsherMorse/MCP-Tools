import { execSync } from "child_process";

// Types
type RepomixParams = {
  path: string;
};

type RepomixResult = {
  content: Array<{
    type: "text";
    text: string;
  }>;
};

// Main handler for full repomix output
export const repomixGenerate = async (params: RepomixParams, _extra: any): Promise<RepomixResult> => {
  try {
    const result = execSync(`cd "${params.path}" && npx repomix --style plain --no-file-summary --remove-comments --remove-empty-lines -o project.txt`).toString().trim();

    return {
      content: [
        {
          type: "text" as const,
          text: result,
        },
      ],
    };
  } catch (error: any) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Error packing repository: ${error}`,
        },
      ],
    };
  }
};
