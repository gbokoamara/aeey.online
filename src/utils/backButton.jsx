import { SkipBack } from "lucide-react";

const BackButton = ({
  href = "/home",
  className = "",
  iconSize = "w-6 h-6 md:w-9 md:h-9",
}) => {
  return (
    <a
      href={href}
      className={`absolute text-white ${className}`}
    >
      <SkipBack className={iconSize} />
    </a>
  );
};

export default BackButton;