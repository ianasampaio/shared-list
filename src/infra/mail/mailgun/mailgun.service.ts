import { Injectable } from '@nestjs/common';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';
import { env } from 'src/shared/env';
import { SendMailDto } from '../mail.dto';

@Injectable()
export class MailgunService {
  private client: IMailgunClient;

  constructor() {
    const mailgun = new Mailgun(FormData);

    this.client = mailgun.client({
      username: 'api',
      key: env.mailgunKey,
    });
  }

  public async send(input: SendMailDto): Promise<void> {
    try {
      await this.client.messages.create(env.mailgunUrl, {
        from: env.mailServiceFrom,
        to: input.to,
        subject: input.subject,
        template: input.template,
        'h:X-Mailgun-Variables': JSON.stringify(input.payload),
      });
    } catch (error) {
      console.log('🚀 ~ failed to send email - error:', error);
    }
  }
}
