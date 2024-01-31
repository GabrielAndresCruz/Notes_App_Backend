import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

// DTO validation to create a note based on entity requirements.
export class CreateNoteDTO {
  @IsNotEmpty({ message: "Title is required." })
  @IsString({ message: "Title must be a string." })
  @MinLength(3, { message: "Title must be at least 3 characters." })
  @MaxLength(30, { message: "Title must not exceed 30 characters." })
  title: string;

  @IsNotEmpty({ message: "Title is required." })
  @IsString({ message: "Title must be a string." })
  @MaxLength(500, { message: "Content must not exceed 500 characters." })
  content: string;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsArray({ message: "Category must be an array." })
  @IsOptional()
  category: number[];
}

// DTO validation to update a note. IsOptional function makes fields optional.
export class UpdateNoteDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Title is required." })
  @IsString({ message: "Title must be a string." })
  @MaxLength(30, { message: "Title must not exceed 30 characters." })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: "Title is required." })
  @IsString({ message: "Title must be a string." })
  @MaxLength(500, { message: "Content must not exceed 500 characters." })
  content: string;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @IsArray({ message: "Category must be an array." })
  category: number[];
}
