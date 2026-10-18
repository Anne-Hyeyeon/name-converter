"use client";

import { useSyncExternalStore } from "react";

const visitSeed = typeof window === "undefined" ? 0 : Math.random();
const subscribe = () => () => {};

const hashIndex = (seed: string, length: number) =>
  [...seed].reduce((sum, char) => sum + char.charCodeAt(0), 0) % length;

/**
 * 시대 설명 한 줄과 재미 문구 하나를 보여줍니다. 재미 문구는 방문할 때마다 바뀝니다.
 */
export default function GenerationLines({
  intro,
  fun,
  seed,
  className,
}: {
  intro: string;
  fun: string[];
  seed: string;
  className: string;
}) {
  const index = useSyncExternalStore(
    subscribe,
    () => Math.floor(visitSeed * fun.length),
    () => hashIndex(seed, fun.length)
  );

  return (
    <>
      <p className={className}>{intro}</p>
      <p className={className}>{fun[index]}</p>
    </>
  );
}
