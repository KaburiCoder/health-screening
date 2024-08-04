export const paths = {
  root: "/",
  login: "/login",
  signin: "/signin",
  signup: "/signup",
  signout: "/signout",
  findPw: "/findpw",
  questionnaire: "/questionnaire",
  lifestyle: "/lifestyle",
  cancer: "/cancer",
  images: {
    eClickIco: "/images/eClick48x48.ico",
    mainLogo: "/images/main_logo.png",
  },
  changepw: (token: string) => `/${token}/changepw`,
  settings: (path: "lockpw") => `/settings/${path}`,
  success: (kind: string) => `/success?kind=${kind}`,
  adminSettings: (path: "common" | "users") => `/admin/settings/${path}`,
  clickdesk: {
    root: "/clickdesk",
    reception: function (path: "doctor" | "reason" | "hospinfo") {
      return `${this.root}/reception/${path}`
    },
  },
};

export const apiPaths = {
  adminSettings: "/admin-settings",
  adminSettingsFind: "/admin-settings/find",
  token: {
    validate: (token: string) => `/token/${token}/validate`
  },
  users: {
    root: "/users",
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    checkpw: (userId: string) => `/users/${userId}/checkpw`,
    changepw: (userId: string) => `/users/${userId}/changepw`,
    findpw: (userId: string) => `/users/${userId}/findpw`,
    changeEmail: "/users/change-email",
  },
  clickdesk: {
    doctor: "/clickdesk/doctor",
    doctorId: (id: string) => `/clickdesk/doctor/${id}`,
    doctorUpdate: (id: string) => `/clickdesk/doctor/${id}/update`,
    doctorSeq: "/clickdesk/doctor/seq",
    reason: "/clickdesk/reason",
    reasonAll: "/clickdesk/reason/all",
    reasonUpdate: (id: string) => `/clickdesk/reason/${id}/update`,
    reasonId: (id: string) => `/clickdesk/reason/${id}`,
  },
}