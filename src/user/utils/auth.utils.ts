import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import * as crypto from 'crypto';
import { promisify } from 'util';
import * as bcrypt from 'bcrypt';

export const generateOTP = () => {
  const digits = '1234567890';
  const otpLength = 4;
  let otp = '';
  const firstDigitIndex = Math.floor(Math.random() * (digits.length - 1));
  otp += digits[firstDigitIndex];
  for (let i = 1; i < otpLength; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
};

export const validateOTP = (OTP: number) => {
  const digitRegex = /^\d{4}$/;
  return digitRegex.test(OTP.toString());
};

export const formatPassword = async (password: string): Promise<string> => {
  const iv = randomBytes(16);
  const passkey = process.env.ENCRYPTION_KEY as string;
  const key = (await promisify(scrypt)(passkey, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const textToEncrypt = password;
  const encryptedText = Buffer.concat([cipher.update(textToEncrypt), cipher.final()]);
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(encryptedText, saltOrRounds);
  return hash;
};

export const encryptObject = async (data: any): Promise<string> => {
  const key = crypto.createHash('sha512').update(process.env.ENCRYPTION_KEY).digest('hex').substring(0, 32);
  const encryptionIV = crypto.createHash('sha512').update(process.env.ENCRYPTION_IV).digest('hex').substring(0, 16);
  const cipher = crypto.createCipheriv('aes-256-ctr', key, encryptionIV);
  return Buffer.from(cipher.update(JSON.stringify(data), 'utf8', 'hex') + cipher.final('hex')).toString('base64');
};

export const decryptObject = async (encryptedData: string): Promise<any> => {
  const key = crypto.createHash('sha512').update(process.env.ENCRYPTION_KEY).digest('hex').substring(0, 32);
  const encryptionIV = crypto.createHash('sha512').update(process.env.ENCRYPTION_IV).digest('hex').substring(0, 16);
  const buff = Buffer.from(encryptedData, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, encryptionIV);
  const decryptedData = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8');
  return JSON.parse(decryptedData);
};
