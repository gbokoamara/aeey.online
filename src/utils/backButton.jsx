import { CloudBackup, SkipBack, ArrowBigLeft } from "lucide-react";

const BackButton = ({
  href = "/home",
  className = "",
  iconSize = "w-6 h-6 md:w-7 md:h-7",
}) => {
  return (
    <a
      href={href}
      className={`absolute text-white flex gap-2 ${className}`}
    >
      <ArrowBigLeft className={iconSize} /> <span className="italic">Accueil</span>
    </a>
  );
};

export default BackButton;