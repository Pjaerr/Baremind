<script>
  import { metatags } from "@sveltech/routify";
  import TaskList from "components/TaskList/TaskList.svelte";

  metatags.title = "Baremind | Task Inbox";

  /* Probably have something in here that checks what the users chosen default route is (saved in
  localstorage) and then redirects them to that route if chosen. In the future when we have login/auth
  this page would first check if they're logged in (as would every other page) and if they're not,
  we show them the landing page of the application instead of the logged in view.*/

  const tasks = [
    {
      name: "A task that has a date and repeats",
      id: "1",
      priority: 1,
      subTasks: [],
      project: { name: "German", color: "#ffb142" },
      due: { date: "18/08/2020", time: "15:00" },
      hasNotes: false,
      hasReminder: false,
      isRepeating: true,
      isCompleted: false,
    },
    {
      name: "A task with no date that doesn't repeat",
      id: "2",
      priority: 0,
      subTasks: [
        {
          name: "A task with no time that does repeat",
          id: "3",
          priority: 0,
          subTasks: [
            {
              name: "An example sub task",
              id: "4",
              priority: 0,
              subTasks: [],
              project: { name: "Photography Course", color: "#ff6b81" },
              due: { date: "18/08/2020", time: null },
              hasNotes: false,
              hasReminder: false,
              isRepeating: false,
            },
            {
              name: "An example sub task",
              id: "5",
              priority: 0,
              subTasks: [
                {
                  name: "An example sub task",
                  id: "6",
                  priority: 3,
                  subTasks: [],
                  project: { name: "Photography Course", color: "#ff6b81" },
                  due: { date: null, time: null },
                  hasNotes: false,
                  hasReminder: false,
                  isRepeating: false,
                },
              ],
              project: { name: "Photography Course", color: "#ff6b81" },
              due: { date: null, time: null },
              hasNotes: false,
              hasReminder: false,
              isRepeating: false,
            },
          ],
          project: { name: "Life", color: "green" },
          due: { date: "20/10/2020", time: null },
          hasNotes: false,
          hasReminder: false,
          isRepeating: true,
        },
        {
          name: "An example sub task",
          id: "7",
          priority: 0,
          subTasks: [],
          project: { name: "Window Cleaning", color: "#7f8fa6" },
          due: { date: null, time: null },
          hasNotes: false,
          hasReminder: false,
          isRepeating: false,
        },
      ],
      project: { name: "German", color: "#ffb142" },
      due: { date: "18/08/2020", time: "18:00" },
      hasNotes: false,
      hasReminder: false,
      isRepeating: false,
    },
  ];
</script>

<div class="container">
  <TaskList {tasks} />
</div>
