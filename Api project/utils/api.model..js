export const CreateModel = async (Model, data, message) => {
    try {
        await Model.create(data);
        return { success: true, message };
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const SingleModel = async (Model, data, message) => {
    try {
        const checkRecord = await Model.findOne(data)
        if (checkRecord) {
            return { success: true, record: checkRecord }
        } else {
            return { success: false, message }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const UpdateModel = async (Model, field, data, message) => {
    try {
        const updateRecord = await Model.updateOne(
            field,
            data
        )
        if (updateRecord) {
            return { success: true, message }
        } else {
            return { success: false, message }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const SingleModelId = async (Model, data,exclude, message) => {
    try {
        const checkRecord = await Model.findById(data).select(exclude)
        if (checkRecord) {
            return { success: true, record: checkRecord }
        } else {
            return { success: false, message }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}

export const UpdateModelId = async (Model, field, data, message) => {
    try {
        const updateRecord = await Model.findByIdAndUpdate( field,data )
        if (updateRecord) {
            return { success: true, message }
        } else {
            return { success: false, message }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}