// src/auth/controllers/auth.controller
import { Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../../application/auth/services/auth.service';
import { Request } from 'express';
import { User } from '../../domain/models/user.model';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../infrastructure/auth/decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @UseGuards(AuthGuard('local'))
    @Public()
    @Post()
    login(@Req() request: Request){
        const user = request.user as User;
        return this.authService.generateJWT(user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Public()
    @Get('renew')
    renewToken(@Req() request: Request) {
        const user = request.user as User;
        return this.authService.generateJWT(user);
    }
}
