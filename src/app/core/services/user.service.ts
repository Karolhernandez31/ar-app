import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private firestore: Firestore) {}

  async create(user: User) {
    const userRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userRef, user);
  }

  async get(uid: any): Promise<User | undefined> {
    const userRef = doc(this.firestore, 'users', uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? (snap.data() as User) : undefined;
  }

  async update(uid: string, data: Partial<Omit<User, 'uid' | 'email'>>) {
    const userRef = doc(this.firestore, 'users', uid);
    await updateDoc(userRef, data);
  }

  async delete(uid: string) {
    const userRef = doc(this.firestore, 'users', uid);
    await deleteDoc(userRef);
  }

  async getAll(): Promise<User[]> {
    const colRef = collection(this.firestore, 'users');
    const snap = await getDocs(colRef);
    return snap.docs.map((doc) => doc.data() as User);
  }
}
