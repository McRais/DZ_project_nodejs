import {Request, Response, NextFunction} from "express"
import {validationResult} from "express-validator";

export const validatorErrorsCatcher = (req:Request,res:Response,next:NextFunction) =>{
    const validationErrors = validationResult(req).formatWith((error) => ({
        message: error.msg,
        field: error.type === "field" ? error.path : "field is not found"
    }))

    if (!validationErrors.isEmpty()){
        if(validationErrors.array().includes({message: "incorrect id of blog", field: "blogId"})){
            const errorMessage = validationErrors.array({onlyFirstError:true})
            return res.status(404).json({errorsMessages: errorMessage})
        }
        const errorMessage = validationErrors.array({onlyFirstError:true})
        return res.status(400).json({errorsMessages: errorMessage})
    }

    return next()
}