import { Button } from "./components/ui/button";
import TelegramOutlineIcon from "./icons/TelegramOutlineIcon";

function App() {
  return (
    <div className="flex flex-col justify-center items-center size-full">
      <Button className="">
        Написати в Телеграм <TelegramOutlineIcon />
      </Button>
    </div>
  );
}

export default App;
