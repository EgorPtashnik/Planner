import { PriorityType, ProgressStatusType } from './reuse/types.js';
import { execSync } from 'child_process';
export default class CommonService extends cds.ApplicationService { init(){

    this.on (this.actions.BackupDatabase, onBackupDatabase);
    this.on (this.actions.RestoreDatabase, onRestoreDatabase);

    return super.init()
}};

async function onBackupDatabase(res, req) {
    try {
        execSync('npm run backup:db', { stdio: 'inherit' });
        return true;
    } catch(err) {
        throw new Error(err);
    }
};

async function onRestoreDatabase(res, req) {
    try {
        execSync('npm run restore:db', { stdio: 'inherit' });
        return true;
    } catch(err) {
        throw new Error(err);
    }
};