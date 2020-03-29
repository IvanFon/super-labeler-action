<script>
  import { deleteLabel, setEditLabel, updateLabel } from '../stores/labels';
  import EditLabel from './EditLabel';

  export let label;

  let nameInput = label.name;
  let descriptionInput = label.description;

  const handleStartEditing = () => setEditLabel(label.id, true);
  const handleStopEditing = () => setEditLabel(label.id, false);
  const handleDeleteLabel = () => deleteLabel(label.id);
  const handleSaveLabel = (event) => {
    const newId = updateLabel(label.id, event.detail);
    setEditLabel(newId, false);
  }
</script>

{#if !label.new}
  <div class="Box-row border-bottom-0 m-0 d-flex flex-items-baseline">

    <!-- name -->
    <div class="label-container">
        <span
          class="d-inline-block v-align-top px-2 py-1 rounded-1 f5 text-bold lh-condensed"
          style="background-color: {label.colour};"
        >
          {label.name}
        </span>
    </div>

    <!-- description -->
    <div class="description-container">
      <span class="f6 text-gray">{label.description}</span>
    </div>

    <!-- buttons -->
    <div class="buttons-container">
      {#if !label.editing}
        <button
          on:click={handleStartEditing}
          class="link-gray btn-link ml-3 text-right"
          type="button"
        >
          Edit
        </button>
      {/if}
      <button
        on:click={handleDeleteLabel}
        class="link-gray btn-link ml-3 text-right"
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
{/if}

{#if label.editing}
  <EditLabel on:save={handleSaveLabel} on:cancel={handleStopEditing} {label} />
{/if}

<style>
  .label-container {
    width: 25%;
  }

  .buttons-container {
    margin-left: auto;
  }
</style>
