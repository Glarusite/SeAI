export type Nullable<T> = T | null | undefined;

export type DateTime = Date & {
  kind?: "local" | "utc";
};

export type UtcDateTime = Date & { kind: "utc" };

export type LocalDateTime = Date & { kind: "local" };

export type Unboxed<T> = T extends (infer U)[] ? U : T;

export type KeysOfType<TSource, TValue> = {
  [TKey in keyof TSource]-?: TSource[TKey] extends TValue | undefined | null ? TKey : never;
}[keyof TSource];

export type OptionalKeysOfType<TSource> = {
  [TKey in keyof TSource]-?: undefined extends TSource[TKey] ? TKey : null extends TSource[TKey] ? TKey : never;
}[keyof TSource];
