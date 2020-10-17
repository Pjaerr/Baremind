import { database } from "../database/database";

class ProjectService {
  constructor() {
    this.hasInitialised = false;
  }

  async initialise() {
    //Here we'd populate the local database with any projects from the network.
    //Because we don't have a backend yet, here we'll just pass in predefined projects.

    //Eventually when we are going to the network, if any of this fails, we want it to fail silently
    //This would ensure that the app can still work offline, but just using whatever data exists inside
    //the local database already.

    // await database.create("projects", {
    //   slug: "example-project",
    //   name: "Example Project",
    //   color: "#9b59b6",
    //   blocks: [],
    // });

    // await database.create("projects", {
    //   slug: "example-project-2",
    //   name: "Example Project 2",
    //   color: "#e67e22",
    //   blocks: [],
    // });

    // await database.create("projects", {
    //   slug: "window-cleaning",
    //   name: "Window Cleaning",
    //   color: "#7f8fa6",
    //   blocks: [],
    // });

    // await database.create("projects", {
    //   slug: "financial-reporting-legal-work",
    //   name: "Financial Reporting Legal Work",
    //   color: "#e1b12c",
    //   blocks: [],
    // });

    // await database.create("projects", {
    //   slug: "photography-course",
    //   name: "Photography Course",
    //   color: "#ff6b81",
    //   blocks: [],
    // });

    this.hasInitialised = true;
  }

  async getAll() {
    if (this.hasInitialised) {
      const projects = await database.getAll("projects").atOnce();

      return {
        projects,
      };
    } else {
      throw new Error(
        "You're trying to use ProjectService before calling .initialise()"
      );
    }
  }

  async get(slug) {
    if (this.hasInitialised) {
      const project = await database.get("projects", slug);

      if (!project) throw new Error("Project not found with that slug");

      return project;
    } else {
      throw new Error(
        "You're trying to use ProjectService before calling .initialise()"
      );
    }
  }

  async update(project) {
    return database.update("projects", project);
  }

  async add(project) {
    //When we eventually have a backend, we would await this first and then below it, make a request to create the project on the backend too.
    //There is no need to return this, but we can incase the caller wants to do something once the project has been sucessfully (or failed to be) created.

    //We should probably auto generate the slug based on the name here.
    // project.slug = project.name.replace()

    return database.create("projects", project);
  }

  async delete(slug) {
    await database.delete("projects", slug);
  }
}

export const projectService = new ProjectService();
