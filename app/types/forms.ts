export type BlogFormState = {
  errors?: {
    title?: string;
    author?: string;
    url?: string;
    general?: string;
  };

  values?: {
    title: string;
    author: string;
    url: string;
  };
};

export type RegisterFormState = {
  errors?: {
    username?: string;
    name?: string;
    password?: string;
    passwordConfirm?: string;
    general?: string;
  };

  values?: {
    username: string;
    name: string;
  };
};