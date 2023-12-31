export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: string | null;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  displayName: string;
  token: string;
  role: string;
  avatar: string;
  googleID?: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface IPhoto {
  _id: string;
  name: string;
  user: {
    _id: string;
    displayName: string;
  };
  image: string;
}

export interface PhotoMutation {
  name: string;
  image: file | null;
}

export interface PhotoResponse {
  photo: IPhoto;
  message: string;
}
