import { SocialLink } from '../../types/community';

export interface ProfileImageProps {
  src: string;
  alt: string;
}

export interface ProfileSocialLinksProps {
  links: SocialLink[];
}

export interface ProfileContentProps {
  name: string;
  role: string;
  bio: string;
  socialLinks: SocialLink[];
}