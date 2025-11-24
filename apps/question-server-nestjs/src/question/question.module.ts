/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  exports:[QuestionService],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule { }
