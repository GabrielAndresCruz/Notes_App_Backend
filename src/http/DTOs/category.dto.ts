import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

// DTO validation to create a category based on entity fields.
export class CreateCategoryDTO {
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must be a string." })
  @MinLength(3, { message: "Name must be at least 3 characters." })
  @MaxLength(30, { message: "Name must not exceed 30 characters." })
  name: string;

  @IsOptional()
  @IsArray()
  notes: number[];
}

// DTO validation to update category. IsOptional makes field optional.
export class UpdateCategoryDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Name is required." })
  @IsString({ message: "Name must be a string." })
  @MinLength(3, { message: "Name must be at least 3 characters." })
  @MaxLength(30, { message: "Name must not exceed 30 characters." })
  name: string;
}
