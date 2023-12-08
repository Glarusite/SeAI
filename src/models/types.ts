export type Nullable<T> = T | null | undefined;

export type DateTime = Date & {
  kind?: "local" | "utc";
};

export type UtcDateTime = Date & { kind: "utc" };

export type LocalDateTime = Date & { kind: "local" };

export type Unboxed<T> = T extends (infer U)[] ? U : T;
