import { getRepository } from 'typeorm';
import Storage from '../models/Storage';

interface Request {
  filename: string;
  originalname: string;
  mimetype: string;
}

export default class StorageFileService {
  public async execute({
    filename,
    originalname,
    mimetype,
  }: Request): Promise<Storage> {
    const storageRepository = getRepository(Storage);

    const file = storageRepository.create({
      filename,
      original_name: originalname,
      mimetype,
    });

    await storageRepository.save(file);

    return file;
  }
}
