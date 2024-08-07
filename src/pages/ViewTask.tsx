import CaretLeftIcon from "@/assets/svg/CaretLeftIcon";
import PlusIcon from "@/assets/svg/PlusIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ROUTE } from "@/routes/routing";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "@/components/custom/DatePicker";
import { addDays } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Task, TaskDetails } from "@/interface";
import { CheckedState } from "@radix-ui/react-checkbox";
import DeleteIcon from "@/assets/svg/DeleteIcon";

const ViewTask = () => {
  const [selectedTask, setSelectedTask] = useState<TaskDetails>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({ id: "", task: "", done: false });

  const ls = localStorage.getItem("tasks");
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const lsDetails: TaskDetails[] = JSON.parse(ls!) || [];
    const selectedItem = lsDetails.filter(
      (selected) => selected?.id === params.id
    )?.[0];

    if (!selectedItem) {
      return navigate("*");
    }

    setTitle(selectedItem?.title || "");
    setDescription(selectedItem?.description || "");
    setStartDate((selectedItem?.startDate as Date) || new Date());
    setEndDate((selectedItem?.endDate as Date) || addDays(new Date(), 7));
    setTasks(selectedItem?.tasks);
    setSelectedTask(selectedItem);
  }, [ls]);

  return (
    <div className="flex flex-col gap-4 h-full justify-between overflow-x-auto scroll-hidden">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Button asChild variant="ghost" className="">
            <Link to={ROUTE.HOME} reloadDocument>
              <CaretLeftIcon className="fill-gray-800 w-4" />
            </Link>
          </Button>
          <p className="text-1xl font-semibold">{title}</p>
          <div className="w-[52px] flex justify-center">
            {/* <TaskIcon className="w-5" /> */}
          </div>
        </div>

        <div className="rounded-md px-4 py-2 shadow-md bg-white">
          <p className="text-[10px] font-semibold text-gray-500">Title</p>
          <Input
            className="border-none shadow-none px-0 py-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="rounded-md px-4 py-2 shadow-md bg-white">
          <p className="text-[10px] font-semibold text-gray-500">Description</p>
          <Textarea
            className="border-none shadow-none px-0 py-0"
            rows={6}
            value={description}
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
            {tasks?.map((_) => {
              return (
                <div key={_.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2  py-1">
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
              value={task?.task || ""}
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
              disabled={!task?.task.length}
              onClick={async () => {
                const newTaskList: Task[] | undefined = tasks.concat(task);
                await setTasks(
                  newTaskList.sort((a, b) => a.id.localeCompare(b.id))
                );
                await setTask({ id: "", task: "", done: false });
              }}
            >
              <PlusIcon className="w-[1rem]" />
            </Button>
          </div>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          const list: TaskDetails[] = JSON.parse(ls!) || [];
          const taskDetails: TaskDetails = {
            id: selectedTask?.id!,
            title,
            description,
            tasks,
            startDate: startDate!,
            endDate: endDate!,
          };

          const filteredTasks = list.filter(
            (tsk) => tsk.id !== selectedTask?.id
          );
          const newTaskList = JSON.stringify(
            filteredTasks.concat([taskDetails])
          );

          localStorage.setItem("tasks", newTaskList);
          document.location.href = ROUTE.HOME;
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default ViewTask;
