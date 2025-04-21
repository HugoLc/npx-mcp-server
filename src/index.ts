#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

const server = new McpServer({
  name: "NpxMcpSercer",
  version: "0.0.1",
});

server.tool(
  "add", 
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
)

const transport = new StdioServerTransport();
await server.connect(transport);