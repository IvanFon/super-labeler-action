<script>
  import { createEventDispatcher } from 'svelte';

  export let label;

  const dispatch = createEventDispatcher();

  let name = label.name;
  let description = label.description;
  let colour = label.colour;
  let valid = true;

  const handleSave = () => dispatch('save', {
    name,
    description,
    colour,
  });

  $: {
    valid = true;
    if (!name) {
      valid = false;
    }
    if (!colour) {
      valid = false;
    }
  }
</script>

<div class="Box-row border-top-0 m-0 pt-0 pb-0 d-flex flex-items-end">

  <!-- label name -->
  <dl class="form-group col-3 pr-3">
    <dt class="mb-0 d-flex flex-justify-between flex-items-center">
      <label class="f5 text-bold" for="label-name">Label name</label>
    </dt>
    <dd class="position-relative">
      <input
        bind:value={name}
        class="form-control"
        id="label-name"
        type="text"
        placeholder="Label name"
        autocomplete="off"
      />
    </dd>
  </dl>

  <!-- label description -->
  <dl class="form-group flex-auto pr-3">
    <dt class="d-flex flex-justify-between flex-items-center mb-0">
      <label class="f5 text-bold" for="label-description">Description</label>
    </dt>
    <dd>
    <input
        bind:value={description}
        class="form-control width-full"
        id="label-description"
        type="text"
        placeholder="Description (optional)"
        autocomplete="off"
      />
    </dd>
  </dl>

  <!-- label colour-->
  <dl class="form-group">
    <dt class="mb-0">
      <label class="f5 text-bold" for="label-colour">Colour</label>
    </dt>
    <dd>
      <div class="position-relative">
        <input
          bind:value={colour}
          class="form-control"
          id="label-colour"
          type="color"
          style="width: 6em"
        />
      </div>
    </dd>
  </dl>

  <!-- save/cancel buttons -->
  <div class="form-group ml-5">
    <button class="btn" type="button" on:click={() => dispatch('cancel')}>Cancel</button>
    <button
      class="btn btn-primary"
      type="submit"
      on:click={handleSave}
      disabled={!valid}
    >
      Save changes
    </button>
  </div>

</div>
