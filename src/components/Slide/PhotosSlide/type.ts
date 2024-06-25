export interface PhotoSlide {
  id: string;
  small: string;
  user: {
    id: string;
  };
  avatar?: string
}

export interface PhotoError {
  message: string
}