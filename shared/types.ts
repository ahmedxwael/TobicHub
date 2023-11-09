export type EmailRequestBodyType = {
  sender: string;
  receiver: string;
  subject: string;
};

export type UserSessionType = {
  name: string;
  email: string;
  image: string;
  id: string;
  admin: boolean;
};
