import EmptyIcon from "@/assets/svg/EmptyIcon";
import DashboardActiveListCard from "@/components/custom/DashboardActiveListCard";
import DashboardTaskListCard from "@/components/custom/DashboardTaskListCard";
import Pulse from "@/components/custom/Pulse";
import { TaskDetails } from "@/interface";
import DashboardLayout from "@/layouts/DashboardLayout";
import { isWithinInterval } from "date-fns";
import { format } from "date-fns/format";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [taskList, setTaskList] = useState<TaskDetails[]>([]);
  const [ongoingTasksList, setOngoinTasksList] = useState<TaskDetails[]>([]);
  const today = new Date();
  const tasks = localStorage.getItem("tasks");

  useEffect(() => {
    setTaskList(JSON.parse(tasks!));
  }, [tasks]);

  useEffect(() => {
    const todayFormatted = format(today, "yyyy-MM-dd");
    const ongoingTasks = taskList?.filter((tsks) =>
      isWithinInterval(todayFormatted, {
        start: format(tsks.startDate, "yyyy-MM-dd"),
        end: format(tsks.endDate, "yyyy-MM-dd"),
      })
    );

    setOngoinTasksList(ongoingTasks);
  }, [taskList]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className=" font-bold">Active Tasks</p>
            {ongoingTasksList?.length ? (
              <Pulse text={ongoingTasksList.length} />
            ) : null}
          </div>
          <p className="font-bold text-base">{format(today, "MMM dd, yyy")}</p>
        </div>
        <div className=" overflow-auto w-full pb-2 px-1">
          <div className="grid grid-flow-col auto-cols-max gap-2">
            {ongoingTasksList?.map((ongoingTask: TaskDetails) => {
              return <DashboardActiveListCard ongoingTask={ongoingTask} />;
            })}
          </div>

          {!ongoingTasksList?.length && (
            <div className="w-full flex flex-col items-center justify-center">
              <EmptyIcon className="w-20 h-20" />
              <p className="text-sm font-semibold text-slate-500">No Result</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <p className=" font-bold">Task List</p>
          {taskList?.length ? (
            <span className="relative flex h-3 w-3">
              {/* <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-800 opacity-75"></span> */}

              <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-300">
                <div className="w-full h-full flex justify-center items-center text-[10px] font-semibold text-slate-600">
                  {taskList.length}
                </div>
              </span>
            </span>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          {taskList?.map((task) => {
            return <DashboardTaskListCard key={task?.id} cardDetails={task} />;
          })}
          {!taskList?.length && (
            <div className="w-full flex flex-col items-center justify-center">
              <EmptyIcon className="w-20 h-20" />
              <p className="text-sm font-semibold text-slate-500">No Result</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
