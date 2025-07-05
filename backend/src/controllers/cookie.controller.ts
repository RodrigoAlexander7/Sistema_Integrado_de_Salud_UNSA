import { Request, Response } from 'express';
import { logger } from '../utils/logger';



export class CookieController{
   constructor(){
      this.returnStatus = this.returnStatus.bind(this)
   }

   async returnStatus(req: Request, res: Response): Promise<void>{
      try{
         const user = (req as any).auth;
         if(!user){
            res.status(401).json({
               succes:false,
               message:'Usuario no autenticado'
            })
            return
         } 

         res.json({
            succes:true,
            userId: user.sub,
            email:user.email
         })

      }catch(error: any){
         logger.error('error related to cookie.controller.ts')

         res.status(500).json({
            succes:false,
            message: 'Erroor:error related to cookie.controller.ts '
         })
      }

   }
}