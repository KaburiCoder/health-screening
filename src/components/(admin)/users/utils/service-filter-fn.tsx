import { UserSettings } from "@/models/user-settings";

interface Args {
  settings: UserSettings | undefined;
  value: string;
}

export const serviceFilterFn = ({ settings, value }: Args) => {
  return Object.keys(keywordMappings).some((settingKey) => {
    const setting = (settings as any)?.[settingKey]?.use;
    const keyword = keywordMappings[settingKey as keyof typeof keywordMappings];
    return setting && keyword.toLowerCase().includes(value?.toLowerCase());
  });
};

const keywordMappings = {
  clickDesk: "click desk",
  webApp: "web app",
  questionnaire: "문진표",
};
