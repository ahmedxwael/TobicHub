export const urls = {
  home: "/",
  topics: {
    list: "/topics",
    view: (id: string) => `/topics/${id}`,
  },
  contactUs: "/contact-us",
  profile: {
    view: (id: string) => `/profile/${id}`,
    topics: (id: string) => `/profile/${id}/topics`,
    tasks: (id: string) => `/profile/${id}/tasks`,
  },
  dashboard: "/dashboard",
  register: "/register",
  privacyPolicy: "/privacy-policy",
};
