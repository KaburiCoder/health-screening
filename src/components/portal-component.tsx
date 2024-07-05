import { useCSR } from "kbr-nextjs-shared/hooks";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import ReactDOM from "react-dom";

export const PortalComponent = ({
  id,
  children,
}: ChildrenProps & { id: "dialog-root" }) => {
  const { isCSR } = useCSR();
  if (!isCSR) return <></>;
  const portalRoot = document.getElementById(id);
  return ReactDOM.createPortal(children, portalRoot!);
};
