import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from 'src/challenges/interfaces/challenge-status.enum';

export class challengeStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    ChallengeStatus.ACCEPTED,
    ChallengeStatus.CANCELED,
    ChallengeStatus.DENIED,
    ChallengeStatus.PENDING,
    ChallengeStatus.DONE,
  ];

  transform(value: any) {
    console.log(value);
    const status = value.status.toUpperCase();

    if (!this.isStatusAllowed(status))
      throw new BadRequestException('Status informado não válido');

    return value;
  }

  private isStatusAllowed(value: any) {
    const hasStatus = this.allowedStatus.indexOf(value);
    return hasStatus !== -1;
  }
}
