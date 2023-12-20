import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User as UserModel } from "@prisma/client";

@Controller('user')
export class UserController {
    constructor(private userS:UserService) { }

    @Get(':id')
    async getUserById(@Param('id') id:string):Promise<UserModel>{
        return this.userS.getUserById({id:Number(id)});
    }

    @Get('/page/:page')
    async getAllUsers(@Param('page') page:number):Promise<UserModel[]>{
        return this.userS.getAllUsers({
            skip:page*10,
            take:10,
        });
    }

    @Post()
    async createUser(
        @Body() userData:{name?:string, email:string}
    ):Promise<UserModel>{
        return this.userS.createUser(userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id:string):Promise<UserModel>{
        return this.userS.deleteUser({id:Number(id)});
    }
}