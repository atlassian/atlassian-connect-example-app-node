import { Request, Response } from "express";
import { connectAppDescriptor } from "../config";
import { baseUrl } from "../utils";

export const connectDescriptorGet = async (_: Request, res: Response): Promise<void> => {
    const appUrl = { baseUrl: await baseUrl() };
    res.status(200).json(connectAppDescriptor(appUrl));
};