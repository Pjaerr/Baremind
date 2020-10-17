<script>
  import Block from "./Block.svelte";
  import TaskList from "components/TaskList/TaskList.svelte";
  import { taskService } from "services/task";

  export let block;

  //Go to taskService to get tasks matching this block
  let tasks = [];

  taskService.getAllForBlock(block.id).then((data) => {
    tasks = data.tasks;
  });

  let isCreatingNewTask = false;

  let taskName;

  function saveTask() {
    const task = {
      block: block.id,
      name: taskName,
      priority: 2,
      project: { name: "life", colour: "green" },
      due: { date: "18/08/2020", time: "15:00" },
    };

    //We've got an issue here, when tasks are created, they are assigned an ID by the database
    //but this process is asynchonous and so we don't want to wait for it before updating the UI
    //the problem lies in that we don't know this task's ID until that async process has completed
    // which means we're rendering a task without an ID, this is an issue because to delete a task
    // it needs to know its ID. I think the 'delay' is non exisitent really cause we're going to
    //a local database but it would be good to solve. The only solution I can think of is to generate
    //the ID's here, but they'd have to be properly random using to avoid collisions and I'm not sure
    //the overhead of doing that makes sense when the database will do it for us.

    //Best bet it to probably generate the ID here using a uuid package (for guaranteed no collision) if we are doing this, probably makes sense to do this inside of the taskService.add function that can take all of the parameters expect the ID and then will return a task containing that ID -- Worth considering this problem from a higher level.

    //Just some loose thoughts here but I foresee issues once we have a backend. Essentially all data
    //on the frontend is assumed to be tampered with by the user, so we don't just want to blindly
    //store data changes on the backend, we will need lots of validation on the backend and a plan for
    //what to do if that validation fails, do we keep the data on the database on the frontend? and if so
    //the next time we sync the data what do we do? We can ignore for now, but just writing it down as
    //a discussion point.

    tasks = [...tasks, taskService.add(task)];
  }

  function updateTask(updatedTask) {
    taskService.update(updatedTask);

    tasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
  }

  function deleteTask(deletedTask) {
    taskService.delete(deletedTask.id);

    tasks = tasks.filter((task) => task.id !== deletedTask.id);
  }
</script>

<Block>
  <h1>{block.id}</h1>

  <TaskList
    tasks={tasks.filter((task) => !task.isCompleted)}
    on:update={({ detail }) => {
      updateTask(detail.task);
    }}
    on:delete={({ detail }) => {
      deleteTask(detail.task);
    }} />

  <b>Completed Tasks</b>
  <TaskList
    tasks={tasks.filter((task) => task.isCompleted)}
    on:update={({ detail }) => {
      updateTask(detail.task);
    }}
    on:delete={({ detail }) => {
      deleteTask(detail.task);
    }} />
  {#if isCreatingNewTask}
    <label> <input type="text" bind:value={taskName} /> </label>

    <button on:click={saveTask}>Save</button>
  {/if}

  <button on:click={() => (isCreatingNewTask = true)}>Add Task</button>
</Block>
