<script>
  import Icon from "icon";

  export let count = 0;
</script>

<div class="sub-tasks-indicator">
  <Icon.Branch />
  {count}
</div>

<style>
  .sub-tasks-indicator {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  :global(.sub-tasks-indicator > svg) {
    width: 14px;
    height: 14px;
  }
</style>
