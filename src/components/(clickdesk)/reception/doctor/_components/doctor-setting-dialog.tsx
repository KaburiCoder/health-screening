import { GridTitle } from "@/components/grid-title";
import { InputEx } from "@/components/index-ex";
import { LoadingOverlay } from "@/components/loading-overlay";
import { dayMappings } from "@/contants/doctor-constants";
import { ModalProps } from "@/lib/props/modal-props";
import { cn } from "@/lib/utils";
import { DoctorWorks } from "@/models/doctor-state";
import { TimeValue } from "@/models/time-value";
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  TimeInput,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { useDoctorSettingService } from "../_hooks/use-doctor-setting-service";
import { useDoctorSettingStates } from "../_hooks/use-doctor-setting-states";
import styles from "./doctor-grid.module.css";

interface Props extends ModalProps {
  id: string;
}

export const DoctorSettingDialog = ({ id, isOpen, onOpenChange }: Props) => {
  const { data, errResult, isPending, updatesDoctor } = useDoctorSettingService(
    {
      id,
      isOpen,
    },
  );
  const {
    works,
    name,
    kwamokName,
    jinchalName,
    handleSetWorks,
    setName,
    setKwamokName,
    setJinchalName,
    clearStates,
  } = useDoctorSettingStates();

  useEffect(() => {
    if (!isOpen) clearStates();
  }, [isOpen]);

  async function handlePress(onClose: () => void) {
    if (!data) return;

    const success = await updatesDoctor({
      name,
      jinchalName,
      kwamokName,
      works,
    });
    if (success) onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`진료의사 설정`}
              </ModalHeader>
              <ModalBody className="relative max-h-[35rem] overflow-y-auto">
                {isPending && <LoadingOverlay />}
                <div className={cn(styles.setting_grid, "gap-2")}>
                  <GridTitle>진료실코드</GridTitle>
                  <div className="flex items-center font-bold">
                    {data?.code}
                  </div>

                  <GridTitle>진료실명칭</GridTitle>
                  <InputEx
                    defaultValue={data?.jinchalName}
                    errorMessage={errResult?.error?.jinchalName}
                    onChange={setJinchalName}
                  />

                  <GridTitle>의사명</GridTitle>
                  <InputEx
                    defaultValue={data?.name}
                    errorMessage={errResult?.error?.name}
                    onChange={setName}
                  />

                  <GridTitle>과목</GridTitle>
                  <InputEx
                    defaultValue={data?.kwamokName}
                    errorMessage={errResult?.error?.kwamokName}
                    onChange={setKwamokName}
                  />

                  <GridTitle>진료시간설정</GridTitle>
                  <div className="grid grid-cols-3">
                    {dayMappings.map(([checkText, worksKey]) => (
                      <WorkingTimes
                        key={worksKey}
                        checkText={checkText}
                        worksKey={worksKey}
                        works={data?.works}
                        errorMessage={
                          errResult?.errors?.[0].path.includes(worksKey)
                            ? errResult.errors?.[0].message
                            : undefined
                        }
                        onChange={handleSetWorks}
                      />
                    ))}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  닫기
                </Button>
                <Button
                  color="primary"
                  onPress={handlePress.bind(null, onClose)}
                  isDisabled={isPending}
                >
                  저장
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

interface WorkingTimesProps {
  checkText: string;
  worksKey: keyof DoctorWorks;
  works: DoctorWorks | undefined;
  errorMessage: string | undefined;
  onChange: (
    key: keyof DoctorWorks,
    checked: boolean,
    start?: TimeValue | undefined,
    end?: TimeValue | undefined,
  ) => void;
}
const WorkingTimes = ({
  checkText,
  worksKey,
  works,
  errorMessage,
  onChange,
}: WorkingTimesProps) => {
  return (
    <>
      <WorkingTime
        startValue={works?.[worksKey]?.[0]?.start}
        endValue={works?.[worksKey]?.[0]?.end}
        checkText={checkText}
        onChange={onChange.bind(null, worksKey)}
      />
      {errorMessage && (
        <div className="col-span-3 text-center text-red-500">
          {errorMessage}
        </div>
      )}
    </>
  );
};

interface WorkingTimeProps {
  checkText: string;
  startValue?: TimeValue;
  endValue?: TimeValue;
  onChange: (checked: boolean, start?: TimeValue, end?: TimeValue) => void;
}

const WorkingTime = ({
  checkText,
  startValue,
  endValue,
  onChange,
}: WorkingTimeProps) => {
  const [checked, setChecked] = useState(false);
  const [start, setStart] = useState<TimeValue>();
  const [end, setEnd] = useState<TimeValue>();
  const firstRef = useRef<boolean>(true);
  function handleCheckChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setChecked(e.target.checked);
  }

  useEffect(() => {
    setStart(startValue);
    setEnd(endValue);
    setChecked(!!(startValue && endValue));
  }, [startValue, endValue]);

  useEffect(() => {
    setEnd(endValue);
  }, [endValue]);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    const newStart = start
      ? { hour: start.hour, minute: start.minute }
      : undefined;
    const newEnd = end ? { hour: end.hour, minute: end.minute } : undefined;

    onChange(checked, newStart, newEnd);
  }, [checked, start, end]);

  return (
    <>
      <Checkbox
        className="max-w-full justify-center"
        isSelected={checked}
        onChange={handleCheckChange}
      >
        {checkText}
      </Checkbox>
      <TimeInputEx isDisabled={!checked} value={start} onChange={setStart} />
      <TimeInputEx isDisabled={!checked} value={end} onChange={setEnd} />
    </>
  );
};

interface TimeInputExProps {
  isDisabled: boolean;
  value: TimeValue | undefined;
  onChange: (value: TimeValue) => void;
}
const TimeInputEx = ({ isDisabled, value, onChange }: TimeInputExProps) => {
  return (
    <TimeInput
      className="m-auto max-w-16"
      classNames={{ input: "justify-center" }}
      color="primary"
      variant="underlined"
      isDisabled={isDisabled}
      hourCycle={24}
      value={value as any}
      onChange={onChange}
    />
  );
};
