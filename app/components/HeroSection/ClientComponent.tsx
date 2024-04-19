"use client"

import CountUpNumber from "../CountUpNumber/CountUpNumber";
import React, { FC } from "react";

type Props = {
    heading1: React.ReactNode;
    section1: React.ReactNode;
}

const ClientComponent: FC<Props> = (props) => {
    const { heading1, section1 } = props
  return (
    <section className="container mx-auto flex items-center px-4 gap-12 ">
      <div className="py-10 h-full">
        {heading1}

        <div className="flex justify-between mt-12">
          <div className="flex items-center justtify-between flex-col gap-3">
            <p className="text-xs lg:text-center text-center">Basic Room</p>
            <CountUpNumber duration={3000} endValue={950} />
          </div>
          <div className="flex items-center justtify-between flex-col gap-3">
            <p className="text-xs lg:text-center text-center">Luxury Room</p>
            <CountUpNumber duration={4000} endValue={690} />
          </div>
          <div className="flex items-center justtify-between flex-col gap-3">
            <p className="text-xs lg:text-center text-center">Suite</p>
            <CountUpNumber duration={5000} endValue={400} />
          </div>
        </div>
      </div>

     {section1}
    </section>
  )
}

export default ClientComponent