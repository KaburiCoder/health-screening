export const selectMessage = (mark: string) => {
  return { "any.required": `${mark}번 항목을 선택해주세요.` };
};

export const inputMessage = (mark: string, kind?: string) => {
  return {
    "any.required": `${mark}번 ${kind ? `${kind} ` : ""}항목을 입력해주세요.`,
  };
};