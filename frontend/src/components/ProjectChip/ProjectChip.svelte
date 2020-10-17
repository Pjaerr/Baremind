<script>
  export let color;
  export let name;
</script>

<div class="project-chip__color-block" style="background-color: {color}" />
{name}

<style>
  .project-chip__color-block {
    min-width: 4px;
    min-height: 100%;
    margin-right: 8px;
  }
</style>
