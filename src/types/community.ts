export interface SocialLink {
  platform: string;
  url: string;
}

export interface Profile {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks: SocialLink[];
}

export interface ProfileCardProps extends Omit<Profile, 'id'> {}