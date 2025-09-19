import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTareaDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsBoolean()
    @IsOptional()
    completada?: boolean;
}
