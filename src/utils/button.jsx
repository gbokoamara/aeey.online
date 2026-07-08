
const Button = ({ children, onClick, type = "button", className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` rounded-lg  transition cursor-pointer   ${ className ? className : "bg-blue-500 hover:bg-blue-600 w-full text-white px-4 py-2 "}`}
    >
      {children}
    </button>
  );
};

export default Button;