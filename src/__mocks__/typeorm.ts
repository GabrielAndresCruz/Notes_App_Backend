import { EntityTarget, Repository } from "typeorm";

// Define an interface for the mock repository
interface MockRepository<T> {
  save: jest.Mock<Promise<T>>;
  find: jest.Mock;
  // Add any other methods you need to mock
}

// Define a function to create a mock repository
export function createMockRepository<T>(
  entity: EntityTarget<T>
): MockRepository<T> {
  return {
    save: jest.fn((entity: T) => Promise.resolve(entity)),
    find: jest.fn(),
    // Add any other methods you need to mock
  };
}

// Mock 'getRepository' function from TypeORM
export const getRepository = jest.fn(
  (entity: EntityTarget<any>) =>
    createMockRepository(entity) as unknown as Repository<any>
);
