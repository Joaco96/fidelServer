import QRCode from 'qrcode';
import { generateToken } from './jwtService';
import { UUID } from 'crypto';

export const getQr = async (data: string): Promise<string> => {    
    return await QRCode.toDataURL(data,{errorCorrectionLevel:"L", version: 9});
}

export const generateQr = (baseUrl: string, route: string, id: UUID): Promise<string> => {
    const jwt = generateToken({ id });
    const fullUrl = `${baseUrl}${route}/${jwt}`;
    return getQr(fullUrl);
}