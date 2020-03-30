<script>
  import { loadFromRepo } from '~/stores/labels';
  import Dropdown from '../Dropdown';

  const nameAuthorRe = /^([a-zA-Z0-9-]+)\/([A-Za-z0-9_.-]+)$/;
  const urlRe = /^https?:\/\/github\.com\/([a-zA-Z0-9-]+)\/([A-Za-z0-9_.-]+)$/;

  let dropdown;
  let repoInput;
  let repoError;
  let fetchLabelsPromise;

  const handleReset = () => {
    repoInput = '';
    repoError = undefined;
    fetchLabelsPromise = undefined;
  }

  const clearError = () => repoError = undefined;

  const handleImport = async () => {
    let author;
    let name;
    try {
      [, author, name] = repoInput.match(nameAuthorRe);
    } catch {
      try {
        [, author, name] = repoInput.match(urlRe);
      } catch {
        repoError = 'Repository not found';
        return;
      }
    }

    const apiUrl = `https://api.github.com/repos/${author}/${name}/labels`;
    fetchLabelsPromise = new Promise(async (resolve, reject) => {
      const res = await fetch(apiUrl);
      if (!res.ok) {
        return reject('Repository not found.');
      }
      const data = await res.json();
      resolve(data);
    });
    const labels = await fetchLabelsPromise;
    loadFromRepo(labels);
  };
</script>

<Dropdown
  bind:this={dropdown}
  on:closed={handleReset}
  buttonText="Import from repository"
>
  {#if !fetchLabelsPromise}
    <!-- Form -->
    <p class="f4 mb-1">Enter repo URL or name and author:</p>
    <ul class="f5 mb-2">
      <li>- only works on public repos</li>
      <li>- will overwrite current labels</li>
    </ul>
    <form class="d-flex" on:submit|preventDefault={handleImport}>
      <input
        bind:value={repoInput}
        on:input={clearError}
        class="form-control border"
        class:border-red={Boolean(repoError)}
        title={repoError}
        type="text"
        placeholder="IvanFon/super-labeler-action"
        aria-label="Repository URL or name and author"
      />
      <button
        disabled={!repoInput}
        class="btn btn-primary btn-sm ml-2"
        type="submit"
      >
        Import
      </button>
    </form>
  {:else}
    <!-- Loading status -->
    {#await fetchLabelsPromise}
      <p class="text-center text-bold">
        Fetching labels<span class="AnimatedEllipsis"></span>
      </p>
    {:then}
      <div class="d-flex flex-column flex-justify-center">
        <p class="text-center text-bold text-green">Success! 🎉</p>
        <button
          class="btn btn-outline btn-sm"
          type="button"
          on:click={() => dropdown.close()}
        >
          Close
        </button>
      </div>
    {:catch err}
      <p class="text-center text-bold text-red">
        Error: {err.message}
      </p>
    {/await}
  {/if}
</Dropdown>
