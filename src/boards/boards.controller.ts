import { Body, Controller, Get, Post, Delete, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipes';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){};

    @Get()
    getAllBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto
    ): Board {
        return this.boardsService.createBoard(CreateBoardDto)
    }

    @Get("/:id")
    getBoardById(@Param("id") id: string): Board {
        return this.boardsService.getBoardById(id)
    }

    @Delete("/:id")
    deleteBoard(@Param("id") id:string): void {
        return this.boardsService.deleteBoard(id)
    }

    @Patch("/:id/status")
    updateBoardStatus(
        @Param("id") id:string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Board {
        return this.boardsService.updateBoardStatus(id, status)
    }
}
