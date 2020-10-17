<script>
  import { onMount } from "svelte";
  import { beforeUrlChange } from "@sveltech/routify";
  import { projectService } from "services/project";
  import { breakpoints } from "constants";
  import { isLimitedScreenSpace } from "../../stores.js";
  import Icon from "icon";
  import ProjectChip from "components/ProjectChip/ProjectChip.svelte";

  let projects;

  projectService.getAll().then((response) => {
    projects = response.projects;
  });

  let navIsOpen = true;
  let navHasBeenManuallyClosed = false;

  function manuallyToggleNav() {
    navIsOpen = !navIsOpen;

    navHasBeenManuallyClosed = !navIsOpen;
  }

  function automaticallyToggleNav() {
    if (navHasBeenManuallyClosed) return;

    if (window.innerWidth < breakpoints.MEDIUM && navIsOpen) {
      navIsOpen = false;
    } else if (window.innerWidth > breakpoints.MEDIUM && !navIsOpen) {
      navIsOpen = true;
    }
  }

  onMount(() => {
    if (typeof window !== undefined) {
      automaticallyToggleNav();

      window.addEventListener("resize", automaticallyToggleNav);
    }
  });

  $beforeUrlChange(() => {
    if ($isLimitedScreenSpace && navIsOpen) {
      navIsOpen = false;
    }

    return true;
  });
</script>

{#if projects}
  <button class="navigation__toggle-button" on:click={manuallyToggleNav}>
    <Icon.Hamburger />
  </button>

  <nav
    class="navigation"
    class:navigation--open={navIsOpen}
    class:navigation--closed={!navIsOpen}>
    <div class="navigation__section">
      <ul class="navigation__list">
        <li class="navigation__list-item navigation__list-item--task-inbox">
          <a href="/inbox/task">
            <Icon.CheckCircle />
            Task Inbox
          </a>
        </li>

        <li class="navigation__list-item navigation__list-item--note-inbox">
          <a href="/inbox/note">
            <Icon.Note />
            Note Inbox
          </a>
        </li>

        <li class="navigation__list-item navigation__list-item--today">
          <a href="/today">
            <Icon.Calendar />
            Today
          </a>
        </li>

        <li class="navigation__list-item navigation__list-item--upcoming">
          <a href="/upcoming">
            <Icon.Calendar />
            Upcoming
          </a>
        </li>
      </ul>
    </div>
    <div class="navigation__section navigation__projects">
      <h1 class="navigation__heading">Projects</h1>
      {#each projects as { name, slug, color }}
        <ul class="navigation__list">
          <li class="navigation__list-item">
            <a href="/project/{slug}">
              <ProjectChip {color} {name} />
            </a>
          </li>
        </ul>
      {:else}No projects found 🙁{/each}
    </div>
  </nav>
{/if}

<style>
  .navigation__toggle-button {
    position: fixed;
    top: 24px;
    left: 24px;
    border: 0;
    background: none;
    width: 24px;
    height: 24px;
    z-index: 11;
    cursor: pointer;
  }

  .navigation {
    position: fixed;
    min-height: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    padding-top: 72px;

    background-color: rgb(var(--color-background-secondary));

    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);

    width: 250px;

    left: 0;
    transition: left 0.15s ease-in-out;

    z-index: 10;
  }

  .navigation--open {
    left: 0;
  }

  .navigation--closed {
    left: -250px;
  }

  /*On larger screens, allow the open navigation to actually affect the flow of the document whilst
  it has the space to do so.*/
  @media only screen and (min-width: 960px) {
    .navigation--open {
      position: relative;
      height: initial;
    }
  }

  .navigation__section {
    margin-bottom: 24px;
    padding-left: 24px;
    padding-right: 24px;
  }

  .navigation__projects {
    overflow-y: auto;
  }

  .navigation__heading {
    font-weight: bold;
    font-size: var(--font-size-heading-small);
    margin-bottom: 12px;
  }

  .navigation__list {
    display: flex;
    flex-direction: column;
    list-style: none;
  }

  .navigation__list-item {
    display: flex;
    padding: 0;

    transition: background-color 0.15s ease-in-out;
    padding: 12px;
  }

  .navigation__list-item:hover {
    background-color: rgb(var(--color-background-tertiary));
  }

  .navigation__list-item a {
    display: flex;
    align-items: center;

    width: 100%;

    color: rgb(var(--color-text));
    text-decoration: none;
    font-weight: 600;
  }

  :global(.navigation__list-item a svg) {
    margin-right: 8px;
    width: var(--font-size-body);
    height: var(--font-size-body);
  }

  :global(.navigation__list-item--task-inbox a svg) {
    stroke: rgb(var(--color-icon-task-inbox));
  }

  :global(.navigation__list-item--note-inbox a svg) {
    stroke: rgb(var(--color-icon-note-inbox));
  }

  :global(.navigation__list-item--today a svg) {
    stroke: rgb(var(--color-icon-today));
  }

  :global(.navigation__list-item--upcoming a svg) {
    stroke: rgb(var(--color-icon-upcoming));
  }
</style>
