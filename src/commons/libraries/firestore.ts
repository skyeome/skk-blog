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
    public summary: string,
    public contents: string,
    public createdAt: Timestamp,
    public category: string[],
    public thumb: string,
    public thumbRef: string
  ) {}

  toString(): string {
    return (
      this.uid +
      ", " +
      this.writer +
      ", " +
      this.title +
      ", " +
      this.summary +
      ", " +
      this.contents +
      ", " +
      this.createdAt.toDate().toLocaleString() +
      ", " +
      this.category[0] +
      ", " +
      this.thumb +
      ", " +
      this.thumbRef
    );
  }
}

export const BoardDetailConverter: FirestoreDataConverter<BoardDetail> = {
  toFirestore: (docData: BoardDetail): DocumentData => {
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
    return new BoardDetail(
      data.uid,
      data.writer,
      data.title,
      data.summary,
      data.contents,
      data.createdAt,
      data.category,
      data.thumb,
      data.thumbRef
    );
  },
};

export class Board {
  constructor(
    public writer: string,
    public title: string,
    public summary: string,
    public createdAt: Timestamp,
    public category: string[],
    public thumb: string
  ) {}

  toString(): string {
    return (
      this.writer +
      ", " +
      this.title +
      ", " +
      this.summary +
      ", " +
      this.createdAt.toDate().toLocaleString() +
      ", " +
      this.category[0] +
      ", " +
      this.thumb
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
      data.summary,
      data.createdAt,
      data.category,
      data.thumb
    );
  },
};

export class BoardComment {
  constructor(
    public id: string,
    public boardId: string,
    public writer: string,
    public contents: string,
    public star: number,
    public createdAt: Timestamp,
    public updatedAt: Timestamp
  ) {}

  toString(): string {
    return `
      ${this.id} ,
      ${this.boardId} ,
      ${this.writer},
      ${this.contents},
      ${this.star},
      ${this.createdAt.toDate().toLocaleString()},
      ${this.updatedAt.toDate().toLocaleString()}
      `;
  }
}

export const BoardCommentConverter: FirestoreDataConverter<BoardComment> = {
  toFirestore: (docData: BoardComment): DocumentData => {
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
    return new BoardComment(
      sn.id,
      data.boardId,
      data.writer,
      data.contents,
      data.star,
      data.createdAt,
      data.updatedAt
    );
  },
};

export class UserInfo {
  constructor(
    public uid: string,
    public avatar: string,
    public avatarName: string,
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
      this.avatarName +
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
      avatarName: docData.avatarName,
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
      data.avatarName,
      data.nickname,
      data.email,
      data.desc,
      data.createdAt
    );
  },
};
