/**
 * The `BucketProvider` component is a React context provider for a `Bucket` instance.
 * It provides a `BucketContext` that contains a `Bucket` instance.
 *
 * The `BucketProvider` component takes `BucketProps` and a `children` prop for the child components.
 *
 * The `BucketProvider` component uses the `useController` hook to get the current `Controller` instance,
 * and the `useMemo` hook to create a `Bucket` instance with the provided props.
 *
 * The `BucketProvider` component also uses the `useEffect` hook to clear the `Bucket` when the component is unmounted.
 */
import { Bucket, BucketProps } from "@lib";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useController } from "@components";

export type BucketContextType = {
  /** The bucket instance. */
  bucket: Bucket;
};
export const BucketContext = createContext<BucketContextType | null>(null);

export type BucketProviderProps = Partial<
  Pick<BucketProps, "name" | "lock">
> & {
  children?: ReactNode;
};

/**
 * Provides a bucket to its children.
 */
export function BucketProvider({ children, lock, name }: BucketProviderProps) {
  const { controller } = useController();
  const [bucket, setBucket] = useState<Bucket | null>(null);

  useEffect(() => {
    const newBucket = new Bucket({ name, lock, controller });
    setBucket(newBucket);
    return () => newBucket.clear();
  }, [controller, lock, name]);

  if (!bucket) return null;
  return (
    <BucketContext.Provider value={{ bucket }}>
      {children}
    </BucketContext.Provider>
  );
}
