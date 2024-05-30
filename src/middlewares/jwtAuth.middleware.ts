import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../utils";
import jwt from "jsonwebtoken"
import config from "config"
import { newRequest } from "../interfaces";
export class Authentication {
    authenticateAll(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            if (!token) {
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access!"
                })
            }
            const secretKey: string = config.get("SECRET_KEY")
            const decode = jwt.verify(token, secretKey)
            // console.log(decode)
            const userid = (decode as {userid:string}).userid
            const role = (decode as {role:string}).role
            req.userid = userid
            req.role = role
            next()
        } catch (error: any) {
            return res.status(ErrorCodes.internalServerError).json({
                success: false,
                message: `Error while authenticating user : ${error.message}`
            })
        }
    }
    authenticateUser(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            if (!token) {
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access!"
                })
            }
            const secretKey: string = config.get("SECRET_KEY")
            const decode = jwt.verify(token, secretKey)
            // console.log(decode)
            const userid = (decode as {userid:string}).userid
            const role = (decode as {role:string}).role
            if(role!="user"){
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access only users are allowed!"
                })
            }
            req.userid = userid
            req.role = role
            next()
        } catch (error: any) {
            return res.status(ErrorCodes.internalServerError).json({
                success: false,
                message: `Error while authenticating user : ${error.message}`
            })
        }
    }
    authenticateSuperAdmin(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            if (!token) {
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access!"
                })
            }
            const secretKey: string = config.get("SECRET_KEY")
            const decode = jwt.verify(token, secretKey)
            // console.log(decode)
            const userid = (decode as {userid:string}).userid
            const role = (decode as {role:string}).role
            if(role!="superadmin"){
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access only super admin is allowed!"
                })
            }
            req.userid = userid
            req.role = role
            next()
        } catch (error: any) {
            return res.status(ErrorCodes.internalServerError).json({
                success: false,
                message: `Error while authenticating user : ${error.message}`
            })
        }
    }
    authenticateDirector(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            if (!token) {
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access!"
                })
            }
            const secretKey: string = config.get("SECRET_KEY")
            const decode = jwt.verify(token, secretKey)
            // console.log(decode)
            const userid = (decode as {userid:string}).userid
            const role = (decode as {role:string}).role
            if(role!="director"){
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access only directors are allowed!"
                })
            }
            req.userid = userid
            req.role = role
            next()
        } catch (error: any) {
            return res.status(ErrorCodes.internalServerError).json({
                success: false,
                message: `Error while authenticating user : ${error.message}`
            })
        }
    }
    authenticateTheatreAdmin(req: newRequest, res: Response, next: NextFunction) {
        try {
            const { token } = req.cookies
            if (!token) {
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access!"
                })
            }
            const secretKey: string = config.get("SECRET_KEY")
            const decode = jwt.verify(token, secretKey)
            // console.log(decode)
            const userid = (decode as {userid:string}).userid
            const role = (decode as {role:string}).role
            if(role!="theatreadmin"){
                return res.status(ErrorCodes.unauthorized).json({
                    sucess: false,
                    message: "Unauthorized access only theatre admins are allowed!"
                })
            }
            req.userid = userid
            req.role = role
            next()
        } catch (error: any) {
            return res.status(ErrorCodes.internalServerError).json({
                success: false,
                message: `Error while authenticating user : ${error.message}`
            })
        }
    }
}