import { Utils } from ".";
import { Runners } from "../../types";
export declare function sync(this: Utils, config: Runners["labels"]): Promise<void>;
export declare function addRemove(this: Utils, labelName: string, IDNumber: number, hasLabel: boolean, shouldHaveLabel: boolean): Promise<void>;
//# sourceMappingURL=labels.d.ts.map