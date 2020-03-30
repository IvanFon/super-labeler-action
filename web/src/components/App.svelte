<script>
  import { route } from '~/stores/router';
  import Intro from './Intro';
  import Labels from './labels/Labels';

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
  <svelte:component this={component} />
</div>
