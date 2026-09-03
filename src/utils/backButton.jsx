import { CloudBackup, SkipBack, ArrowBigLeft } from "lucide-react";

const BackButton = ({
  href = "/home",
  className = "",
  iconSize = "w-6 h-6 md:w-7 md:h-7",
  title="",
  show = true
}) => {
   if (!show) return null;
  return (
    <a
      href={href}
      className={`absolute text-black flex gap-2 ${className}`}
    >
      <ArrowBigLeft className={iconSize} /> <span className="font-bold font-serif ">{title}</span>
    </a>
  );
};

export default BackButton;