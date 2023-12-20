import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { AppService } from 'src/app.service';

@Injectable()
export class NoteService {
  constructor(private prisma: AppService) {}

  async createNote(data: Prisma.NoteCreateInput): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async getNotes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NoteWhereUniqueInput;
    where?: Prisma.NoteWhereInput;
    orderBy?: Prisma.NoteOrderByWithRelationInput;
  }): Promise<Note[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.note.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async getNoteById(id: number): Promise<Note | null> {
    return this.prisma.note.findUnique({
      where: { id },
    });
  }

  async updateNote(params: {
    where: Prisma.NoteWhereUniqueInput;
    data: Prisma.NoteUpdateInput;
  }): Promise<Note> {
    const { where, data } = params;
    return this.prisma.note.update({
      data,
      where,
    });
  }

  async deleteNote(where: Prisma.NoteWhereUniqueInput): Promise<Note> {
    return this.prisma.note.delete({ where });
  }

  //devuelve notas que contengan las palabras pasadas en title o description
  async searchNotesByKeyword(keyword: string): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { description: { contains: keyword } },
        ],
      }, include: { user: true }
    });
  }
}