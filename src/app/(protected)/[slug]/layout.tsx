import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>Header goes here.</header>
      {children}
    </div>
  );
};

export default Layout;
