import { Request, Response } from 'express';
import StorageFileService from '../services/StorageFileService';

class StorageController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { filename, originalname, mimetype } = req.file;

    const storageFileService = new StorageFileService();

    const file = await storageFileService.execute({
      filename,
      originalname,
      mimetype,
    });

    return res.json({ file });
  };
}

export default new StorageController();
