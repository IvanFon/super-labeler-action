<script>
  import { route } from '~/stores/router';
  import Intro from './Intro';
  import Labels from './labels/Labels';

  const ROUTES = {
    '/': {
      component: Intro,
    },
    '/labels': {
      component: Labels,
      step: {
        num: 1,
        text: 'Define your labels',
      },
    },
  };

  $: component = ROUTES[$route].component || Intro;
  $: step = ROUTES[$route].step;
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
  {#if step}
    <p class="h4">Step {step.num}/3: {step.text}</p>
  {/if}
  <svelte:component this={component} />
</div>
