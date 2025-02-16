export enum Templates {
  FORGOT_PASSWORD = 'forgot-password',
  INVITE_COLLABORATOR = 'invite-collaborator',
}

export enum TokenAction {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  INVITE_COLLABORATOR = 'INVITE_COLLABORATOR',
}

export type SendMailDto = {
  to: string;
  subject: string;
  template: string;
  payload: any;
};
