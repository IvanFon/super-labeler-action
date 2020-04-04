import * as core from '@actions/core';
import { GitHub } from '@actions/github';

import { Config } from '.';
import { createLabel, getLabels, Repo, updateLabel } from './api';
import { formatColour } from './utils';

const syncLabels = async ({
  client,
  config,
  repo,
}: {
  client: GitHub;
  config: Config['labels'];
  repo: Repo;
}) => {
  const curLabels = await getLabels({ client, repo });
  core.debug(`curLabels: ${JSON.stringify(curLabels)}`);

  for (const _configLabel of Object.values(config)) {
    const configLabel = {
      ..._configLabel,
      color: _configLabel.colour,
    };

    const curLabel = curLabels.filter((l) => l.name === configLabel.name);
    if (curLabel.length > 0) {
      const label = curLabel[0];
      if (
        label.description !== configLabel.description ||
        label.color !== formatColour(configLabel.color)
      ) {
        core.debug(
          `Recreate ${JSON.stringify(configLabel)} (prev: ${JSON.stringify(
            label,
          )})`,
        );
        await updateLabel({ client, repo, label: configLabel });
      }
    } else {
      core.debug(`Create ${JSON.stringify(configLabel)}`);
      try {
        await createLabel({ client, repo, label: configLabel });
      }
      catch (e) {
        core.error(e)
      }
    }
  }
};

export default syncLabels;
