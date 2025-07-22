import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class NewPasswordValidator {
  public schema = schema.create({
    newPassword: schema.string({ trim: true }, [
      rules.minLength(8),
      rules.regex(/[a-z]/),
      rules.regex(/[A-Z]/),
      rules.regex(/[0-9]/),
    ]),
  })

  public messages: CustomMessages = {
    'newPassword.required': 'New password is required',
    'newPassword.minLength': 'Password must be at least 8 characters',
    'newPassword.regex':
      'Password must contain at least one uppercase letter, one lowercase letter, one number',
  }
}
