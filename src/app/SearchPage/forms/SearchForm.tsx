import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

export default function SearchForm() {
  return (
    <form>
      <RangeSlider
        id="range-input"
        onInput={(val) => {
          console.log(val);
        }}
      />
    </form>
  );
}
