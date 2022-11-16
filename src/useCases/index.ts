import { MailTrapMailProvider } from "../Providers/Implementations/MailTrapMailProvider";
import { PostgresUsersRepository } from "../Repositories/Implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUser/CreateUserController";
import { CreateUserUseCase } from "./CreateUser/CreateUserUseCase";

const MailtrapMailProvider = new MailTrapMailProvider;
const postgresUsersRepository = new PostgresUsersRepository;

const createUserUseCase = new CreateUserUseCase(postgresUsersRepository, MailtrapMailProvider);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController }