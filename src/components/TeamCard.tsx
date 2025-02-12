import githubIcon from "../images/github.svg";
import linkedinIcon from "../images/linkedin.svg";

interface TeamCardProps {
  photo: string;
  name: string;
  linkedin: string;
  github: string;
}

export const TeamCard: React.FC<TeamCardProps> = (props) => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <img
        src={props.photo}
        className="h-45 w-45 rounded-full shadow-xl shadow-slate-400"
        alt=""
      />
      <h2 className="font-semibold text-center text-2xl text-slate-900 dark:text-white">
        {props.name}
      </h2>
      <p>Scholarship Compass</p>
      <nav>
        <ul className="flex gap-3">
          <li className="bg-emerald-900 text-white rounded-full p-2 cursor-pointer hover:bg-emerald-600 transition">
            <a href={props.linkedin} target="_blank">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </li>
          <li className="bg-emerald-900 text-white rounded-full p-2 cursor-pointer hover:bg-emerald-600 transition">
            <a href={props.github} target="_blank">
              <img src={githubIcon} alt="GitHub" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
