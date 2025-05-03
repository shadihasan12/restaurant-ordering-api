import {Request, RequestHandler} from 'express'
import {AwilixContainer} from "awilix";
import { User } from '@modules/auth/entities/user';
// import { User } from '@/modules/auth/entities/user';



export interface CommonRequest extends Request{
    loggedInUser:User
    container:AwilixContainer
    scope:AwilixContainer
    pagination?:{
        limit:number,
        offset:number
    }
    // filterableFields: Record<string, unknown>;
}