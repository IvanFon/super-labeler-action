<script>
  import { createEventDispatcher } from 'svelte';

  export let buttonText;
  export let buttonClass = "btn-sm";

  const dispatch = createEventDispatcher();

  let open = false;
  let detailsEl;

  const handleToggleOpen = () => {
    if (open) {
      open = false;
      dispatch('closed');
    } else {
      open = true;
      dispatch('opened');
    }
  }

  export const close = () => detailsEl.open = false;
</script>

<details bind:this={detailsEl} class="dropdown details-reset details-overlay d-inline-block">
  <summary class={`btn ${buttonClass}`} on:click={handleToggleOpen} aria-haspopup="true">
    {buttonText}
    <div class="dropdown-caret"></div>
  </summary>

  <div class="dropdown-menu dropdown-menu-sw width-auto p-3">
    <slot />
  </div>
</details>
