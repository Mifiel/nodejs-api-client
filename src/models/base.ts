export default interface Base {
  resource: string
  multipart: boolean
  save(): Promise<Object>
}
