<script>
  import { route } from '~/stores/router';
  export let name;
  export let tabRoute;
</script>

<span
  class="tabnav-tab"
  aria-current={$route === tabRoute && 'page' || undefined}
  on:click={() => route.set(tabRoute)}
>
  {name}
</span>

<style>
  span {
    user-select: none;
    cursor: pointer;
  }
</style>
