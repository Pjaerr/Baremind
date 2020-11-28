import * as idb from "idb";
import { isValid } from "./utils";

class Database {
  constructor() {
    this.hasInitialised = false;
  }

  async initialise() {
    this.db = await idb.openDB("baremind-db", 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains("projects")) {
          db.createObjectStore("projects", { keyPath: "slug" });
        }

        //We generate this ID in the TaskService when a task is created
        if (!db.objectStoreNames.contains("tasks")) {
          const taskStore = db.createObjectStore("tasks", {
            keyPath: "id",
          });

          taskStore.createIndex("block", "block", { unique: false });
          taskStore.createIndex("dueDate", "dueDate", { unique: false });
        }

        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
        }
      },
    });

    this.hasInitialised = true;
  }

  async create(storeName, data) {
    if (this.hasInitialised) {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.store;

      if (!store) {
        throw new Error("Invalid storeName passed to Database.create");
      }

      //Here we are checking if the data passed in, matches the schema we actually want to store in the database. There's an argument to be made about not doing this, but we can discuss.
      if (!isValid(storeName, data)) {
        throw new Error("Invalid data passed to Database.create");
      }

      try {
        await store.add(data);
      } catch {
        //This entry already exists in the database, update it instead.
        return this.update(storeName, data);
      }

      return transaction.done;
    } else {
      throw new Error(
        "You're trying to use Database before calling .initialise()"
      );
    }
  }

  async update(storeName, data) {
    if (this.hasInitialised) {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.store;

      if (!store) {
        throw new Error("Invalid storeName passed to Database.create");
      }

      if (!Object.keys(data).includes(store.keyPath)) {
        throw new Error(
          "data passed to Database.update is missing an index property so we do not know which object to update in the database"
        );
      }

      await store.put(data);

      return transaction.done;
    } else {
      throw new Error(
        "You're trying to use Database before calling .initialise()"
      );
    }
  }

  async delete(storeName, index) {
    if (this.hasInitialised) {
      const transaction = this.db.transaction(storeName, "readwrite");
      const store = transaction.store;

      if (!store) {
        throw new Error("Invalid storeName passed to Database.delete");
      }

      await store.delete(index);

      return transaction.done;
    } else {
      throw new Error(
        "You're trying to use Database before calling .initialise()"
      );
    }
  }

  deleteAll(storeName) {
    if (this.hasInitialised) {
      return {
        where: (index) => {
          return {
            equals: async (value) => {
              const transaction = this.db.transaction(storeName, "readwrite");
              const store = transaction.store.index(index);

              if (!store) {
                throw new Error(
                  "Invalid storeName or index passed to Database.deleteAll"
                );
              }

              let cursor = await store.openCursor(IDBKeyRange.only(value));

              while (cursor) {
                cursor.delete();
                cursor = await cursor.continue();
              }
            },
          };
        },
      };
    } else {
      throw new Error(
        "You're trying to use Database before calling .initialise()"
      );
    }
  }

  async get(storeName, index) {
    if (this.hasInitialised) {
      //We can swap this for this.db.get() which does it under the hood for us as we are only doing a single thing here, keeping it like this for now so I have a reference.
      const transaction = this.db.transaction(storeName, "readonly");
      const store = transaction.store;

      if (!store) {
        throw new Error("Invalid storeName passed to Database.get");
      }

      return store.get(index);
    } else {
      throw new Error(
        "You're trying to use Database before calling .initialise()"
      );
    }
  }

  getAll(storeName) {
    if (this.hasInitialised) {
      return {
        where: (index) => {
          return {
            equals: async (value) => {
              //This is a shortcut that does all of the transaction stuff for us.
              return this.db.getAllFromIndex(
                storeName,
                index,
                IDBKeyRange.only(value)
              );
            },
            in: async (indices) => {
              const transaction = this.db.transaction(storeName, "readonly");
              const store = transaction.store;

              if (!store) {
                throw new Error("Invalid storeName passed to Database.get");
              }

              let objects = [];

              indices.forEach((index) => {
                objects.push(store.get(index));
              });

              return Promise.all(objects);
            },
          };
        },
        atOnce: async () => {
          const transaction = this.db.transaction(storeName, "readonly");
          const store = transaction.store;

          if (!store) {
            throw new Error(
              "Invalid storeName passed to Database.getAll.atOnce"
            );
          }

          return store.getAll();
        },
      };
    } else {
      throw new Error(
        "You're trying to use Database before calling .initialise()"
      );
    }
  }
}

export const database = new Database();
