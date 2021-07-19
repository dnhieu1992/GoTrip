import { body } from 'express-validator';

export const propertyValidationRules = () => {
    return [
        body('propertyTypeId').notEmpty().withMessage("Property type id is required.")
    ]
}