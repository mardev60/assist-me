import { HelloMessageModel } from "./models/helloMessageModel";

export const getHelloWorld = (): HelloMessageModel => {
    return { message: "Hello, World!" };
};
