import { GridTitle } from "@/components/grid-title";
import { InputEx } from "@/components/index-ex";
import { LoadingOverlay } from "@/components/loading-overlay";
import { dayMappings } from "@/contants/doctor-constants";
import { ModalProps } from "@/lib/props/modal-props";
import { cn } from "@/lib/utils";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useDoctorSettingService } from "../_hooks/use-doctor-setting-service";
import { useDoctorSettingStates } from "../_hooks/use-doctor-setting-states";
import { WorkingTimes } from "./WorkingTimes";
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
  } = useDoctorSettingStates({ works: data?.works });

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

  console.log(works);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent className="max-w-[35rem]">
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
                  <div className="grid grid-cols-5">
                    {dayMappings.map(([checkText, worksKey]) => (
                      <WorkingTimes
                        key={worksKey}
                        checkText={checkText}
                        timeRanges={data?.works?.[worksKey]}
                        errorMessage={
                          errResult?.error?.[worksKey] ||
                          (errResult?.errors?.[0].path.includes(worksKey)
                            ? errResult.errors?.[0].message
                            : undefined)
                        }
                        onChange={(checked, value) => {
                          handleSetWorks(worksKey, checked, value);
                        }}
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
