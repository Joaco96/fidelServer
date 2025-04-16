export class Role {
  constructor(
    public id: RoleIds,
    public name: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}

}

export enum RoleIds{
  USER = 1,
  EMPLOYEE = 2,
  ADMIN = 3,
}
