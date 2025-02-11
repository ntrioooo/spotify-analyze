import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="mx-auto max-w-7xl px-3 lg:p-0">{children}</div>;
};

export default Layout;
