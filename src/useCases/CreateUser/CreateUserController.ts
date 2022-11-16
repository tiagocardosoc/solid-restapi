import { Request, response, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

 export class CreateUserController {
    constructor (
        private createUserUseCase: CreateUserUseCase,
    ) {}

    async execute(req: Request, res: Response): Promise<Response> {
        const {name, email, password} = req.body;
        try {
            await this.createUserUseCase.execute({
                name,
                email, 
                password
            });

            return response.status(201).send();            
        } catch(e) {
            return response.status(400).json({
                message: e.message || 'Unexpected error.'
            })
        }
    }
 }