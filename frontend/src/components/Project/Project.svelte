<script>
  import TaskBlock from "components/Block/TaskBlock.svelte";

  export let project;

  export let addBlock;
</script>

<h1 style={`color: ${project.color}`}>{project.name}</h1>

<button
  on:click={() => {
    addBlock(project, 'task');
  }}>
  Add block
</button>

<section class="blocks">
  {#each project.blocks as block}
    {#if block.type === 'task'}
      <TaskBlock {block} />
    {:else if block.type === 'note'}
      <!--Render <Block.Note/> component or smth similar-->
    {/if}
  {/each}
</section>
