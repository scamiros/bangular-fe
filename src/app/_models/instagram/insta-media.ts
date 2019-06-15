import {InstaImage} from './insta-image';
import {InstaComment} from './insta-comment';
import {InstaCaption} from './insta-caption';
import {InstaLocation} from './insta-location';
import {InstaVideo} from './insta-video';
import {InstaUser} from './insta-user';

export class InstaMedia {
  id: string;
  thumbnailImage: InstaImage;
  comments: InstaComment[];
  caption: InstaCaption;
  tags: string[];
  likesCount: string;
  commentsCount: string;
  location: InstaLocation;
  type: string;
  standardResolution: InstaVideo;
  instagramImage: InstaImage[];
  createdTimestamp: string;
  uriLow: string;
  uriStandard: string;
}
