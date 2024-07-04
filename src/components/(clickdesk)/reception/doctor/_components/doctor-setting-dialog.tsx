import { LoadingOverlay } from "@/components/loading-overlay";
import { ModalProps } from "@/lib/props/modal-props";
import { apiPaths } from "@/paths";
import { getDoctor } from "@/services/clickdesk/doctor/get-doctor";
import styles from "./doctor-grid.module.css";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChildrenProps } from "kbr-nextjs-shared/props";
import { TimeValue } from "@/models/time-value";
import { DoctorWorks } from "@/models/doctor-state";
import { updateDoctor } from "@/services/clickdesk/doctor/update-doctor";
import { parseAxError } from "@/shared/error-result";
import { InputX } from "@/components/ui/input-x";
import { GridTitle } from "@/components/grid-title";
import { InputEx } from "@/components/index-ex";

const dayMappings: [string, keyof DoctorWorks][] = [
  ["월", "mon"],
  ["화", "tue"],
  ["수", "wed"],
  ["목", "thu"],
  ["금", "fri"],
  ["토", "sat"],
  ["일", "sun"],
];

interface Props extends ModalProps {
  id: string;
}

export const DoctorSettingDialog = ({ id, isOpen, onOpenChange }: Props) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryFn: () => getDoctor(id),
    queryKey: [apiPaths.clickdesk.doctorId(id), isOpen],
    enabled: isOpen,
  });
  const {
    data: updateData,
    error: updateError,
    mutateAsync,
  } = useMutation({
    mutationFn: updateDoctor,
    mutationKey: [apiPaths.clickdesk.doctorUpdate(id), isOpen],
  });
  const errResult = useMemo(() => parseAxError(updateError), [updateError]);
  const [works, setWorks] = useState<DoctorWorks>();
  const [name, setName] = useState<string>();
  const [kwamokName, setKwamokName] = useState<string>();
  const [jinchalName, setJinchalName] = useState<string>();

  useEffect(() => {
    if (!isOpen) {
      setWorks(undefined);
      setName(undefined);
      setKwamokName(undefined);
      setJinchalName(undefined);
    }
  }, [isOpen]);

  function handleWorkingTimeChange(
    key: keyof DoctorWorks,
    checked: boolean,
    start?: TimeValue | undefined,
    end?: TimeValue | undefined,
  ): void {
    if (start) {
      start = { hour: start.hour, minute: start.minute };
    }
    if (end) {
      end = { hour: end.hour, minute: end.minute };
    }

    setWorks((prev) => {
      const data: DoctorWorks | undefined = checked
        ? {
            [key]: [
              {
                start,
                end,
              },
            ],
          }
        : {
            [key]: undefined,
          };

      return { ...prev, ...data };
    });
  }

  async function handlePress(onClose: () => void) {
    if (!data) return;

    try {
      await mutateAsync({
        id: data.id,
        jinchalName:
          jinchalName === undefined || jinchalName === data.jinchalName
            ? undefined
            : jinchalName,
        kwamokName:
          kwamokName === undefined || kwamokName === data.kwamokName
            ? undefined
            : kwamokName,
        name: name === undefined || name === data.name ? undefined : name,
        works,
      });

      queryClient.invalidateQueries({ queryKey: [apiPaths.clickdesk.doctor] });
      onClose();
    } catch {} // 훅에서 에러처리
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
                        onChange={handleWorkingTimeChange}
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
    onChange(checked, start, end);
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
