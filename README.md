# Asher's MCP Tools

A collection of Model Context Protocol (MCP) tools for repository management and analysis.

## Features

- **Directory Structure**: Get a detailed view of your repository's file structure
- **Repomix Generation**: Pack your repository into a single file for analysis

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```

## Usage

After building, run the tool using Node.js:

```bash
node ./build/index.js
```

## Available Commands

1. **Directory Structure**
   - Gets the directory structure of a repository
   - Usage: Use the workspace directory path, not '.'

2. **Repomix Generate**
   - Packs a repository using repomix
   - Generates a repomix.txt file in the target directory

## Requirements

- Node.js
- npm
- TypeScript (for development)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.