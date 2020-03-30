<script>
  import { createLabel, labels } from '~/stores/labels';
  import EditLabel from './EditLabel';
  import ImportDropdown from './ImportDropdown';
  import Label from './Label';
  import Step from '../Step';

  let newLabel = false;

  const emptyLabel = {
    id: '',
    name: '',
    description: '',
    colour: '#ffffff',
  };

  const handleCreateLabel = (event) => {
    createLabel(event.detail);
    newLabel = false;
  }
</script>

<div class="d-flex flex-justify-between flex-items-baseline mb-1">
  <Step num="1" text="Define your labels" />
  <ImportDropdown />
</div>

<div class="Box">
  <div class="Box-header d-flex p-3 flex-justify-between flex-items-baseline">
    <h3 class="Box-title f5" on:click={() => console.log($labels)}>{$labels.length} labels</h3>
    <button
      on:click={() => newLabel = !newLabel}
      class="btn btn-sm"
      class:btn-primary={!newLabel}
      class:btn-outline={newLabel}
      type="button"
    >
      New Label
    </button>
  </div>
  <div role="group">
    {#if newLabel}
      <EditLabel on:save={handleCreateLabel} on:cancel={() => newLabel = false} label={emptyLabel} />
    {/if}
    {#each $labels as label (label.id)}
      <Label {label} />
    {/each}
  </div>
</div>
