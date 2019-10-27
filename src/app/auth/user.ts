export class User {
  constructor(
    public email?: string,
    public password?: string,
    private idToken?: string,
    public login?: string,
    public avatar?: string) {
    this.login = this.login ? this.login : this.email;
    this.avatar = this.avatar ? this.avatar :
      'https://avatars3.githubusercontent.com/u/6032895?v=4';
  }
}
