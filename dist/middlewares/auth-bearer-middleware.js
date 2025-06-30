"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBearerMiddleware = void 0;
const AuthBearerMiddleware = (req, res, next) => {
    /* if (!req.headers.authorization) {return res.sendStatus(401)}
 
     const token = req.headers.authorization.split(' ')[1];
     const userId = await jwtService.getUserIdFromToken(token);
 
     if (userId){
         req.userId=await usersRepo.getUser(userId)
         return next()
     }
 
     return res.sendStatus(401)*/
};
exports.AuthBearerMiddleware = AuthBearerMiddleware;
