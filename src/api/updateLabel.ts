import { ApiProps } from '.';
import { Label } from '../parseContext';
import { formatColour } from '../utils';

export const updateLabel = async ({
  client,
  repo,
  label,
}: ApiProps & { label: Label }) => {
  const color = formatColour(label.color);
  await client.issues.updateLabel({
    ...repo,
    current_name: label.name,
    description: label.description,
    color,
  });
};
