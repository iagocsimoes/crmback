import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '@/domain/application/cryptography/encrypter';
export declare class JwtEncrypter implements Encrypter {
    private jwtService;
    constructor(jwtService: JwtService);
    encrypt(payload: Record<string, any>): Promise<string>;
}
