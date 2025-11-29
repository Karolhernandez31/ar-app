import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, CollectionReference, deleteDoc, doc, docData, DocumentData, Firestore } from '@angular/fire/firestore';
import { createClient } from '@supabase/supabase-js';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private bucketName: string = 'wallpapers';
  constructor(private firestore: Firestore) {}

  private supabase = createClient(environment.supabaseConfig.url, environment.supabaseConfig.anonKey);

  async upload(blob: Blob, path: string): Promise<string> {
    const { data, error } = await this.supabase.storage.from(this.bucketName).upload(path, blob);
    if (error) throw error;

    const { publicUrl } = this.supabase.storage.from(this.bucketName).getPublicUrl(path).data;
    return publicUrl;
  }

  getPictureCollection(uid: any): CollectionReference<DocumentData> {
    return collection(this.firestore, `users/${uid}/${this.bucketName}`);
  }

  async save(data: any, picture: any): Promise<void> {
    const uid = data.uid;
    data.url = picture;

    try {
      const docRef = await addDoc(this.getPictureCollection(uid), data);
    } catch (error) {
      console.error('Error al agregar documento:', error);
      throw error;
    }
  }

  getAll(uid: any): Observable<any[]> {
    const multimediaRef = collection(this.firestore, `users/${uid}/${this.bucketName}`);
    return collectionData(multimediaRef, { idField: 'id' });
  }

  getById(uid: any, id: string): Observable<any> {
    const docRef = doc(this.firestore, `users/${uid}/${this.bucketName}/${id}`);
    return docData(docRef, { idField: 'id' });
  }

  delete(uid: any, id: string): Observable<void> {
    const docRef = doc(this.firestore, `users/${uid}/${this.bucketName}/${id}`);
    return from(deleteDoc(docRef));
  }
}
