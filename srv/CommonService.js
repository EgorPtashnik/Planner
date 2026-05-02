import { PriorityType, ProgressStatusType } from './reuse/types.js';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

let routeRegistered = false;

export default class CommonService extends cds.ApplicationService {
    init() {
        this.on (this.actions.BackupDatabase, onBackupDatabase);
        this.on (this.actions.RestoreDatabase, onRestoreDatabase);

        // Register download route only once, after service is served
        if (!routeRegistered) {
            cds.on('serving', (service) => {
                if (service === this && cds.app) {
                    cds.app.get('/api/database/download', (req, res, next) => {
                        try {
                            const dbPath = resolveDbPath();

                            if (!fs.existsSync(dbPath)) {
                                return res.status(404).json({
                                    error: { message: `SQLite database file was not found: ${dbPath}` }
                                });
                            }

                            const filename = path.basename(dbPath);
                            res.setHeader('Content-Type', 'application/octet-stream');
                            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
                            res.sendFile(dbPath);
                        } catch (err) {
                            console.error('Download error:', err);
                            res.status(500).json({ error: { message: err.message } });
                        }
                    });
                    routeRegistered = true;
                }
            });
        }

        return super.init()
    }
}

async function onBackupDatabase() {
    try {
        execSync('npm run backup:db', { stdio: 'inherit' });
        return true;
    } catch(err) {
        throw new Error(err);
    }
};

async function onRestoreDatabase() {
    try {
        execSync('npm run restore:db', { stdio: 'inherit' });
        return true;
    } catch(err) {
        throw new Error(err);
    }
};

function resolveDbPath() {
    const rootDir = process.cwd();
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const fromEnv = process.env.CDS_DB_FILE;
    const fromCds = packageJson?.cds?.requires?.db?.credentials?.url;
    const dbFile = fromEnv || fromCds || 'db.sqlite';

    return path.isAbsolute(dbFile) ? dbFile : path.join(rootDir, dbFile);
}

