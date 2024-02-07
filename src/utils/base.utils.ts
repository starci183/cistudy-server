export const getEnvironmentString = (
    developmentValue: string,
    productionValue: string,
): string => {
    return process.env.NODE_ENV === "development"
        ? developmentValue
        : productionValue
}