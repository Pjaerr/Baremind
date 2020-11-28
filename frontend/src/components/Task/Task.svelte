<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { isLimitedScreenSpace } from "../../stores";
  import Tickbox from "./Tickbox.svelte";
  import TaskList from "components/TaskList/TaskList.svelte";
  import Collapser from "components/Collapser/Collapser.svelte";
  import SubTasksIndicator from "components/SubTasksIndicator/SubTasksIndicator.svelte";
  import Icon from "icon";
  import ProjectChip from "components/ProjectChip/ProjectChip.svelte";

  export let task: Task;
  export let showProject = false;

  let subTasksIsOpen = false;

  //Allow subtasks to be toggled if there is enough screen space.
  $: subTasksIsAllowedToBeToggled = !$isLimitedScreenSpace;

  const dispatch = createEventDispatcher();
</script>

<style>
  .task {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    /*Disables text selection on this element*/
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;

    padding-left: 24px;
  }

  .task__project {
    display: flex;
    font-size: var(--font-size-tertiary-info);
    font-weight: bold;
  }

  .task-content {
    display: flex;
    margin-top: 12px;
  }

  .task-content__left {
    display: flex;
  }

  .task-content__right {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .task-content__right__top {
    display: flex;

    margin-bottom: 12px;
  }

  .task-content__right__bottom {
    display: flex;
    justify-content: space-between;
  }

  .task-content__right__bottom__left {
    display: flex;
  }

  .task-content__sub-tasks-indicator {
    display: flex;
    margin-right: 10px;
  }

  .task-content__actions {
    display: flex;
  }

  .task__toggle-sub-tasks {
    width: 24px;
    height: 18px;
    margin-left: -24px;
  }

  .task-content__name {
    margin-left: 12px;
  }

  .task-content__date-and-time {
    display: flex;
  }

  .task-content__date,
  .task-content__time {
    display: flex;
  }

  .task-content__date__icon {
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }

  .task-content__date__text {
    margin-right: 4px;
    padding-right: 5px;
  }

  .task-content__time__icon {
    height: 100%;
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }

  .task-content__time__text {
    margin-right: 5px;
    padding-right: 5px;
  }

  .task-content__repeat-icon {
    width: 16px;
    height: 16px;
    margin-left: 8px;
  }

  .task-content__delete-button {
    width: 18px;
    height: 18px;
    margin-left: 8px;
    border: none;
    background: none;
    cursor: pointer;
  }

  .task-content__delete-button:hover {
    transform: scale(1.2, 1.2);
  }

  .task__divider {
    margin-top: 14px;
    margin-left: 24px;
    width: 100%;
    height: 2px;
    background-color: rgb(var(--color-divider));
  }

  .task__sub-tasks {
    padding-left: 24px;
  }
</style>

<div class="task">
  {#if showProject}
    <div class="task__project">
      <ProjectChip name={task.project.name} color={task.project.color} />
    </div>
  {/if}

  <div class="task-content">
    <div class="task-content__left">
      <div class="task__toggle-sub-tasks">
        {#if subTasksIsAllowedToBeToggled && task.subTasks.length > 0}
          <Collapser bind:isOpen={subTasksIsOpen} />
        {/if}
      </div>
      <Tickbox
        priority={task.priority}
        on:click={() => dispatch('update', {
            task: {
              ...task,
              isCompleted: true,
            },
          })} />
    </div>
    <div class="task-content__right">
      <div class="task-content__right__top">
        <p class="task-content__name">{task.name}</p>
      </div>
      <div class="task-content__right__bottom">
        <div class="task-content__right__bottom__left">
          {#if task.subTasks.length > 0}
            <div class="task-content__sub-tasks-indicator">
              <SubTasksIndicator count={task.subTasks.length} />
            </div>
          {/if}
          <div class="task-content__date-and-time">
            {#if task.due.date}
              <div class="task-content__date">
                <div class="task-content__date__icon">
                  <Icon.Calendar />
                </div>
                <div class="task-content__date__text">{task.due.date}</div>
              </div>
            {/if}

            {#if task.due.time}
              <div class="task-content__time">
                <div class="task-content__time__icon">
                  <Icon.Clock />
                </div>
                <div class="task-content__time__text">{task.due.time}</div>
              </div>
            {/if}
          </div>
        </div>

        <div class="task-content__actions">
          {#if task.isRepeating}
            <div type="button" class="task-content__repeat-icon">
              <Icon.Repeat />
            </div>
          {/if}
          <button
            type="button"
            class="task-content__delete-button"
            on:click={() => dispatch('delete', { task })}>
            <Icon.Bin />
          </button>
        </div>
      </div>
    </div>
  </div>

  <span class="task__divider" />
  {#if subTasksIsAllowedToBeToggled && subTasksIsOpen}
    <div class="task__sub-tasks" transition:slide={{ duration: 100 }}>
      <TaskList tasks={task.subTasks} />
    </div>
  {/if}
</div>
