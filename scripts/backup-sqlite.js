#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function readPackageJson(rootDir) {
  const packageJsonPath = path.join(rootDir, "package.json");
  const content = fs.readFileSync(packageJsonPath, "utf8");
  return JSON.parse(content);
}

function formatTimestamp(date) {
  const y = String(date.getFullYear());
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${y}${m}${d}-${hh}${mm}${ss}`;
}

function resolveDbPath(rootDir, packageJson) {
  const fromEnv = process.env.CDS_DB_FILE;
  const fromCds =
    packageJson &&
    packageJson.cds &&
    packageJson.cds.requires &&
    packageJson.cds.requires.db &&
    packageJson.cds.requires.db.credentials &&
    packageJson.cds.requires.db.credentials.url;

  const dbFile = fromEnv || fromCds || "db.sqlite";
  return path.isAbsolute(dbFile) ? dbFile : path.join(rootDir, dbFile);
}

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyIfExists(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) return false;
  fs.copyFileSync(sourcePath, targetPath);
  return true;
}

function run() {
  const rootDir = process.cwd();
  const packageJson = readPackageJson(rootDir);
  const dbPath = resolveDbPath(rootDir, packageJson);

  if (!fs.existsSync(dbPath)) {
    console.error(`SQLite database file was not found: ${dbPath}`);
    return;
  }

  const backupDir = process.env.BACKUP_DIR
    ? path.isAbsolute(process.env.BACKUP_DIR)
      ? process.env.BACKUP_DIR
      : path.join(rootDir, process.env.BACKUP_DIR)
    : path.join(rootDir, "backups");

  ensureDirectory(backupDir);

  const parsed = path.parse(dbPath);
  const timestamp = formatTimestamp(new Date());
  const backupMain = path.join(backupDir, `${parsed.name}-${timestamp}${parsed.ext}`);

  fs.copyFileSync(dbPath, backupMain);

  const copiedSidecars = [];
  const walCopied = copyIfExists(`${dbPath}-wal`, `${backupMain}-wal`);
  const shmCopied = copyIfExists(`${dbPath}-shm`, `${backupMain}-shm`);

  if (walCopied) copiedSidecars.push(`${backupMain}-wal`);
  if (shmCopied) copiedSidecars.push(`${backupMain}-shm`);

  console.log(`Backup created: ${backupMain}`);
  if (copiedSidecars.length > 0) {
    console.log(`Also copied: ${copiedSidecars.join(", ")}`);
  }
}

run();
