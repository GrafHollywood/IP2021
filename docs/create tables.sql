CREATE TABLE `valve_model` (
  `Model` varchar(20) NOT NULL,
  `Purpose` varchar(150) DEFAULT NULL,
  `Type_drive` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Model`)
);
CREATE TABLE `materials` (
  `Model` varchar(20) NOT NULL,
  `Main_Material` varchar(30) DEFAULT NULL,
  `Cap_Material` varchar(50) DEFAULT NULL,
  `Body_Material` varchar(50) DEFAULT NULL,
  `OilSeal_Material` varchar(50) DEFAULT NULL,
  `OilSealPack_Material` varchar(50) DEFAULT NULL,
  `Spindle_Material` varchar(50) DEFAULT NULL,
  `Sealer_Material` varchar(50) DEFAULT NULL,
  `Gasket_Material` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Model`),
  FOREIGN KEY (`Model`) REFERENCES `valve_model` (`Model`)
);
CREATE TABLE `execution` (
  `Execution` varchar(30) NOT NULL,
  `Model` varchar(20) DEFAULT NULL,
  `D` int(11) DEFAULT NULL,
  `L` int(11) DEFAULT NULL,
  `H` int(11) DEFAULT NULL,
  `Type_connect` varchar(20) DEFAULT NULL,
  `n_connect` int(11) DEFAULT NULL,
  `d_connect` int(11) DEFAULT NULL,
  `D1_connect` int(11) DEFAULT NULL,
  `D2_connect` int(11) DEFAULT NULL,
  `Weight` float DEFAULT NULL,
  PRIMARY KEY (`Execution`),
  FOREIGN KEY (`Model`) REFERENCES `valve_model` (`Model`)
);
CREATE TABLE `documents` (
  `Model` varchar(20) NOT NULL,
  `img` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Model`),
  FOREIGN KEY (`Model`) REFERENCES `valve_model` (`Model`)
);
CREATE TABLE `work_enviroment` (
  `Model` varchar(20) NOT NULL,
  `Work_Enviroment` varchar(150) DEFAULT NULL,
  `t_work_env_max` float DEFAULT NULL,
  `t_work_env_min` float DEFAULT NULL,
  `t_env_max` float DEFAULT NULL,
  `t_env_min` float DEFAULT NULL,
  `Pressure` double DEFAULT NULL,
  PRIMARY KEY (`Model`),
  FOREIGN KEY (`Model`) REFERENCES `valve_model` (`Model`)
);
CREATE TABLE `operating_conditions` (
  `Model` varchar(20) NOT NULL,
  `tightness_class` varchar(1) DEFAULT NULL,
  `climate_conditions` varchar(10) DEFAULT NULL,
  `warranty_operation` varchar(15) DEFAULT NULL,
  `warranty_storage` varchar(15) DEFAULT NULL,
  `warranty_time` varchar(15) DEFAULT NULL,
  `conservation` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Model`),
  FOREIGN KEY (`Model`) REFERENCES `valve_model` (`Model`),
  FOREIGN KEY (`tightness_class`) REFERENCES `tightness_class` (`Class`),
  FOREIGN KEY (`climate_conditions`) REFERENCES `climate_conditions` (`conditions`)
);
CREATE TABLE `tightness_class` (
  `Class` varchar(1) NOT NULL,
  `Water_leak` varchar(20) DEFAULT NULL,
  `Air_leak` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Class`)
);
CREATE TABLE `climate_conditions` (
  `conditions` varchar(10) NOT NULL,
  `t_work_max` int(11) DEFAULT NULL,
  `t_work_min` int(11) DEFAULT NULL,
  `t_cool_max` int(11) DEFAULT NULL,
  `t_cool_min` int(11) DEFAULT NULL,
  PRIMARY KEY (`conditions`)
);
CREATE TABLE `storage_conditions` (
  `Climate` varchar(10) NOT NULL,
  `t_max` int(11) DEFAULT NULL,
  `t_min` int(11) DEFAULT NULL,
  `Sun` tinyint(1) DEFAULT NULL,
  `Dust` tinyint(1) DEFAULT NULL,
  `Mold` tinyint(1) DEFAULT NULL,
  `Rain` int(11) DEFAULT NULL,
  PRIMARY KEY (`Climate`),
  FOREIGN KEY (`Climate`) REFERENCES `climate_conditions` (`conditions`)
);






