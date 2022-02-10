import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { IsEmail, validateSync } from "class-validator";

export class EmailValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        const email = new Email(value)
        const errors = validateSync(email)
        if(errors.length > 0){
            let messages = []
            errors.forEach(error => {
                Object.values(error.constraints).forEach(message => {
                    messages.push(message)
                })
            });
            throw new BadRequestException(messages)
        }
        return value
    }
}

class Email {

    constructor(email){
        this.email = email
    }

    @IsEmail()
    email = ''
}