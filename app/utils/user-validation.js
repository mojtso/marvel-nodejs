import Joi from 'joi';

const email = Joi.string().email().required().label('Email');
const username = Joi.string().alphanum().alphanum().min(4).max(30).required().label('Username');
const password = Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/).label('Password')
                    .options({
                        language: {
                            string: {
                                regex: {
                                    base: 'must have at least one lowercase letterm one uppercase letter, one digit and one special character'
                                }
                            }
                        }
                    });