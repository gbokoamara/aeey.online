
const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2  rounded-lg  transition cursor-pointer ${ className ? className : "bg-blue-500 hover:bg-blue-600 w-full text-white"}`}
    >
      {children}
    </button>
  );
};

export default Button;