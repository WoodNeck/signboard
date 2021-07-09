export type ValueOf<T> = T[keyof T];
export type LiteralUnion<T extends U, U = string> = T | (Pick<U, never> & {_?: never});

export interface ArrayLike<T> {
  [index: number]: T;
  length: number;
}

export type Unique<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export type MergeObject<T, U> = {
  [K in keyof T & keyof U]: T[K] extends Record<string, unknown>
    ? U[K] extends Record<string, unknown>
      ? Merged<T[K], U[K]>
      : T[K]
    : T[K];
};

export type Merged<From, To> =
  Unique<From, To>
  & Unique<To, From>
  & MergeObject<From, To>;

type IfEquals<X, Y, A, B> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeysOf<T> = {
  [P in keyof T]: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never>
}[keyof T];

type WritablePart<T> = Pick<T, WritableKeysOf<T>>;
export type NoFunctions<T> = { [P in keyof T as T[P] extends Function ? never : P]: T[P] };
export type Attributes<T> = NoFunctions<WritablePart<T>>;
