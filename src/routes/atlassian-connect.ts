import { Request, Response } from 'express';
import { connectAppDescriptor } from '../config';

export const connectDescriptorGet = async (_: Request, res: Response): Promise<void> => {
    res.status(200).json(connectAppDescriptor);
};