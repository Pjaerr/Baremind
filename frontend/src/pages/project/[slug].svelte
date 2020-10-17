<script>
  import { redirect } from "@sveltech/routify";
  import { projectService } from "services/project";
  import TaskBlock from "components/Block/TaskBlock.svelte";

  export let slug;

  let project;

  async function load() {
    project = undefined;

    try {
      project = await projectService.get(slug);
    } catch {
      $redirect("/404");
    }
  }

  $: if (slug) {
    load();
  }

  function addBlock(type) {
    if (type === "task") {
      project.blocks = [
        ...project.blocks,
        {
          id: `${project.slug}_${project.blocks.length}`,
          type,
          tasks: [],
          note: null,
        },
      ];

      projectService.update(project);
    }
  }
</script>

{#if project}
  <h1 style={`color: ${project.color}`}>{project.name}</h1>

  <button
    on:click={() => {
      addBlock('task');
    }}>
    Add block
  </button>

  <section class="blocks">
    {#each project.blocks as block}
      {#if block.type === 'task'}
        <TaskBlock {block} />
      {:else if block.type === 'note'}{/if}
    {/each}
  </section>
{:else}
  <p>Loading...</p>
{/if}
