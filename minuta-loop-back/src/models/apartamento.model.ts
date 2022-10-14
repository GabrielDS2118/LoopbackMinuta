import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class Apartamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  torre: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_apto: string;

  @hasMany(() => Persona)
  personas: Persona[];

  constructor(data?: Partial<Apartamento>) {
    super(data);
  }
}

export interface ApartamentoRelations {
  // describe navigational properties here
}

export type ApartamentoWithRelations = Apartamento & ApartamentoRelations;
