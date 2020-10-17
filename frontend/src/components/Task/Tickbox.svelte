<script>
  import Icon from "icon";

  export let priority = 0;
</script>

<button
  class="tickbox"
  on:click
  class:tickbox--priority-high={priority === 1}
  class:tickbox--priority-medium={priority === 2}
  class:tickbox--priority-low={priority === 3}>
  <div class="tickbox__tick">
    <Icon.Tick />
  </div>
</button>

<style>
  .tickbox {
    --animation-speed: 0.15s;

    width: 18px;
    height: 18px;
    min-width: 18px;
    min-height: 18px;

    border-radius: 50%;
    border: 2px solid rgb(var(--color-accent));

    transition: background-color ease-in-out var(--animation-speed),
      border-color ease-in-out var(--animation-speed);
  }

  .tickbox:hover {
    border-color: rgba(var(--color-action-confirm), 1);
    background-color: rgba(var(--color-action-confirm), 0.4);
  }

  .tickbox__tick {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    opacity: 0;
    transition: opacity var(--animation-speed) ease-in-out;
  }

  .tickbox:hover > .tickbox__tick {
    opacity: 1;
  }

  .tickbox--priority-high {
    border-color: rgb(var(--color-priority-high));
    background-color: rgba(var(--color-priority-high), 0.6);
  }

  .tickbox--priority-medium {
    border-color: rgb(var(--color-priority-medium));
    background-color: rgba(var(--color-priority-medium), 0.6);
  }

  .tickbox--priority-low {
    border-color: rgb(var(--color-priority-low));
    background-color: rgba(var(--color-priority-low), 0.6);
  }
</style>
