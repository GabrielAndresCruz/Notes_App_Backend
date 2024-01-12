// Mocks a TypeORM repository with two mocked methods.
export const mockRepository = {
  save: jest.fn(),
  find: jest.fn(),
};

// Mocks 'getRepository' function from TypeORM.
export const getRepository = jest.fn(() => mockRepository);
