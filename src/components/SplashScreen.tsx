import Logo from "./Logo";

export default function SplashScreen() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 w-full h-full">
      <div className="bg-white p-2 rounded-md">
        <Logo />
      </div>
    </div>
  );
}
