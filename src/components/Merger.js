import Try from "./Try";
import Text from "./Text";
import "./Boxes.css";
import Boxwhite from "./Boxwhite";

export default function Merger() {
  return (
    <section className="sec-2">
      <Text />
      <article>
        <Try />
        <Boxwhite className="white_box" />
      </article>
    </section>
  );
}
