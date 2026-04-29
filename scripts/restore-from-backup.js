#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

function readPackageJson(rootDir) {
  const packageJsonPath = path.join(rootDir, "package.json");
  return JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
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

function parseFromArgument(argv) {
  const arg = argv.find((item) => item.startsWith("--from="));
  if (!arg) return null;
  return arg.slice("--from=".length).trim();
}

function findLatestBackup(backupDir) {
  if (!fs.existsSync(backupDir)) return null;

  const candidates = fs
    .readdirSync(backupDir)
    .filter((name) => name.endsWith(".sqlite"))
    .map((name) => {
      const fullPath = path.join(backupDir, name);
      const stat = fs.statSync(fullPath);
      return { fullPath, mtimeMs: stat.mtimeMs };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  return candidates.length > 0 ? candidates[0].fullPath : null;
}

function quoteIdentifier(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

function quoteSqlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function getTables(db, schemaName) {
  const prefix = schemaName ? `${schemaName}.` : "";
  return db
    .prepare(
      `SELECT name FROM ${prefix}sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
    )
    .all()
    .map((row) => row.name);
}

function getColumns(db, tableName, schemaName) {
  const tableLiteral = `'${String(tableName).replace(/'/g, "''")}'`;
  const pragma = schemaName
    ? `PRAGMA ${schemaName}.table_info(${tableLiteral})`
    : `PRAGMA table_info(${tableLiteral})`;

  return db
    .prepare(pragma)
    .all()
    .map((row) => row.name);
}

function resolveBackupPath(rootDir, argv) {
  const fromArg = parseFromArgument(argv);
  const fromEnv = process.env.RESTORE_FROM;
  const provided = fromArg || fromEnv;

  if (provided) {
    return path.isAbsolute(provided) ? provided : path.join(rootDir, provided);
  }

  const backupDir = process.env.BACKUP_DIR
    ? path.isAbsolute(process.env.BACKUP_DIR)
      ? process.env.BACKUP_DIR
      : path.join(rootDir, process.env.BACKUP_DIR)
    : path.join(rootDir, "backups");

  return findLatestBackup(backupDir);
}

function run() {
  const rootDir = process.cwd();
  const packageJson = readPackageJson(rootDir);
  const currentDbPath = resolveDbPath(rootDir, packageJson);
  const oldDbPath = resolveBackupPath(rootDir, process.argv.slice(2));

  if (!oldDbPath) {
    console.error("Backup source was not found. Pass --from=<path> or set RESTORE_FROM.");
    return;
  }

  if (!fs.existsSync(currentDbPath)) {
    console.error(`Current database file was not found: ${currentDbPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(oldDbPath)) {
    console.error(`Backup database file was not found: ${oldDbPath}`);
    process.exit(1);
  }

  const db = new Database(currentDbPath);

  try {
    db.exec(`ATTACH DATABASE ${quoteSqlString(oldDbPath)} AS old`);

    const currentTables = getTables(db, "");
    const oldTableSet = new Set(getTables(db, "old"));

    db.exec("PRAGMA foreign_keys = OFF");
    db.exec("BEGIN");

    const report = [];

    for (const table of currentTables) {
      if (!oldTableSet.has(table)) {
        report.push({ table, action: "skip", reason: "table not found in backup" });
        continue;
      }

      const currentColumns = getColumns(db, table, "");
      const oldColumns = new Set(getColumns(db, table, "old"));
      const sharedColumns = currentColumns.filter((column) => oldColumns.has(column));

      if (sharedColumns.length === 0) {
        report.push({ table, action: "skip", reason: "no shared columns" });
        continue;
      }

      const qTable = quoteIdentifier(table);
      const qColumns = sharedColumns.map(quoteIdentifier).join(", ");

      const oldCount = db.prepare(`SELECT COUNT(1) AS c FROM old.${qTable}`).get().c;

      db.prepare(`DELETE FROM ${qTable}`).run();

      if (oldCount > 0) {
        db.prepare(
          `INSERT INTO ${qTable} (${qColumns}) SELECT ${qColumns} FROM old.${qTable}`
        ).run();
      }

      const newCount = db.prepare(`SELECT COUNT(1) AS c FROM ${qTable}`).get().c;

      report.push({
        table,
        action: "copied",
        rows: oldCount,
        sharedColumns: sharedColumns.length,
        finalRows: newCount,
      });
    }

    db.exec("COMMIT");

    console.log(`Restore source: ${oldDbPath}`);
    for (const item of report) {
      if (item.action === "skip") {
        console.log(`- ${item.table}: skipped (${item.reason})`);
      } else {
        console.log(
          `- ${item.table}: copied ${item.rows} rows using ${item.sharedColumns} shared columns (now ${item.finalRows} rows)`
        );
      }
    }

    console.log("Restore completed successfully.");
  } catch (error) {
    try {
      db.exec("ROLLBACK");
    } catch (_rollbackError) {
      // Ignore rollback errors when there is no active transaction.
    }
    console.error("Restore failed:", error.message);
    process.exitCode = 1;
  } finally {
    try {
      db.exec("DETACH DATABASE old");
    } catch (_detachError) {
      // Ignore detach errors if attach failed.
    }
    db.close();
  }
}

run();
