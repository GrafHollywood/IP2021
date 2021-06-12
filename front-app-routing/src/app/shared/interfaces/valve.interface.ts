export interface ValveShort {
    Model: string,
    Main_Material: string,
    Pressure: number,
    img: string
}

export interface ValveFull {
    Model: string,
    Purpose: string,
    Type_drive: string,
    Main_Material: string,
    Cap_Material: string,
    Body_Material: string,
    OilSeal_Material: string,
    OilSealPack_Material: string,
    Spindle_Material: string,
    Sealer_Material: string,
    Gasket_Material: string,
    Work_Enviroment: string,
    t_work_env: string,
    t_env: string,
    Pressure: number,
    img: string,
    tightness_class: string,
    climate_conditions: string,
    warranty_operation: string,
    warranty_storage: string,
    warranty_time: number,
    conservation: number
}