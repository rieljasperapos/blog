export interface BlogParams {
  params: {
    title: string
  }
}

export interface IBlog {
  // TODO: Write blog types here
  title: string,
  description: string,
  author: string,
  readDuration: string,
  image: string,
  [key: string]: any
}