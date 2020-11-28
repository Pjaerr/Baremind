type uuid = string; // A v4 unique id (EG: ff4cc7f9-dcdc-4feb-b000-cdf10bf40fcc)

type PriorityLevel = 0 | 1 | 2;

type DateString = string | null; // A date string (EG: 2020-09-25)

/** EG: 14:35:00 - null if no time is set, will be parsed as 00:00:00 in those scenarios */
type TimeString = string | null;

type DayOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Monday, Tuesday etc
type DayOfMonth = number; // 0...31
type NumberOfDays = number; // every 9 days...or every 2 years (730 days)

type Task = {
  id: uuid;
  name: string;
  priority: PriorityLevel;
  subTasks: Task[] | [];
  isSubTask: boolean;
  isRepeating: boolean;
  repeats: {
    type: "dayOfWeek" | "dayOfMonth" | "numberOfDays";
    frequency: DayOfWeek | DayOfMonth | NumberOfDays;
  };
  hasNote: boolean;
  hasDueTime: boolean;
  dueDate: DateString;
  dueTime: TimeString;

  project: {
    slug: string;
    name: string;
    color: string;
  };

  //Future properties (not needed for base functionality)
  hasReminder: boolean;
  reminder: {
    type: "before" | "at" | "recurring";
    when: number | TimeString; //before/recurring in minutes or exact time in TimeString
  } | null;
  timeBlocks: { start: TimeString; end: TimeString }[] | null;
};
