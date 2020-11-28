<script lang="ts">
  import Task from "components/Task/Task.svelte";

  export let tasks: TaskModel[];
</script>

{#each tasks as task (task.id)}
  <div class="task-list">
    <Task {task} on:update on:delete />
  </div>
{/each}

<style>
  .task-list {
    margin-top: 20px;
  }
</style>
