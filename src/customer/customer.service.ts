import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as Papa from 'papaparse';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CustomerService {
  create(createCustomerDto: CreateCustomerDto) {
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  test(file: File) {
    const filePath = join(process.cwd(), 'uploads', 'customer_data.csv');
    const fileStream = fs.createReadStream(filePath);
    const data = Papa.parse(fileStream, {
      header: true,
      complete: function (results) {
        console.log('Finished:', results.data);
      },
    });
    // console.log(data);
  }
  async createFileStream(file, uploadFolder?: string) {
    uploadFolder = uploadFolder || 'uploads';
    const fullUploadFolderPath = join(process.cwd(), uploadFolder);

    if (!fs.existsSync(fullUploadFolderPath)) {
      fs.mkdirSync(fullUploadFolderPath, { recursive: true });
    }

    const uploadFilePath = join(fullUploadFolderPath, file.originalname);
    console.log('uploadFilePath', uploadFilePath);

    fs.writeFileSync(uploadFilePath, file.buffer);

    const fileStream = fs.createReadStream(uploadFilePath);
    return fileStream;
  }
}
