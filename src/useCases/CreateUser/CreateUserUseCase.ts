import { User } from "../../Entities/User";
import { IMailProvider } from "../../Providers/IMainProvider";
import { IUsersRepository } from "../../Repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository, // Liskov Substitution Principle
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        // Dependency Inversion Principle
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists.')
        };

        const user = new User(data);
        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
             from: {
                name: 'Equipe do meu app',
                email: 'equipe@meuapp.com',
             },
             subject: 'Seja bem-vindo à plataforma.',
             body: '<p> Você já pode fazer Login em nossa plataforma. </p>'
        })
    }
}