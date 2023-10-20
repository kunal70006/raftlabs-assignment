export interface ErrorPage {
  statusText?: string;
  message?: string;
}

// useful for components that wraps other components and doesn't use any other prop other than children
export interface ComponentWithOnlyChildrenProp {
  children: React.ReactNode;
}
