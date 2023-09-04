export interface User {
  uId: string;
  email: string | null;
  photoUrl?: string | null;
  displayName?: string | null;
  accessToken: string | undefined;
}
