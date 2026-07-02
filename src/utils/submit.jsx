

const SubmitButton = ({
  Chargement,
  children,
  onClick,
  type = "button",
  className,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        rounded-lg transition
        ${loading || disabled
          ? "opacity-70 cursor-aliasx"
          : "cursor-pointer"
        }
        ${
          className
            ? className
            : "bg-blue-500 hover:bg-blue-600 w-full text-white px-4 py-2"
        }
      `}
    >
      {loading ? Chargement : children}
    </button>
  );
};

export default SubmitButton;