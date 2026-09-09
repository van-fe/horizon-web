#!/usr/bin/env node

import { serveStdio } from '@modelcontextprotocol/server/stdio';

import { createAuroraMcpServer } from './server.js';

const handle = serveStdio(() => createAuroraMcpServer());

async function shutdown(): Promise<void> {
  await handle.close();
}

process.once('SIGINT', () => void shutdown());
process.once('SIGTERM', () => void shutdown());
