export default function Logo() {
  return (
    <div className="flex flex-col gap-1 pointer-events-none select-none">
      <h1 className="font-semibold text-2xl leading-[19px]">
        Auto<span className="text-primary">Gram</span>
      </h1>
      <p className="opacity-60 font-medium">авто мрії тут і зараз</p>
    </div>
  );
}
