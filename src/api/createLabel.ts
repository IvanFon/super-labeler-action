import { ApiProps } from '.';
import { Label } from '../parseContext';
import { formatColour } from '../utils';

export const createLabel = async ({
  client,
  repo,
  label,
  dryRun,
}: ApiProps & { label: Label, dryRun: boolean }) => {
  
  const color = formatColour(label.color);
  !dryRun && await client.issues.createLabel({
    ...repo,
    ...label,
    color,
  });
};
