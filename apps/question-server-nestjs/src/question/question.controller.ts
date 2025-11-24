import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { QuestionDto } from 'src/question/dto/question.dto';
import { QuestionService } from './question.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('question')
export class QuestionController {
    // 依赖注入
    constructor(private readonly questionService: QuestionService) { }

    // @Get('test')
    // getTest(): string {
    //     throw new HttpException('数据获取失败', HttpStatus.BAD_REQUEST)
    // }

    @Get()
    async findAll(
        @Query('keyword') keyword: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('isDeleted') isDeleted: boolean = false,
        @Query('isStar') isStar: boolean,
        @Request() req,
    ) {
        const { username } = req.user
        const list = await this.questionService.findAllList({
            keyword,
            page,
            pageSize,
            isDeleted,
            isStar,
            author: username
        });
        const count = await this.questionService.countAll({
            keyword,
            author: username,
            isDeleted,
            isStar,
        })

        return {
            list,
            count
        }
    }

    @Post()
    create(@Request() req) {
        const { username } = req.user
        return this.questionService.create(username)
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.questionService.findOne(id)
    }

    @Patch(':id')
    updateOne(
        @Param('id') id: string,
        @Body() questionDto: QuestionDto,
        @Request() req
    ) {
        const { username } = req.user 
        return this.questionService.update(id, questionDto, username)
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string, @Request() req) {
        const { username } = req.user
        return this.questionService.delete(id, username)
    }

    @Delete()
    deleteMany(@Body() body, @Request() req) {
        const { username } = req.user;
        const { ids = [] } = body;
        return this.questionService.deleteMany(ids, username)
    }

    @Post('duplication/:id')
    duplicate(@Param('id') id: string, @Request() req) {
        const { username } = req.user
        return this.questionService.duplicate(id,username)
    }
}
