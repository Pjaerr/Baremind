type uuid = string; // A v4 unique id (EG: ff4cc7f9-dcdc-4feb-b000-cdf10bf40fcc)

type PriorityLevel = 0 | 1 | 2;

type DateString = string | null; // A date string (EG: 2020-09-25)

/** EG: 14:35:00 - null if no time is set, will be parsed as 00:00:00 in those scenarios */
type TimeString = string | null;

type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Monday, Tuesday etc
type DayOfMonth = number; // 0...31
type NumberOfDays = number; // every 9 days...or every 2 years (730 days)

type TaskModel = {
  id: uuid;
  block: string; //null if not in a project
  name: string;
  priority: PriorityLevel;
  subTasks: Task[] | [];
  isSubTask: boolean; //Do we need to store the ID of the parent task?
  repeats: {
    type: "dayOfWeek" | "dayOfMonth" | "numberOfDays";
    frequency: DayOfWeek | DayOfMonth | NumberOfDays;
  } | null;
  hasNote: boolean;
  hasDueTime: boolean;
  dueDate: DateString;
  dueTime: TimeString;
  isCompleted: boolean;

  project: {
    slug: string;
    name: string;
    color: string;
  };

  //Future properties (not needed for base functionality)
  reminder: {
    type: "before" | "at" | "recurring";
    when: number | TimeString; //before/recurring in minutes or exact time in TimeString
  } | null;
  timeBlocks: { start: TimeString; end: TimeString }[] | null;
};
