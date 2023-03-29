import { IoIosInformationCircle } from "react-icons/io";
export default function Input_group(props) {
  return (
    <div className="input_design">
      <input
        placeholder={props.place}
        type={props.type}
        name={props.name}
        className={props.error ? "error" : props.className}
        value={props.value}
        onChange={props.onChange}
      ></input>
      <IoIosInformationCircle
        className={props.error ? "icon_red" : "icon_disapear"}
      />
      {props.error && <p className="errorq">{props.error}</p>}
    </div>
  );
}
