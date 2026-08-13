import { createSystem, defaultConfig, mergeConfigs } from "@chakra-ui/react";
import { configCores } from "./cores";
import { configGlobal } from "./global";

export const sistema = createSystem(
  defaultConfig,
  mergeConfigs(configCores, configGlobal),
);
