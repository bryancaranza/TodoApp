import CalendarIcon from "@/assets/svg/CalendarIcon";
import CheckIcon from "@/assets/svg/CheckIcon";
import { TaskDetails } from "@/interface";
import { ROUTE } from "@/routes/routing";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Props {
  cardDetails: TaskDetails;
}

const DashboardTaskListCard = ({ cardDetails }: Props) => {
  const start = format(cardDetails.startDate, "dd MMM, yyy");
  const end = format(cardDetails.endDate, "dd MMM, yyy");
  const taskDetailsList = cardDetails.tasks;
  const inProgressTasks = taskDetailsList.filter(
    (tsks: any) => !tsks.done
  ).length;
  const doneTasks = taskDetailsList.filter((tsks: any) => tsks.done).length;

  return (
    <div className="rounded-md flex gap-2 px-4 py-2 shadow-md justify-between bg-white">
      <div className="flex flex-col">
        <Link
          className="text-md font-semibold "
          to={`${ROUTE.VIEW}/${cardDetails.id}`}
          reloadDocument
        >
          <div className="flex gap-1">
            <p className="truncate max-w-[200px]">{cardDetails.title}</p>
          </div>
        </Link>
        <p className="text-[12px] truncate max-w-[250px] text-gray-500">
          {cardDetails.tasks.length} Tasks
        </p>
        <div className="flex text-[12px] text-slate-500 gap-1">
          <CalendarIcon className="w-3" />
          <p className="text-[12px] text-slate-500">
            {start} to {end}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        {inProgressTasks === 0 ? (
          <div className="flex align-middle h-full">
            <CheckIcon className="w-4 fill-green-500" />
          </div>
        ) : (
          <div className="flex items-end align-bottom h-full gap-2">
            <p className="rounded-full bg-slate-800 px-2 text-slate-100 text-[10px]">
              {inProgressTasks} To-do
            </p>
            <p className="rounded-full bg-slate-500 px-2 text-slate-100 text-[10px]">
              {doneTasks} Done
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTaskListCard;
