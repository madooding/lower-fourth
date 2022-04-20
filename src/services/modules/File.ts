import BaseService from './Base'

export default class FileService extends BaseService {
  static readFileAsText(file: File): Promise<string> {
    const reader = new FileReader()

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const text = reader.result as string
        resolve(text)
      }

      reader.onerror = () => {
        reject(new Error('Error while reading file!'))
      }

      reader.readAsText(file)
    })
  }
}
