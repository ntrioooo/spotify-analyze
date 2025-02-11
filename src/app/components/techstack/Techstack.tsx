import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiRedux,
  SiReactquery,
} from "react-icons/si";
import { MdOutlineArrowOutward } from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

const Techstack: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="space-x-2 mt-4">
        {techstacks.map((techstack) => (
          <Tooltip key={techstack.name}>
            <TooltipTrigger>
              <techstack.icon size={30} />
            </TooltipTrigger>
            <TooltipContent className="text-start">
              <div className="flex items-center hover:underline">
                <div className="font-semibold">
                  <Link
                    href={techstack.link || "#"}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex items-center"
                  >
                    {techstack.name}
                    <MdOutlineArrowOutward className="ms-1" />
                  </Link>
                </div>
              </div>

              <p>{techstack.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default Techstack;

export const techstacks = [
  {
    name: "React",
    icon: SiReact,
    description:
      "Underlying library of Next.js. I love the declarative approach and the ecosystem.",
    link: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    description:
      "Currently learning this framework because dynamic paths and built-in API",
  },
  {
    name: "Typescript",
    icon: SiTypescript,
    description:
      "Hard to use this but need to learn because of the type safety and intellisense.",
    link: "https://nextjs.org/",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    description: "Best CSS framework I have full control what I want",
    link: "https://tailwindcss.com/",
  },
  {
    name: "Redux",
    icon: SiRedux,
    description: "I am using this framework for state management",
    link: "https://redux.js.org/",
  },
  {
    name: "React Query",
    icon: SiReactquery,
    description: `I can't live without this library. It's the best library for fetching and caching data.`,
    link: "https://tanstack.com/query/latest/",
  },
];
