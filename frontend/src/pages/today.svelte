<script lang="ts">
  import TaskList from "components/TaskList/TaskList.svelte";
  import { taskService } from "services/task";
  import { format } from "date-fns";

  // Our date/time formatted EG: 2020-11-28
  const currentDate = format(new Date(), "yyyy-MM-dd");

  let tasks: TaskModel[];

  taskService.getAllForDate(currentDate).then((data) => {
    tasks = data.tasks;
  });
</script>

<h1>Today <span class="date">{format(new Date(), 'EEE LLL d')}</span></h1>
{#if tasks}
  {#if tasks.length > 0}
    <TaskList {tasks} />
  {:else}No tasks found for today{/if}
{:else}Looooooading...{/if}

<style>
  .date {
    font-weight: normal;
    font-size: var(--font-size-tertiary-info);
    color: rgb(var(--color-text-secondary));
  }
</style>
