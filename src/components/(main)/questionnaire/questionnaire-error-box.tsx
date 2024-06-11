import { useErrorStore } from "@/stores/error-store";
import {
  QuestionnaireErrorResult,
  useQuestionErrorStore,
} from "@/stores/questionnaire/question-error-store";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import { memo } from "react";
import ErrorBox from "../../error-box";
import { LifestyleKeys, QnKeys } from "@/stores/condition-store";
import { cn } from "@/lib/utils";

interface ErrorBoxProps<T> extends ChildrenProps {
  errorKeys: (keyof T)[];
  className?: string;
}

const _QuestionnaireErrorBox = ({
  errorKeys,
  children,
}: ErrorBoxProps<QuestionnaireErrorResult>) => {
  const error = useQuestionErrorStore((state) => state.error);
  const errorKey = error ? Object.keys(error)?.[0] : "";

  const isError = errorKeys.includes(
    errorKey as keyof QuestionnaireErrorResult,
  );

  return (
    <div className={isError ? "border-2 border-rose-300 px-1 pb-2 pt-0" : ""}>
      {children}
      {/* {isError && <div className="text-rose-500">{(error as any)[errorKey]}</div>} */}
    </div>
  );
};

interface CommonErrorBoxProps extends ErrorBoxProps<any> {
  selectedKey: string;  
}

const CommonErrorBox = ({
  selectedKey,
  errorKeys,
  children,
  className,
}: CommonErrorBoxProps) => {
  const selectedErrorKey = useErrorStore((state) => state.selectedKey);
  const error = useErrorStore((state) => state.error);
  const errorKey = error ? Object.keys(error)?.[0] : "";
  const isError =
    selectedKey === selectedErrorKey &&
    errorKey &&
    errorKeys.includes(errorKey as any);
  const errorMessage = isError ? (error as any)?.[errorKey] : undefined;
  return (
    <div className={cn(isError ? "pb-2 pt-0" : "", className)}>
      {children}
      <ErrorBox className="mt-2" errorMessage={errorMessage} />
    </div>
  );
};

interface QnErrorBoxProps extends ErrorBoxProps<any> {
  selectedKey: QnKeys | LifestyleKeys | "cancer";
}

export const QnErrorBox = (props: QnErrorBoxProps) => {
  return <CommonErrorBox {...props} />;
};

const QuestionnaireErrorBox = memo(_QuestionnaireErrorBox);
export { QuestionnaireErrorBox };
