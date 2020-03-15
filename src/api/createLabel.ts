import { ApiProps } from '.';
import { formatColour } from '../utils';
import { Label } from '../parseContext';

export const createLabel = async ({
  client,
  repo,
  label,
}: ApiProps & { label: Label }) => {
  let color = formatColour(label.color);
  await client.issues.createLabel({
    ...repo,
    ...label,
    color,
  });
};
