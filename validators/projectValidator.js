const { body } = require('express-validator')


exports.validateCreateProject = [
    body('nom').trim().notEmpty().withMessage('Le nom du projet est obligatire')
                .isLength({ min: 2 }).withMessage('Min 2 caractéres'),
    body('description').trim().notEmpty().withMessage('la description doit etre obligatoire')
                .isLength({ max: 255 }).withMessage('description trop longue')          
]
