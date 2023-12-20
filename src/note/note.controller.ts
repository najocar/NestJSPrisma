import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note, Prisma } from '@prisma/client';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async createNote(@Body() noteData: Prisma.NoteCreateInput): Promise<Note> {
    return this.noteService.createNote(noteData);
  }

  @Get('/page/:page')
  async getNotes(@Param('page') page: number): Promise<Note[]> {
    return this.noteService.getNotes({
      skip: page * 10,
      take: 10,
    });
  }

  @Get(':id')
  async getNoteById(@Param('id') id: string): Promise<Note | null> {
    return this.noteService.getNoteById(Number(id));
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() noteData: Prisma.NoteUpdateInput
  ): Promise<Note> {
    return this.noteService.updateNote({
      where: { id: Number(id) },
      data: noteData,
    });
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<Note> {
    return this.noteService.deleteNote({ id: Number(id) });
  }
}