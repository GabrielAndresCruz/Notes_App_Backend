import * as typeorm from "typeorm";
import { createMockRepository } from "./typeorm";

const typeormMock = jest.requireActual("typeorm");

jest.mock("typeorm", () => {
  return {
    ...typeormMock,
    ...typeorm,
    PrimaryGeneratedColumn: jest.fn(),
    OneToMany: jest.fn(),
    ManyToOne: jest.fn(),
    ManyToMany: jest.fn(),
    getRepository: jest.fn((entity) => createMockRepository(entity)),
  };
});
