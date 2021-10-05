
const PUBLIC_URL = process.env.PUBLIC_URL

export function setPublicUrl(path: string) :string {
  return PUBLIC_URL + path
}