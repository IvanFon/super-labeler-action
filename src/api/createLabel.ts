import { ApiProps } from '.';
import { Label } from '../parseContext';

export const createLabel = async ({
  client,
  repo,
  label,
}: ApiProps & { label: Label }) => {
  let color = label.color;
  if (color[0] === '#') {
    color = color.substr(1);
  }
  await client.issues.createLabel({
    ...repo,
    ...label,
    color,
  });
};
