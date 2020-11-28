<script lang="ts">
  export let color: string;
  export let name: string;
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
