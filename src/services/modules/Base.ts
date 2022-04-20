import { getDatabase } from 'firebase/database'
import type { Database } from 'firebase/database'
import type { FirebaseApp } from 'firebase/app'

export default class BaseService {
  static database: Database

  static initFirebaseDatabase(app: FirebaseApp) {
    console.log('[+] Initialize Firebase Database')
    this.database = getDatabase(app)
    return this.database
  }
}
