import joi from 'joi'

export const registerUserValidation = (data) => {
    const userschema = joi.object({
        username: joi.string().alphanum().min(5).max(15).required(),
        password: joi.string().pattern(/^[a-zA-Z0-9]{8,15}$/).required(),
        email: joi.string()
                    .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net', 'uk']}}).required()
    })

    return userschema.validate(data)
}

export const userLoginValidation = (data) => {
    const userschema = joi.object({
        password: joi.string().pattern(/^[a-zA-Z0-9]{8,15}$/).required(),
        email: joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','uk']}}).required()
    })

    return userschema.validate(data)
}
