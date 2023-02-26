import path from 'path';
import { chain, ExpChain, remove } from "lodash"
import { JSONFile, Low } from "@commonify/lowdb";

export interface Tenant {
    id: string;
    host: string;
    sharedSecret: string;
    clientKey: string;
}

export interface Log {
    id: string;
    tenantId: string;
    message: string;
    data?: any;
}

interface Data {
    tenants: Tenant[];
    logs: Log[];
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
    chain: ExpChain<this['data']> = chain(this).get('data')
}

class Database {
    private readonly initialized: Promise<void>
    private readonly db: LowWithLodash<Data>

    constructor() {
        // Configure lowdb to write to JSONFile
        const dbFile = path.join(process.cwd(), 'db.json');
        const adapter = new JSONFile<Data>(dbFile);
        this.db = new LowWithLodash(adapter);

        // Read data from JSON file, initialize contents if missing
        this.initialized = this.db.read().then(async () => {
            if(!this.db.data) {
                this.db.data = {
                    tenants: [],
                    logs: []
                }
                await this.db.write();
            }
        })
    }

    public async findTenant(props: Partial<Tenant>) {
        await this.initialized;
        return this.db.chain.get("tenants").find(props).value();
    }

    public async addTenant(props: Tenant) {
        await this.initialized;
        // Considering hosts to be unique
        const checkIfAlreadyExists = await this.findTenant({ host: props.host });
        if (!checkIfAlreadyExists) {
            this.db.data?.tenants.push(props);
            await this.db.write();
        }
    }

    public async removeTenant(host: string) {
        await this.initialized;
        const tenant = await this.findTenant({ host });
        if (tenant) {
            remove(this.db.data?.tenants || [], tenant => tenant.host === host );
            await this.db.write();
        }
    }

    public async findLogsForTenant(host: string) {
        await this.initialized;
        const tenant = await this.findTenant({ host });
        return tenant ? this.db.chain.get("logs").filter({tenantId: tenant.id}).value() : [];
    }

    public async addLogs(props: Log) {
        await this.initialized;
        this.db.data?.logs.push(props);
        await this.db.write();
    }

    public async removeLogsForTenant(host: string) {
        await this.initialized;
        const tenant = await this.findTenant({ host });
        if (tenant) {
            remove(this.db.data?.logs || [], log => log.tenantId === tenant.id);
            await this.db.write();
        }
    }
}

export const database = new Database();