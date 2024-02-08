import { appConfig } from "@config"

export const getEnvValue = (values: {
  development: string;
  production?: string;
}): string => {
    const { development, production } = values
    return appConfig().node === "production" ? production : development
}
