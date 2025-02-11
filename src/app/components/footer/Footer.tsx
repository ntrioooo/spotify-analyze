import Link from 'next/link';
import { SiLinkedin } from 'react-icons/si';
import { SiGithub } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center justify-between">
          <div className="flex mt-4 space-x-4 justify-center sm:justify-start sm:mt-0">
            {connectFooter.map((connect) => (
              <Link
                key={connect.name}
                href={connect.link}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <connect.icon className="w-6 h-6" />
                <span className="sr-only">{connect.name}</span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center dark:text-gray-400 mt-4 sm:mt-0 sm:block">
            Copyright © 2025 ntriodev. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const connectFooter = [
  {
    name: 'LinkedIn',
    icon: SiLinkedin,
    link: 'https://www.linkedin.com/in/trionugroho/',
  },
  {
    name: 'Github',
    icon: SiGithub,
    link: 'https://github.com/ntrioooo',
  },
];

export default Footer;
