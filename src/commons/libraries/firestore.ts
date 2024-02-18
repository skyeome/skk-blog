import type {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";

export class BoardDetail {
  constructor(
    public uid: string,
    public writer: string,
    public title: string,
    public contents: string,
    public createdAt: Timestamp,
    public category: string[],
    public images: string[]
  ) {}

  toString(): string {
    return (
      this.uid +
      ", " +
      this.writer +
      ", " +
      this.title +
      ", " +
      this.contents +
      ", " +
      this.createdAt.toDate().toLocaleString() +
      ", " +
      this.category[0] +
      ", " +
      this.images[0]
    );
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
      category: docData.category,
      images: docData.images,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const sn = snapshot;
    const data = sn.data(options);
    return new BoardDetail(
      data.uid,
      data.writer,
      data.title,
      data.contents,
      data.createdAt,
      data.category,
      data.images
    );
  },
};

export class Board {
  constructor(
    public writer: string,
    public title: string,
    public contents: string,
    public createdAt: Timestamp,
    public category: string[],
    public images: string[]
  ) {}

  toString(): string {
    return (
      this.writer +
      ", " +
      this.title +
      ", " +
      this.contents +
      ", " +
      this.createdAt.toDate().toLocaleString() +
      ", " +
      this.category[0] +
      ", " +
      this.images[0]
    );
  }
}

export const BoardConverter: FirestoreDataConverter<Board> = {
  toFirestore: (docData: Board): DocumentData => {
    return {
      ...docData,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const sn = snapshot;
    const data = sn.data(options);
    return new Board(
      data.writer,
      data.title,
      data.contents,
      data.createdAt,
      data.category,
      data.images
    );
  },
};

export class UserInfo {
  constructor(
    public uid: string,
    public avatar: string,
    public nickname: string,
    public email: string,
    public desc: string,
    public createdAt: Timestamp
  ) {}

  toString(): string {
    return (
      this.uid +
      ", " +
      this.avatar +
      ", " +
      this.nickname +
      ", " +
      this.email +
      ", " +
      this.desc +
      ", " +
      this.createdAt.toDate().toLocaleString()
    );
  }
}

export const UserInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (docData: UserInfo): DocumentData => {
    return {
      uid: docData.uid,
      avatar: docData.avatar,
      nickname: docData.nickname,
      email: docData.email,
      desc: docData.desc,
      createdAt: docData.createdAt,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const sn = snapshot;
    const data = sn.data(options);
    return new UserInfo(
      data.uid,
      data.avatar,
      data.nickname,
      data.email,
      data.desc,
      data.createdAt
    );
  },
};
