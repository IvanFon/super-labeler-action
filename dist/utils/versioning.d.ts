import { Utils } from ".";
import { Config } from "../../types";
import { Version } from "../conditions";
export declare function parse(this: Utils, config: Config, ref?: string): Promise<Version>;
export declare function getNodeVersion(this: Utils, root: string, ref?: string): Promise<string>;
//# sourceMappingURL=versioning.d.ts.map