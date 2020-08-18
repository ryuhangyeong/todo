import Schema from "validate";

export default (rules = {}, data) => {
    const schema = new Schema(rules);
    const error = schema.validate(data);

    if (error.length > 0) {
        const { path, message } = error[0];
        throw { path, message };
    }
};
