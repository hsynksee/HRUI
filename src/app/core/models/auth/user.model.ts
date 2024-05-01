export class UserModel {
  id: number;
  name: string;
  email: string;
  jobTitle: string;
  
  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.name = user.name || '';
    this.email = user.email || '';
    this.jobTitle = user.jobTitle || '';
  }
}
