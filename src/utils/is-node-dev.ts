export enum EnvironmentEnum {
	production = "production",
	development = "development",
}

export const getNodeEnv: () => EnvironmentEnum = () => EnvironmentEnum[process.env.NODE_ENV || ""] as EnvironmentEnum | undefined || EnvironmentEnum.development;
export const isNodeEnv = (env: EnvironmentEnum) => getNodeEnv() === env;
export const isNodeProd = () => isNodeEnv(EnvironmentEnum.production);
export const isNodeDev = () => isNodeEnv(EnvironmentEnum.development);
