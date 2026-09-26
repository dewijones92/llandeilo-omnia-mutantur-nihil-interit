declare const brand: unique symbol;

export type Brand<T, Name extends string> = T & { readonly [brand]: Name };

/** The one place brands are minted; callers validate before calling. */
export function mint<B extends Brand<string, string>>(value: string): B {
  return value as B;
}

export function mintNumber<B extends Brand<number, string>>(value: number): B {
  return value as B;
}
