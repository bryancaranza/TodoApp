import UserIcon from "@/assets/svg/UserIcon";

const Header = () => {
  const user = localStorage.getItem("user");

  return (
    <div>
      <div className="rounded-3xl bg-slate-900 text-white p-2 flex items-center shadow-md">
        <div className="rounded-full h-12 w-12 mx-4 border-2 p-2">
          <UserIcon />
        </div>
        <div>
          <p>Hello, List what you want To-do!</p>
          <h2 className="text-3xl font-semibold line-clamp-2">{user}</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
