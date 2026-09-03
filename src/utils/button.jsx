
const Button = ({ children, onClick, type = "button", className="", loading=false, loadingChild="" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` rounded-lg  transition cursor-pointer font-bold px-4 py-2 uppercase  ${ className ? className : "bg-blue-500 text-white hover:bg-blue-600 w-full"}`}
    >
      {loading ? loadingChild : children}
    </button>
  );
};

export default Button;