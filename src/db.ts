import path from "path";
import { chain, ExpChain, remove } from "lodash";
import { JSONFile, Low } from "@commonify/lowdb";

export interface JiraTenant {
	id: string;
	url: string;
	sharedSecret: string;
	clientKey: string;
}

export interface Log<T = any> {
	id: string;
	tenantId: string;
	message: string;
	data?: T;
}

interface ConnectAppData {
	jiraTenants: JiraTenant[];
	logs: Log[];
}

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
	chain: ExpChain<this["data"]> = chain(this).get("data");
}

// Configure lowdb to write to JSONFile
const dbFile = path.join(process.cwd(), "db.json");
const adapter = new JSONFile<ConnectAppData>(dbFile);

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

// Default data to be added to JSON db
const defaults = {
	jiraTenants: [],
	logs: []
};

// This is a stand in for any kind of DB/ORM library you'd like to use to store data
class ConnectAppDatabase extends LowWithLodash<ConnectAppData> {
	constructor() {
		super(adapter);
	}

	@initialized()
	public async findJiraTenant(props: Partial<JiraTenant>) {
		return this.chain.get("jiraTenants").find(props).value();
	}

	@initialized()
	public async addJiraTenant(props: JiraTenant) {
		// Considering hosts to be unique
		const checkIfAlreadyExists = await this.findJiraTenant({ url: props.url });
		if (!checkIfAlreadyExists) {
			this.data?.jiraTenants.push(props);
			await this.write();
		}
	}

	@initialized()
	public async removeJiraTenant(host: string) {
		const tenant = await this.findJiraTenant({ url: host });
		if (tenant) {
			remove(this.data?.jiraTenants || [], tenant => tenant.url === host);
			await this.write();
		}
	}

	@initialized()
	public async findLogsForJiraTenant(host: string) {
		const tenant = await this.findJiraTenant({ url: host });
		return tenant ? this.chain.get("logs").filter({ tenantId: tenant.id }).value() : [];
	}

	@initialized()
	public async addLogs(props: Log) {
		this.data?.logs.push(props);
		await this.write();
	}

	@initialized()
	public async removeLogsForJiraTenant(host: string) {
		const tenant = await this.findJiraTenant({ url: host });
		if (tenant) {
			remove(this.data?.logs || [], log => log.tenantId === tenant.id);
			await this.write();
		}
	}
}

export const database = new ConnectAppDatabase();
