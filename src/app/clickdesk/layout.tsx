import { ClickdeskNav } from "@/components/(clickdesk)/clickdesk-nav";
import { Hero } from "@/components/hero";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import React from "react";

interface Props extends ChildrenProps {}

const ClickdeskLayout = ({ children }: Props) => {
  return (
    <Hero
      navComponent={<ClickdeskNav />}
      mainComponent={children}
      centerContent={<div>클릭소프트 의원</div>}
    />
  );
};

export default ClickdeskLayout;
