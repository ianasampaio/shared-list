export enum Templates {
  FORGOT_PASSWORD = 'forgot-password',
}

export enum TokenAction {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export type SendMailDto = {
  to: string;
  subject: string;
  template: string;
  payload: any;
};
