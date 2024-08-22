export type AppData = {
  templateList: MailTemplate[];
};

export type MailTemplate = {
  id: string;
  subject: string;
  toList: string[];
  ccList: string[];
  bccList: string[];
  body: string;
  tipList: string[];
};

export const defaultAppData: AppData = {
  templateList: [],
};

export const createTemplate = (): MailTemplate => {
  return {
    id: crypto.randomUUID(),
    subject: 'no subject',
    toList: [],
    ccList: [],
    bccList: [],
    body: '',
    tipList: [],
  };
};
