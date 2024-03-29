import { useAuth } from "../../hooks/useAuth";
import ErrorBox from "../Error/ErroBox";
import Textarea from "@mui/joy/Textarea";
import "./TextArea.scss";
function TextArea({
  placeholder,
  className,
  value,
  onChange,
  disabled = false,
  title,
  cols,
  name,
}) {
  const { error } = useAuth();
  return (
    <div>
      <Textarea
        name={name}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
        disabled={disabled}
        minRows={cols}
        error={error.title.includes(title)}
      />
      <ErrorBox title={title} />
    </div>
  );
}

export default TextArea;
