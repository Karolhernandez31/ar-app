import { Injectable } from '@angular/core';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  Auth,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return userCredential.user;
  }

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return userCredential.user;
  }

  logout(): Promise<void> {
  return this.auth.signOut().catch(error => {
    console.warn('SignOut error (may be blocked by client):', error);
    // Limpiar estado local aunque falle la llamada a Firebase
    // localStorage.removeItem('user'); // Si guardas algo localmente
    // sessionStorage.clear();
  });
}

  async getCurrentUser(): Promise<User | null> {
    const user = this.auth.currentUser;

    if (user) {
      return user;
    } else {
      return new Promise((resolve) => {
        const unsubscribe = this.auth.onAuthStateChanged((currentUser) => {
          unsubscribe();
          resolve(currentUser);
        });
      });
    }
  }

  async getUserUid(): Promise<string> {
    const user = await this.getCurrentUser();
    const uid = user?.uid || '';
    return uid;
  }
}
