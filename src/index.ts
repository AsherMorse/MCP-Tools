import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { directoryStructure } from "./tools/directory.js";
import { repomixGenerate } from "./tools/repomix.js"
import { z } from "zod";

// Server configuration
const SERVER_CONFIG = {
  name: "Asher's MCP Tools",
  version: "1.0.0"
} as const;

// Tool definitions
const TOOLS = {
  directory_structure: {
    name: "directory_structure",
    description: "Get the directory structure of a repository, use the workspace path, don't use '.'",
    parameters: {
      path: z.string().describe("Path to the repository to get the directory structure of")
    },
    handler: directoryStructure
  },
  repomix: {
    name: "repomix_generate",
    description: "Pack a repository using repomix",
    parameters: {
      path: z.string().describe("Path to the repository to pack")
    },
    handler: repomixGenerate
  }
} as const;

// Initialize server
const initServer = () => {
  const server = new McpServer(SERVER_CONFIG);

  // Register tools
  server.tool(
    TOOLS.directory_structure.name,
    TOOLS.directory_structure.description,
    TOOLS.directory_structure.parameters,
    TOOLS.directory_structure.handler
  );

  server.tool(
    TOOLS.repomix.name,
    TOOLS.repomix.description,
    TOOLS.repomix.parameters,
    TOOLS.repomix.handler
  );

  return server;
};

// Start server
async function main() {

  const server = initServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
}); 