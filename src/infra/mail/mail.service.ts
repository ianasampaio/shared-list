import { Injectable } from '@nestjs/common';
import { MailgunService } from './mailgun/mailgun.service';
import { SendMailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailgunService: MailgunService) {}

  public async send(input: SendMailDto): Promise<void> {
    return this.mailgunService.send(input);
  }
}
