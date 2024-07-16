interface Props {
  text?: string | number | undefined;
}

const Pulse = ({ text }: Props) => {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-800 opacity-75"></span>

      <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900">
        <div className="w-full h-full flex justify-center items-center text-[10px] text-slate-200">
          {text}
        </div>
      </span>
    </span>
  );
};

export default Pulse;
