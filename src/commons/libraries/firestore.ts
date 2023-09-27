import type { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";

export class BoardDetail {
  constructor(
    public uid: string,
    public writer: string,
    public title: string,
    public contents: string,
    public createdAt: Timestamp,
    public images: string[],
  ){}

  toString(): string {
    return this.uid + ", " + this.writer + ", " + this.title + ", " + this.contents + ", " + this.createdAt.toDate().toLocaleString() + ", " + this.images[0]
  }
}

export const BoardDetailConverter: FirestoreDataConverter<BoardDetail> = {
  toFirestore: (docData: BoardDetail): DocumentData => {
    return {
      uid: docData.uid,
      writer: docData.writer,
      title: docData.title,
      contents: docData.contents,
      createdAt: docData.createdAt,
      images: docData.images
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const sn = snapshot;
    const data = sn.data(options);
    return new BoardDetail(
      data.uid,
      data.writer,
      data.title,
      data.contents,
      data.createdAt,
      data.images
    );
  },
};