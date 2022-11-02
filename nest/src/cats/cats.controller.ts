import { Body, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CatsService } from './cats.service';
import { GetCurrentCatDto, ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { Cat } from './cats.entity';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService, private readonly authService: AuthService) {}

  @ApiResponse({ status: 500, description: 'Server Error..' })
  @ApiResponse({ status: 200, description: '성공', type: GetCurrentCatDto })
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    return cat;
  }

  @ApiResponse({ status: 500, description: 'Server Error..' })
  @ApiResponse({ status: 201, description: '성공', type: ReadOnlyCatDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiResponse({ status: 500, description: 'Server Error..' })
  @ApiResponse({ status: 201, description: '성공', type: LoginResponseDto })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload image';
  }
}
