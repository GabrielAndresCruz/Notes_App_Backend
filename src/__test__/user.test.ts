import "../__mocks__/typeorm.mock";
import { createMockRepository, getRepository } from "../__mocks__/typeorm";
import { User } from "../database/entities/user.entity";

describe("User Entity", () => {
  it("should create a user", () => {
    const user = new User();
    user.username = "john_doe";
    user.email = "john@example.com";
    user.password = "secure_password";

    expect(user.username).toBe("john_doe");
    expect(user.email).toBe("john@example.com");
    expect(user.password).toBe("secure_password");
  });

  it("should save a user to the database", async () => {
    const user = new User();
    user.username = "john_doe";
    user.email = "john@example.com";
    user.password = "secure_password";

    const mockRepository = createMockRepository(User);
    mockRepository.save.mockResolvedValueOnce(user);

    const savedUser = await getRepository(User).save(user);

    expect(savedUser).toEqual(user);
    expect(mockRepository.save).toHaveBeenCalledWith(user);
  });
});
//
