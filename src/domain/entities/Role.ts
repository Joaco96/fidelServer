export class Role {
  constructor(
    public id: RoleIds,
    public name: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

}

export enum RoleIds{
  USER = 1,
  EMPLOYEE = 2,
  ADMIN = 3,
}
