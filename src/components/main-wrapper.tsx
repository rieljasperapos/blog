import React, { ReactNode } from "react";
const MainWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="lg:mx-32">
      {children}
    </div>
  )
}

export default MainWrapper;