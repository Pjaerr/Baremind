import { database } from "../database/database";
import { v4 as uuidv4 } from "uuid";

class TaskService {
  constructor() {
    this.hasInitialised = false;
  }

  async initialise() {
    // await database.create("tasks", {
    //   block: "example-project_0" ,
    //   name: "A task that has a date and repeats",
    //   priority: 1,
    //   subTasks: [],
    //   project: { name: "life", colour: "green" },
    //   due: { date: "18/08/2020", time: "15:00" },
    //   hasNotes: false,
    //   hasReminder: false,
    //   isRepeating: true,
    //   isCompleted: false,
    // });

    this.hasInitialised = true;
  }

  async getAll() {
    if (this.hasInitialised) {
      const tasks = await database.getAll("tasks").atOnce();

      return {
        tasks,
      };
    } else {
      throw new Error(
        "You're trying to use TaskService before calling .initialise()"
      );
    }
  }

  async getAllForBlock(blockId) {
    if (this.hasInitialised) {
      const tasks = await database
        .getAll("tasks")
        .where("block")
        .equals(blockId);

      return {
        tasks,
      };
    } else {
      throw new Error(
        "You're trying to use TaskService before calling .initialise()"
      );
    }
  }

  async get(id) {
    if (this.hasInitialised) {
      const task = await database.get("tasks", id);

      return {
        task,
      };
    } else {
      throw new Error(
        "You're trying to use TaskService before calling .initialise()"
      );
    }
  }

  update(task) {
    database.update("tasks", task);
  }

  add({
    block,
    name,
    priority = 0,
    subTasks = [],
    project = null,
    due = { date: null, time: null },
    hasNotes = false,
    hasReminder = false,
    isRepeating = false,
    isCompleted = false,
  }) {
    // Here we create a task with all the properties supplied, we then create it on the database but we don't wait for that to complete, instead we return the task so that the UI can be updated.
    const task = {
      id: uuidv4(),
      block,
      name,
      priority,
      subTasks,
      project,
      due,
      hasNotes,
      hasReminder,
      isRepeating,
      isCompleted,
    };

    database.create("tasks", task);

    return task;
  }

  delete(id) {
    database.delete("tasks", id);
  }
}

export const taskService = new TaskService();
