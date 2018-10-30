export const updateObject = (oldObject, updatedPropertiesObj) => {
    return {
        ...oldObject,
        ...updatedPropertiesObj
    }
}