#!/usr/bin/env sh
set -eu

node -r dotenv/config <<'NODE'
const { Client } = require('pg');

const required = ['DATABASE_HOST', 'DATABASE_PORT', 'DATABASE_USERNAME', 'DATABASE_PASSWORD', 'DATABASE_NAME'];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error(`Missing database environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

async function createDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    const existing = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [process.env.DATABASE_NAME]);
    if (existing.rowCount) {
      console.log(`Database "${process.env.DATABASE_NAME}" already exists.`);
      return;
    }

    const quotedName = `"${process.env.DATABASE_NAME.replace(/"/g, '""')}"`;
    await client.query(`CREATE DATABASE ${quotedName}`);
    console.log(`Created database "${process.env.DATABASE_NAME}".`);
  } finally {
    await client.end();
  }
}

createDatabase().catch((error) => {
  console.error('Unable to create the configured database:', error.message);
  process.exitCode = 1;
});
NODE
