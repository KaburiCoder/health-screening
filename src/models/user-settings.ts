export interface UserSettings {
  clickDesk?: ClickDeskSettings;
  webApp?: WebAppSettings;
  questionnaire?: QuestionnaireSettings;
}

export interface ClickDeskSettings {
  use?: boolean;
}

export interface QuestionnaireSettings {
  use?: boolean;
  lockPw?: string;
}

export interface WebAppSettings {
  use?: boolean;
}
