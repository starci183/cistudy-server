export const getEnvValue = (values: {
  development: string;
  production?: string;
}): string => {
    const { development, production } = values
    return process.env.NODE_ENV === "production" ? production : development
}
