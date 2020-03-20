import { match } from 'minimatch';

import { PRProps } from '.';

const TYPE = 'filesMatch';

export interface ConditionFilesMatch {
  type: typeof TYPE;
  glob: string;
}

const filesMatch = (condition: ConditionFilesMatch, pr: PRProps) =>
  match(pr.files, condition.glob).length > 0;

export default [TYPE, filesMatch] as const;
