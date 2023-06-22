import { User } from './../../../models/user.class';
import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = new User();
  users!: Observable<any>;
  private userCollection: CollectionReference<DocumentData>;

  constructor(
    private firestore: Firestore) {
      this.userCollection = collection(this.firestore, 'users');
      this.getAllUsers();
    }


    /**
   * Retrieves user data from Firestore based on the provided user ID.
   * Subscribes to the document data and maps it to a User object.
   * 'userCollection' is a firestore collection representing the 'users' collection.
   * 'docRef' is a document reference representing a specific user document.
   */
  getUser() {
    const userCollection = collection(this.firestore, 'users');
    const docRef = doc(userCollection, this.user.userId);

    docData(docRef).subscribe((userCollection: any) => {
      this.user = new User(userCollection);
    });
  }


    /**
     * Gets user info based on id.
     * @param id
     * @returns the user that matches the id.
     */
    get(userId: string) {
      const userDocRef = doc(this.firestore, 'users', userId);
      return docData(userDocRef, { idField: 'customIdName' });
    }


    /**
     * Creates new user.
     * @param user
     * @returns a new user to the collection.
     */
    create(user: User) {
      return addDoc(this.userCollection, user);
    }


    /**
     * Updates user info.
     * @param user
     * @returns an update to the user collection.
     */
    update(user: User) {
      const userDocRef = doc(this.firestore,`user/${user.userId}`);
      return updateDoc(userDocRef, { ...user });
    }


    /**
     * Deletes selected user.
     * @param id
     * @returns a deletion of the user that matches the id.
     */
    delete(userId: string) {
      const userDocRef = doc(this.firestore,`user/${userId}`);
      return deleteDoc(userDocRef);
    }


  /**
   * after signup (with mail/with google) it creates a new user
   * in firestore database with uID as doc id
   * @param uID id of user in fs authentication
   * @param email email to get the name
   */
  setNewUser(uID: string, email: string) {
    //this.user.userId = uID;
    this.user.displayName = this.splitMail(email);
    this.user.email = email;
    //setDoc(doc(this.userColl, uID), this.user.toJson())
  }

  /**
   * deletes everything after a dot and @ and return only first name of email
   * @param email input as string
   * @returns a name as a string
   */
  splitMail(email: string): string {
    const atIndex = email.indexOf('@');
    const firstPart = email.substring(0, atIndex);
    const dotIndex = firstPart.indexOf('.');

    if (dotIndex === -1) {
      return firstPart;
    } else {
      return firstPart.substring(0, dotIndex);
    }
  }


  getAllUsers() {
    const userCollection = collection(this.firestore, 'users');
    this.users = collectionData(userCollection);
  }
}
