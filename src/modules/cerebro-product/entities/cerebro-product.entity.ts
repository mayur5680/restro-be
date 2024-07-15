import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vwPosProductRecipes', schema: 'dbo' })
export class CerebroProduct {
  @PrimaryColumn({
    name: 'ProductMapping_PK',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  productMappingPk: string;

  @Column({
    name: 'RecipePlu',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  recipePlu: string;

  @Column({
    name: 'PosPLU',
    type: 'int',
  })
  posPLU: number;

  @Column({
    name: 'PosProductName',
    type: 'varchar',
    length: 255,
  })
  posProductName: string;

  @Column({
    name: 'RecipeName',
    type: 'varchar',
    length: 255,
  })
  recipeName: string;

  @Column({
    name: 'IngredientName',
    type: 'varchar',
    length: 255,
  })
  ingredientName: string;

  @Column({
    name: 'ComponentSequence',
    type: 'int',
  })
  componentSequence: number;

  @Column({
    name: 'RecipeQty',
    type: 'int',
  })
  recipeQty: number;

  @Column({
    name: 'ProductCompanyNameNumber',
    type: 'varchar',
    length: 255,
  })
  productCompanyNameNumber: string;

  @Column({
    name: 'Portion',
    type: 'varchar',
    length: 100,
  })
  portion: string;

  @Column({
    name: 'RecipeCategory',
    type: 'varchar',
    length: 255,
  })
  recipeCategory: string;

  @Column({ name: 'LastTouchDate', type: 'datetime' })
  lastTouchDate: Date;
}
