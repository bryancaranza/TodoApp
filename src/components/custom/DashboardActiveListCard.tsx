import { TaskDetails } from "@/interface";
import { ROUTE } from "@/routes/routing";
import { format } from "date-fns/format";
import { Link } from "react-router-dom";

interface taskDetails {
  ongoingTask: TaskDetails;
}

const DashboardActiveListCard = ({ ongoingTask }: taskDetails) => {
  const ongoingTasks = ongoingTask.tasks;
  const doneTasks = ongoingTasks.filter((tsks: any) => tsks.done);
  const taskPercentage = (doneTasks.length / ongoingTasks.length) * 100;
  return (
    <div
      className={`rounded-md flex flex-col gap-1 px-4 py-2 shadow-md justify-between bg-white scroll w-[220px] h-[110px]`}
    >
      <div className="">
        <p className="text-slate-500 text-[12px]">#{ongoingTask.id}</p>

        <Link
          className="text-md font-semibold "
          to={`${ROUTE.VIEW}/${ongoingTask.id}`}
          reloadDocument
        >
          <div className="flex gap-1">
            <p className="text-md font-semibold truncate whitespace-nowrap break-all">
              {ongoingTask.title}
            </p>
            {/* <CheckCircleIcon className="w-4 fill-green-500" /> */}
          </div>
        </Link>
        <p className="text-[12px] text-slate-500">
          Until {format(ongoingTask.endDate, "MMM dd, yyy")}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-[5px] w-full bg-slate-200 rounded">
          <div
            className={`h-[5px] bg-slate-800 rounded`}
            style={{ width: `${taskPercentage}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-500">
          {taskPercentage.toFixed()}%
        </p>
      </div>
    </div>
  );
};

export default DashboardActiveListCard;
