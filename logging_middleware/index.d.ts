export type LogStack = 'frontend' | 'backend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';
export declare const Log: (stack: LogStack, level: LogLevel, pkg: LogPackage, message: string) => Promise<void>;
//# sourceMappingURL=index.d.ts.map