export default interface Base {
  multipart: boolean
  save(): Promise<object>
}
