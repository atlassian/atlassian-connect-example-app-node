import path from "path";
import { chain, ExpChain, remove } from "lodash";
import { JSONFile, Low } from "@commonify/lowdb";

export interface JiraTenant {
    id: string;
    url: string;
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
    jiraTenants: JiraTenant[];
    logs: Log[];
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
	chain: ExpChain<this["data"]> = chain(this).get("data");
}

class Database {
	private readonly initialized: Promise<void>;
	private readonly db: LowWithLodash<Data>;

	constructor() {
		// Configure lowdb to write to JSONFile
		const dbFile = path.join(process.cwd(), "db.json");
		const adapter = new JSONFile<Data>(dbFile);
		this.db = new LowWithLodash(adapter);

		// Read data from JSON file, initialize contents if missing
		this.initialized = this.db.read().then(async () => {
			if (!this.db.data) {
				this.db.data = {
					jiraTenants: [],
					logs: []
				};
				await this.db.write();
			}
		});
	}

	public async findJiraTenant(props: Partial<JiraTenant>) {
		await this.initialized;
		return this.db.chain.get("jiraTenants").find(props).value();
	}

	public async addJiraTenant(props: JiraTenant) {
		await this.initialized;
		// Considering hosts to be unique
		const checkIfAlreadyExists = await this.findJiraTenant({ url: props.url });
		if (!checkIfAlreadyExists) {
			this.db.data?.jiraTenants.push(props);
			await this.db.write();
		}
	}

	public async removeJiraTenant(host: string) {
		await this.initialized;
		const tenant = await this.findJiraTenant({ url: host });
		if (tenant) {
			remove(this.db.data?.jiraTenants || [], tenant => tenant.url === host);
			await this.db.write();
		}
	}

	public async findLogsForJiraTenant(host: string) {
		await this.initialized;
		const tenant = await this.findJiraTenant({ url: host });
		return tenant ? this.db.chain.get("logs").filter({ tenantId: tenant.id }).value() : [];
	}

	public async addLogs(props: Log) {
		await this.initialized;
		this.db.data?.logs.push(props);
		await this.db.write();
	}

	public async removeLogsForJiraTenant(host: string) {
		await this.initialized;
		const tenant = await this.findJiraTenant({ url: host });
		if (tenant) {
			remove(this.db.data?.logs || [], log => log.tenantId === tenant.id);
			await this.db.write();
		}
	}
}

export const database = new Database();