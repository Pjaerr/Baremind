<script>
  import { redirect } from "@sveltech/routify";

  //Here would check what the users defined starting page is in the future, for now we just redirect to the inbox.

  $redirect("/inbox/task");
</script>
