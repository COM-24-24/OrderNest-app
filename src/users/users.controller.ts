import { 
    Controller,
    Patch,
    Get,
    Delete,
    Post,
    Body,
    Param,
    Request,
 } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'; 
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { Role } from 'src/auth/User Roles/roles.enum';
import { Roles } from 'src/auth/User Roles/roles.decorator';
import { RolesGuard } from 'src/auth/User Roles/roles.guard';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
    return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
    }

    @Get('email/:email')
    findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    @Roles(Role.Admin) // Only Admin can delete users
    remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
    }

  @Get()
  @Roles(Role.Admin) // Only Admin can access this route
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllUsers(@Request() req) {
    console.log('Accessed by user:', req.user);
    return { message: 'Protected route accessed' };
  }
}
