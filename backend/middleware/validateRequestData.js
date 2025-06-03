export const validateRequestData = (validator) => (req, res, next) => {
    const { error } = validator.validate(req.body);

    if (error) {
        const errors = error.details.map((e) => ({
            field: e.path.join("."),
            message: e.message.replace(/['"]/g, ""),
        }));
        return res.status(400).json({ errors });
    }
    next();
};
