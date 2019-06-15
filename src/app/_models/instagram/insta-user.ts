import {InstaMedia} from './insta-media';

export class InstaUser {
  id: number;
  userName: string;
  fullName: string;
  profilePictureURI: string;
  bio: string;
  website: string;
  mediaCountString: number;
  followerCountString: number;
  followingCountString: number;

  media: InstaMedia[];
}
