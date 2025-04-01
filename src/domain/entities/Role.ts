export class Role {
  constructor(
    public id: RoleIds,
    public name: string,
  ) {}

}

export enum RoleIds{
  USER = 1,
  EMPLOYEE = 2,
  ADMIN = 3,
}
