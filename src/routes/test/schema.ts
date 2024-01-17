import { JSONSchemaType } from 'ajv'
import { IReqBody } from './interfaces'

export const testSchema: JSONSchemaType<IReqBody> = {
	type: 'object',
	properties: {
		username: {
			type: 'string',
			format: 'email',
			isNotEmpty: true
		},
		password: {
			type: 'string',
			isNotEmpty: true
		},
	},
	required: [
		'username',
		'password',
	],
	additionalProperties: false

}