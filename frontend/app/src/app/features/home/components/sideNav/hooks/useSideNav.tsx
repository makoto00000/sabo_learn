import { useState } from "react";
import { SideNav } from "@/app/features/home/components/sideNav/types/sideNavType";

export default function useSideNav() {
  const [componentName, setComponentName] = useState<SideNav>("select");

  const handleComponent = (componentName: SideNav) => {
    setComponentName(componentName);
  };

  return {
    componentName,
    handleComponent,
  }
}