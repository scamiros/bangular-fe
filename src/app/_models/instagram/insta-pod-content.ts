import {InstaPodMember} from './insta-pod-member';
import {InstaPodAction} from './insta-pod-action';
export class InstaPodContent {
  idPodContent: number;
  dtPosted: string;
  contentUri: string;
  instagramPodMember: InstaPodMember;
  comments: number;
  likes: number;
}
