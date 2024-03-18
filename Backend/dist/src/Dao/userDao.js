import executeQuery from "../db.js";
import * as queries from "../queries.js";
const findUser = async (username) => {
    const result = await executeQuery.executeQuery(queries.getUser, [username]);
    console.log(`Found ${username}`);
    console.log(result);
    return result;
};
const registerUser = async (username, passwordhash) => {
    const result = await executeQuery.executeQuery(queries.registerUser, [
        username,
        passwordhash,
    ]);
    return result;
};
const updateUser = async (username, passwordhash) => {
    const result = await executeQuery.executeQuery(queries.updateUser, [
        username,
        passwordhash,
    ]);
    return result;
};
export default { findUser, registerUser, updateUser };
