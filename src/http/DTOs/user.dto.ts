import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

const passwordRegEx = /^.{8,20}$/;

// DTO validation to create a user based on entity
export class RegisterUserDTO {
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must contain letters." })
  @MinLength(5, { message: "Name must have at least 5 characters." })
  @MaxLength(30, { message: "Name must not exceed 30 characters." })
  username: string;

  @IsEmail({}, { message: "Email is invalid." })
  @IsNotEmpty({ message: "Email is required." })
  @MaxLength(60, { message: "Email must not exceed 60 characters." })
  email: string;

  @Matches(passwordRegEx, {
    message: `Password must be between 8 and 20 characters long.`,
  })
  @IsNotEmpty({ message: "Password is required." })
  password: string;
}

// DTO validation to login a user. By app logic, username is not required.
export class LoginUserDTO {
  @IsEmail({}, { message: "Email is invalid." })
  @IsNotEmpty({ message: "Email is required." })
  email: string;

  @Matches(passwordRegEx, {
    message: `Password must be between 8 and 20 characters long.`,
  })
  @IsNotEmpty({ message: "Password is required." })
  password: string;
}

// DTO validation to update user. IsOptional makes fields optional.
export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must contain letters." })
  @MinLength(5, { message: "Name must have at least 5 characters." })
  @MaxLength(30, { message: "Name must not exceed 30 characters." })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: "Email is invalid." })
  @IsNotEmpty({ message: "Email is required." })
  @MaxLength(60, { message: "Email must not exceed 60 characters." })
  email: string;

  @IsOptional()
  @Matches(passwordRegEx, {
    message: `Password must be between 8 and 20 characters long.`,
  })
  @IsNotEmpty({ message: "Password is required." })
  password: string;
}
