import { Controller, Get, Inject, OnModuleInit, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UserService {
  getUsers({}): Observable<any>;
  getUserById({ userId }): Observable<any>;
}

interface CredentialService {
  GetCredentials({}): Observable<any>;
}

@Controller('protousers')
export class ProtousersController implements OnModuleInit {
  private userService: UserService;
  private credentialService: CredentialService;

  constructor(@Inject('USERPROTO_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
    this.credentialService =
      this.client.getService<CredentialService>('CredentialService');
  }

  @Get()
  async getProtoUsers(@Query('id') id: string) {
    try {
      if (id) return this.userService.getUserById({ userId: id });
      return this.userService.getUsers(null);
    } catch (err) {
      console.log('Error internal Server error');
      return null;
    }
  }

  @Get('credential')
  async getProtoCredential() {
    return this.credentialService.GetCredentials(null);
  }
}
