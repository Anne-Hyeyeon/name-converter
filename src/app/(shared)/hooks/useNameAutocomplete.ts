import { useId, useMemo, useState } from "react";
import { normalizeName } from "../utils/englishNameUtils";

const MAX_SUGGESTIONS = 10;

/**
 * 이름 자동완성 목록과 키보드 선택(위아래 화살표, Enter)을 관리합니다.
 */
export const useNameAutocomplete = (
  names: string[],
  onSelect: (name: string, found: boolean) => void
) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listId = useId();

  const normalizedNames = useMemo(
    () => names.map((name) => ({ name, normalized: normalizeName(name) })),
    [names]
  );

  const trimmedQuery = query.trim();

  const suggestions = useMemo(() => {
    const target = normalizeName(trimmedQuery);
    if (!target) return [];
    return normalizedNames
      .filter((item) => item.normalized.startsWith(target))
      .slice(0, MAX_SUGGESTIONS)
      .map((item) => item.name);
  }, [normalizedNames, trimmedQuery]);

  const changeQuery = (value: string) => {
    setQuery(value);
    setActiveIndex(-1);
  };

  const selectActive = () => {
    if (suggestions.length === 0) {
      onSelect(trimmedQuery, false);
      return;
    }
    const target = normalizeName(trimmedQuery);
    const name =
      suggestions[activeIndex] ??
      suggestions.find((s) => normalizeName(s) === target) ??
      suggestions[0];
    onSelect(name, true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || !trimmedQuery) return;
    const count = Math.max(suggestions.length, 1);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? count - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      selectActive();
    } else if (e.key === "Escape") {
      setActiveIndex(-1);
    }
  };

  const optionId = (index: number) => `${listId}-${index}`;

  const optionProps = (index: number) => ({
    id: optionId(index),
    role: "option" as const,
    "aria-selected": index === activeIndex,
  });

  return {
    query,
    trimmedQuery,
    suggestions,
    listId,
    activeOptionId: activeIndex >= 0 ? optionId(activeIndex) : undefined,
    changeQuery,
    handleKeyDown,
    optionProps,
  };
};
