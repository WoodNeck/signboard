export type ValueOf<T> = T[keyof T];

export interface SignboardOptions {
  type: ValueOf<SignboardType>;
}

export interface SignboardType {
  LED: "LED";
  NEON: "NEON";
}
