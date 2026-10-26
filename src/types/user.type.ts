export type User = {
  id: number;
  name: string;
  teamId: number;
  salary?: number;
  active: boolean;
  verified?: boolean;
};

export type Stringify<T> = {
  [K in keyof T]: string;
};

// type Result = Stringify<User>

export type ReadonlyNullable<T> = {
  readonly [K in keyof T]: T[K] | null;
};

// type Result = ReadonlyNullable<User>

export type NumbersToStrings<T> = {
  [K in keyof T]: T[K] extends number ? string : T[K];
};

// type Result = NumbersToStrings<User>

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

// type Result = BooleanKeys<User>

export type NonBooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? never : K;
}[keyof T];

// type Result = NonBooleanKeys<User>

export type BooleanProperties<T> = {
  [K in keyof T as T[K] extends boolean ? K : never]: T[K];
};

// type Result = BooleanProperties<User>
