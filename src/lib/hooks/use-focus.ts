import { scrollById } from "@/lib/utils/scroll.util";

export const useFocus = () => {
  function focusById(id: string) {
    const item = document.getElementById(id)
    item?.focus()
  }

  function focusDelay(id: string) {
    setTimeout(() => focusById(id), 100)
  }

  function scrollToFocus(id: string) {
    return scrollById(id, 55);
  }

  function scrollToError(id: string) {
    return scrollById(id, 120);
  }

  const conditions = {
    weekday: (value: number | undefined) => value ? value >= 0 && value <= 7 : false,
    hour: (value: number | undefined) => (value ?? 0) >= 3,
    minute: (value: number | undefined) => (value ?? 0) >= 7,
    month: (value: number | undefined) => (value ?? 0) >= 4,
    year: (value: number | undefined) => (value ?? 0) >= 37,
    twoDigit: (value: number | undefined) => (value ?? 0) >= 10,
  }

  function setValue(
    prevValue: any,
    setFunc: (value: any) => void,
    toScrollId: string,
    value: any,
  ) {
    if (prevValue !== value) {
      setFunc(value);
      scrollById(toScrollId);
    }
  }

  function setValueTrg(prevValue: any, setFunc: (value: any) => void, { focus, scroll }: SetValueCdtArgs, value: any) {
    if (prevValue === value) return;

    setFunc(value);
    if (value === scroll.trigger) {
      scrollById(scroll.id);
    } else if (value === focus.trigger) {
      focusDelay(focus.id);
    }
  }

  function setNumValueTrg(
    prevValue: number | undefined,
    setFunc: (value: number | undefined) => void,
    { focus, scroll, blur }: NumConditionArgs,
    value: number | undefined) {
    if (prevValue === value) return;

    setFunc(value);

    const handleAction = (action: NumCondition | undefined, actionById: (id: string) => void) => {
      if (action?.condition(value)) {
        actionById(action.id);
        if (blur) document.getElementById(blur.id)?.blur();
      }
    }

    handleAction(scroll, scrollById)
    handleAction(focus, focusById)
  }

  return { conditions, scrollToError, focusById, scrollToFocus, focusDelay, setValue, setValueTrg, setNumValueTrg }
}

interface Trigger {
  id: string;
  trigger: any;
}

interface SetValueCdtArgs {
  focus: Trigger;
  scroll: Trigger;
}

interface NumCondition {
  id: string;
  condition: (value: number | undefined) => boolean;
}
interface NumConditionArgs {
  focus?: NumCondition;
  scroll?: NumCondition;
  blur?: {
    id: string;
  }
}