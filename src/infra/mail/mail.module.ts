import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailgunService } from './mailgun/mailgun.service';

@Module({
  providers: [MailService, MailgunService],
  exports: [MailService],
})
export class MailModule {}
