import { ObjectSchema } from "joi";
import { Request, Response, NextFunction, RequestHandler } from "express";

export const validateRequestData =
    (validator: ObjectSchema): RequestHandler =>
    (req: Request, res: Response, next: NextFunction): void => {
        const { error } = validator.validate(req.body);

        if (error) {
            const errors = error.details.map((e) => ({
                field: e.path.join("."),
                message: e.message.replace(/['"]/g, ""),
            }));
            res.status(400).json({ errors });
            return;
        }
        next();
    };
