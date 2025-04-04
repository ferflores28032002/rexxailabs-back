import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export enum ProjectStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ProjectStatus)
  status!: ProjectStatus;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  deliveryDate!: string;

  @IsNotEmpty()
  clientId!: number;
}
