import BigCheckBox from "@/components/big-check-box";
import { CancerPresence } from "@/stores/cancer/cancer-store";

interface CancerCheckBoxesProps {
  nKeyObj: { nKey: string; text: string }[];
  nObj: { [key: string]: string } | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHasChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CancerCheckBoxes = ({
  nKeyObj,
  nObj,
  onChange,
  onHasChange,
}: CancerCheckBoxesProps) => {
  return (
    <div className="flex gap-2">
      <BigCheckBox
        isSelected={nObj?.has === CancerPresence.무}
        value="has"
        className="w-auto flex-shrink-0 border-slate-300"
        onChange={onHasChange}
      >
        없음
      </BigCheckBox>

      <div className="flex flex-wrap gap-2">
        {nKeyObj
          .filter((k) => k.nKey !== "has")
          .map(({ nKey, text }) => (
            <BigCheckBox
              key={nKey}
              isSelected={nObj?.[nKey] === CancerPresence.유}
              value={nKey}
              className="w-auto"
              onChange={onChange}
            >
              {text}
            </BigCheckBox>
          ))}
      </div>
    </div>
  );
};
