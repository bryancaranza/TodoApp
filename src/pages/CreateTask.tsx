import CaretLeftIcon from "@/assets/svg/CaretLeftIcon";
import PlusIcon from "@/assets/svg/PlusIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROUTE } from "@/routes/routing";
import { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker } from "@/components/custom/DatePicker";
import { addDays } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/interface";
import { CheckedState } from "@radix-ui/react-checkbox";
import DeleteIcon from "@/assets/svg/DeleteIcon";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    addDays(new Date(), 7)
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ id: "", task: "", done: false });

  const ls = localStorage.getItem("tasks");

  return (
    <div className="flex flex-col gap-4 h-full justify-between overflow-x-auto scroll-hidden">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Button asChild variant="ghost" className="">
            <Link to={ROUTE.HOME} reloadDocument>
              <CaretLeftIcon className="fill-gray-800 w-4" />
            </Link>
          </Button>
          <p className="text-1xl font-semibold">Add New Task</p>
          <div className="w-[52px] flex justify-center">
            {/* <TaskIcon className="w-5" /> */}
          </div>
        </div>

        <div className="rounded-md px-4 py-2 shadow-md bg-white">
          <p className="text-[10px] font-semibold text-gray-500">Title</p>
          <Input
            className="border-none shadow-none px-0 py-0"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="rounded-md px-4 py-2 shadow-md bg-white">
          <p className="text-[10px] font-semibold text-gray-500">Description</p>
          <Textarea
            className="border-none shadow-none px-0 py-0"
            rows={6}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="rounded-md flex gap-2 px-4 py-2 shadow-md bg-white">
          <div className="w-full">
            <p className="text-[10px] font-semibold text-gray-500">
              Start Date
            </p>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="w-full">
            <p className="text-[10px] font-semibold text-gray-500">End Date</p>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </div>

        <div className="rounded-md flex flex-col gap-2 px-4 py-2 shadow-md bg-white">
          <p className="text-[10px] font-semibold text-gray-500">Task List</p>
          <div className="flex flex-col gap-2">
            {tasks.map((_) => {
              return (
                <div key={_.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={_.id}
                      checked={_.done}
                      onCheckedChange={(checked: CheckedState) => {
                        const filteredTask: Task = tasks
                          .filter((tsk) => tsk.id === _.id)
                          .map((tsk) => {
                            return {
                              id: tsk.id,
                              done: checked as boolean,
                              task: tsk.task,
                            };
                          })[0];
                        const removeTask = tasks.filter(
                          (tsk) => tsk.id !== _.id
                        );

                        const newTaskList: Task[] =
                          removeTask.concat(filteredTask);
                        setTasks(
                          newTaskList.sort((a, b) => a.id.localeCompare(b.id))
                        );
                      }}
                    />
                    <p className="text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {_.task}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      const filteredTasks = tasks.filter(
                        (tsk) => tsk.id !== _.id
                      );
                      setTasks(filteredTasks);
                    }}
                  >
                    <DeleteIcon className="w-4" />{" "}
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              className="w-full"
              value={task?.task}
              onChange={(e) =>
                setTask({
                  id: Math.floor(100000 + Math.random() * 900000).toFixed(),
                  task: e.target.value,
                  done: false,
                })
              }
            />
            <Button
              variant="outline"
              className="w-full"
              disabled={!task.task.length}
              onClick={async () => {
                const newTaskList: Task[] | undefined = tasks.concat(task);
                await setTasks(
                  newTaskList.sort((a, b) => a.id.localeCompare(b.id))
                );
                await setTask({ id: "", task: "", done: false });
              }}
            >
              <PlusIcon className="w-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          const list = JSON.parse(ls!) || [];
          const taskDetails = {
            id: Math.floor(100000 + Math.random() * 900000).toFixed(),
            title,
            description,
            tasks,
            startDate,
            endDate,
          };
          const newTaskList = JSON.stringify(list.concat([taskDetails]));
          console.log(list.concat([taskDetails]));

          localStorage.setItem("tasks", newTaskList);
          document.location.href = ROUTE.HOME;
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default CreateTask;
