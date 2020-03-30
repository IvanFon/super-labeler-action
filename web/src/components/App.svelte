<script>
  import { resetLabels } from '~/stores/labels';
  import { route } from '~/stores/router';
  import Intro from './Intro';
  import Labels from './labels/Labels';
  import Tab from './Tab';

  const ROUTES = {
    '/': Intro,
    '/labels': Labels,
  };

  $: component = ROUTES[$route] || Intro;
</script>

<div class="Box box-shadow-medium container-lg mt-6 p-3">
  <p class="h1 text-center">Super Labeler Config Generator</p>
  <p class="h3 text-center">
    Generate a config for the
    <a href="https://github.com/IvanFon/super-labeler-action">
      Super Labeler Github Action
    </a>
  </p>
  <hr />
  <div class="tabnav">
    <nav class="tabnav-tabs">
      <Tab name="Intro" tabRoute="/" />
      <Tab name="Labels" tabRoute="/labels" />
      <Tab name="Conditions" tabRoute="/conditions" />
      <Tab name="Generate Workflow/Config" tabRoute="/generate" />
    </nav>
  </div>
  <svelte:component this={component} />
</div>
