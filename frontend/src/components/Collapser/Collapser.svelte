<script>
  import Icon from "icon";
  export let isOpen = false;
</script>

<label>
  <input type="checkbox" bind:checked={isOpen} />
  <span class="collapser" class:collapser--rotated={isOpen}>
    <Icon.Chevron />
  </span>
</label>

<style>
  input[type="checkbox"] {
    position: absolute;
    visibility: hidden;
  }

  :global(.collapser > svg) {
    transition: transform 0.1s ease-in-out;
  }

  :global(.collapser--rotated > svg) {
    transform: rotateZ(90deg);
  }
</style>
