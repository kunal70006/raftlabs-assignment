export interface ErrorPage {
  statusText?: string;
  message?: string;
}

// useful for components that wraps other components and doesn't use any other prop other than children
export interface ComponentWithOnlyChildrenProp {
  children: React.ReactNode;
}

export interface UserProfile {
  id?: string;
  updated_at?: string;
  username?: string;
  follower_count?: string;
  following?: string[];
}

export interface Post {
  title: string;
  media_path: string;
  author: string;
  user_id: string;
}

export interface PostCollection extends Post {
  created_at: string;
  id: string;
}
export interface Comment {
  body: string;
  author: string;
  created_at: string;
  post_id: string;
}

export interface ButtonProps {
  className?: string
  disabled?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export interface TagModalProps {
  isOpen: boolean
  closeModal: () => void
  postId: number
}