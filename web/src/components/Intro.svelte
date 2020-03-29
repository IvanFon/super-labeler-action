<script>
  import { route } from '../stores/router';

  const handleNewConfig = () => route.set('/labels');
</script>

<p class="ml-3 mr-3">
  Super Labeler is a Github Action that automatically labels your repo's issues
  and pull requests. Super Labeler uses a declarative configuration that allows
  you to easily manage your labels and when to apply them. This configuration
  file is checked in to your repository, just like the rest of your CI config.
</p>

<div class="text-center">
  <button class="btn btn-primary" on:click={handleNewConfig} type="button">Create a new config</button>
  <button class="btn" type="button">Import an existing config</button>
</div>
