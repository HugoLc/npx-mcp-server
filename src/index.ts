#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from 'zod';

// Definindo variáveis de ambiente padrão
const DEFAULT_PREFIX = "Resultado: ";

const server = new McpServer({
  name: "NpxMcpServer",
  version: "0.0.1",
});

// Ferramenta existente para adição
server.tool(
  "add",
  "Tool to add two numbers",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => {
    // Usando variável de ambiente PREFIX, com valor padrão se não existir
    const prefix = process.env.PREFIX || DEFAULT_PREFIX;
    return {
      content: [{ type: "text", text: `${prefix}${a + b}` }],
    };
  }
);

// Nova ferramenta para gerenciar variáveis de ambiente
server.tool(
  "getenv",
  "Tool to get an environment variable value",
  { name: z.string() },
  async ({ name }) => {
    const value = process.env[name] || "Não definido";
    return {
      content: [{ type: "text", text: `${name}: ${value}` }],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);