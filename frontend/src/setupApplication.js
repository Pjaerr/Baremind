import { database } from "database";
import { projectService } from "services/project";
import { taskService } from "services/task";

export default async function setupApplication() {
  await database.initialise();
  await projectService.initialise();
  await taskService.initialise();
}
