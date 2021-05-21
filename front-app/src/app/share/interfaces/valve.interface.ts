import { Environment } from "./environment.interface";
import { Execution } from "./execution.interface";
import { Materials } from "./materials.interface";

export interface Valve {
    name: string; //марка клапана
    mainMaterial: string; //основной материал
    partMaterials?: Materials; //материалы отдельных компонентов
    execution?: Execution[]; //исполнения
    environment?: Environment; //рабочая среда
    typeDrive?: string; //тип привода
    purpose?: string; //назначение
}