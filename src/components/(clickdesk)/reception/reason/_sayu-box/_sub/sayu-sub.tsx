import { Dot } from "lucide-react";

interface Props {
  text: string;
}
export const SayuSub = ({ text }: Props) => {
  return (
    <li className="relative flex items-center">
      <div className="flex items-center">
        <Dot className="min-w-6" />
        {text}
      </div>
    </li>
  );
};
