import { database } from "../database/database";
import { v4 as uuidv4 } from "uuid";

class TaskService {
  hasInitialised: boolean;

  constructor() {
    this.hasInitialised = false;
  }

  async initialise() {
    //Example task

    // this.add({
    //   name: "Feed the dogs",
    //   dueDate: "2020-11-28",
    //   hasDueTime: true,
    //   dueTime: "14:30:00",
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

  async getAllForDate(date) {
    if (this.hasInitialised) {
      const tasks = await database
        .getAll("tasks")
        .where("dueDate")
        .equals(date);

      return { tasks };
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
    isSubTask = false,
    repeats = null,
    hasNote = false,
    hasDueTime = false,
    dueDate = null,
    dueTime = null,
    isCompleted = false,
    project = null,
    reminder = null,
    timeBlocks = null,
  }: Partial<TaskModel>) {
    // Here we create a task with all the properties supplied, we then create it on the database but we don't wait for that to complete, instead we return the task so that the UI can be updated.
    const task: TaskModel = {
      id: uuidv4(),
      block,
      name,
      priority,
      subTasks,
      isSubTask,
      repeats,
      hasNote,
      hasDueTime,
      dueDate,
      dueTime,
      isCompleted,
      project,
      reminder,
      timeBlocks,
    };

    database.create("tasks", task);

    return task;
  }

  delete(id) {
    database.delete("tasks", id);
  }
}

export const taskService = new TaskService();
