import { NextFunction, Request,Response } from "express";
import service from "./user_service"


export const create=async(
    req:Request|any,
    res:Response,
    next:NextFunction
):Promise<any>=>{
    try {
        const {db}=req.app.locals;
        console.log(req?.body)
        const data=await service.create(db,req?.body);
        return res.status(201).send({message:"user created successfully",data});

        
    } catch (error) {
        next(error)
        
    }
}


export const login=async (
    req:Request|any,
    res:Response,
    next:NextFunction
):Promise<any>=>{
    try {
        const {db}=req.app.local;
        const data=await service.login(db,req.body);
        return res.status(200).send({message:"user login successfully",data});


        
    } catch (error) {
        next(error)
        
    }

}


export const update=async (
    req:Request|any,
    res:Response,
    next:NextFunction
):Promise<any>=>{
    try {
        const {db}=req.app.local;
        const data=await service.update(db,req.body);
        return res.status(200).send({message:"user updated successfully",data});


        
    } catch (error) {
        next(error)
        
    }

}