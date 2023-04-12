import path from "path";
import { chain, ExpChain } from "lodash";
import { JSONFile, Low } from "@commonify/lowdb";
import { v4 as uuid } from "uuid";

/**
 * Type Definitions for the database
 */
export interface JiraTenant extends JiraTenantWithoutId {
	id: string;
}

export interface JiraTenantWithoutId {
	url: string;
	sharedSecret: string;
	clientKey: string;
	enabled?: boolean;
}

export interface Log<T = any> extends LogWithoutId<T> {
	id: string;
}

export interface LogWithoutId<T = any> {
	tenantId: string;
	message: string;
	data?: T;
}


interface ConnectAppData {
	jiraTenants: JiraTenant[];
	logs: Log[];
}

// Configure lowdb to write to JSONFile
const dbFile = path.join(process.cwd(), "db.json");
const adapter = new JSONFile<ConnectAppData>(dbFile);

// Default data to be added to JSON db
const defaults = {
	jiraTenants: [],
	logs: []
};

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
	chain: ExpChain<this["data"]> = chain(this).get("data");
}

// Initializes the db
const initialized = () => {
	return (_target: unknown, _propertyKey: string, descriptor: TypedPropertyDescriptor<(...params: any[]) => Promise<any>>) => {
		const fn = descriptor.value;
		descriptor.value = async function (this: ConnectAppDatabase, ...args: unknown[]) {
			await this.read();
			this.data = this.chain.merge(defaults).value();
			return fn?.apply(this, args);
		};
	};
};

/**
 * This is a stand-in for any kind of DB/ORM library you'd like to use to store data0
 */
class ConnectAppDatabase extends LowWithLodash<ConnectAppData> {
	constructor() {
		super(adapter);
	}

	@initialized()
	public async findJiraTenant(props: Partial<JiraTenant>) {
		return this.chain.get("jiraTenants").find(props).value();
	}

	@initialized()
	public async addJiraTenant(props: JiraTenantWithoutId) {
		// Considering hosts to be unique
		const checkIfAlreadyExists = await this.findJiraTenant({ clientKey: props.clientKey });
		if (!checkIfAlreadyExists) {
			this.data?.jiraTenants.push({
				id: uuid(),
				enabled: false,
				...props
			});
			await this.write();
		}
	}

	@initialized()
	public async updateJiraTenant(clientKey: string, props: Partial<JiraTenant>) {
		const tenant = await this.findJiraTenant({ clientKey });
		if (!tenant) {
			throw `Cannot find tenant with clientKey: ${clientKey}`;
		}
		Object.keys(props).forEach(key => {
			tenant[key] = props[key];
		});
		tenant.clientKey = clientKey;
		await this.write();
	}

	@initialized()
	public async enableJiraTenant(clientKey: string) {
		await this.updateJiraTenant(clientKey, { enabled: true });
		await this.write();
	}

	@initialized()
	public async disableJiraTenant(clientKey: string) {
		await this.updateJiraTenant(clientKey, { enabled: false });
		await this.write();
	}

	@initialized()
	public async removeJiraTenant(clientKey: string) {
		const tenantIds = this.chain.get("jiraTenants").remove(tenant => tenant.clientKey === clientKey).map(t => t.id);
		this.chain.get("logs").remove(log => tenantIds.includes(log.tenantId));
		await this.write();
	}

	@initialized()
	public async findLogsForJiraTenant(host: string) {
		const tenant = await this.findJiraTenant({ url: host });
		return tenant ? this.chain.get("logs").filter({ tenantId: tenant.id }).value() : [];
	}

	@initialized()
	public async addLogs(props: LogWithoutId) {
		this.data?.logs.push({
			id: uuid(),
			...props
		});
		await this.write();
	}

	@initialized()
	public async removeLogsForJiraTenant(tenant: Partial<JiraTenant>) {
		const tenantId = tenant.id || (await this.findJiraTenant(tenant))?.id;
		if (tenantId) {
			this.chain.get("logs").remove(log => log.tenantId === tenantId);
			await this.write();
		}
	}
}

export const database = new ConnectAppDatabase();
