/**
 * @typedef {{
    *    id: number,
    *    name: string,
    *    priority: number,
    *    subTasks: (TaskItemModel[] | []),
    *    isRepeating: boolean,
    *    hasReminder: boolean,
    *    hasNotes: boolean,
    *    due: {
    *      date: (string | null),
    *      time: (string | null)
    *    },
    *    project: {
    *      name: string,
    *      colour: string
    *    }
    *  }} TaskItemModel
    * */
   