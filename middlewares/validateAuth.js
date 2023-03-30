const { body, validationResult } = require('express-validator');

module.exports = [
    body('email')
        .if(body('email').exists())
        .isEmail().withMessage('Неверный адресс электронной почты'),
    body('name')
        .if(body('name').exists())
        .isLength({ min: 2 }).withMessage('Длина имени не может быть меньше 2')
        .isLength({ max: 15 }).withMessage('Длина имени не может быть больше 15'),
    body('lastname')
        .if(body('lastname').exists())
        .isLength({ min: 2 }).withMessage('Длина фамилии не может быть меньше 2')
        .isLength({ max: 15 }).withMessage('Длина фамилии не может быть больше 15'),
    body('password')
        .if(body('password').exists())
        .isLength({ min: 8 }).withMessage('Длина пароля не может быть меньше 8'),
    body('login')
        .if(body('login').exists())
        .isLength({ min: 5 }).withMessage('Длина логина не может быть меньше 5'),
    body('job')
        .if(body('job').exists())
        .isLength({ min: 2 }).withMessage('Длина должности не может быть меньше 2')
        .isLength({ max: 6 }).withMessage('Длина должности не может быть больше 6'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
];