
const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  required,
  className = "",
  textarea = false,
  rows = 4,
  ...props
}) => {
  const inputClass =
    ` flex text-center w-full px-4 py-2 border-2 border-gray-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 ${className}`;

  if (textarea) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={inputClass}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={inputClass}
      {...props}
    />
  );
};

export default Input;