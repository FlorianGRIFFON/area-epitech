import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AutomationValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])      validateSteps,

   *    ```
   */
  public schema = schema.create({
    user_id: schema.number([rules.required(), rules.exists({ table: 'users', column: 'id' })]),
    name: schema.string({ trim: true }, [rules.required()]),
    description: schema.string({ trim: true }, [rules.required()]),
    steps: schema.array().members(
      schema.object().members({
        service: schema.string(),
        option: schema.string(),
      })
    ),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'user_id.required': 'User_id is required',
    'name.required': 'Name is required',
    'description.required': 'Description is required',
  }
}
