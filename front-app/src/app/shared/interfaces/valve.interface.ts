export interface ValveShort {
    Model: string,
    Main_Material: string,
    Pressure: number,
    img: string,
    DN: number[]
}

export interface ValveFull {
    Model: string,
    Purpose: string,
    Type_drive: string,
    //материалы
    Main_Material: string,
    Cap_Material: string,
    Body_Material: string,
    OilSeal_Material: string,
    OilSealPack_Material: string,
    Spindle_Material: string,
    Sealer_Material: string,
    Gasket_Material: string,
    //рабочая среда
    Work_Enviroment: string,
    t_work_env_max: number,
    t_work_env_min: number,
    t_env_max: number,
    t_env_min: number,
    Pressure: number,
    tightness_class: string,
    climate_conditions: string,
    warranty_operation: string,
    warranty_storage: string,
    warranty_time: number,
    conservation: number
    //документы и файлы
    img: string,
}