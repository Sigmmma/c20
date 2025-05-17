export function filterMapObject<T, O>(obj: Record<string, T>, transform: (value: T, key: string) => O | undefined): Record<string, O> {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    const mappedValue = transform(value, key);
    if (mappedValue !== undefined) {
      result[key] = mappedValue;
    }
  });
  return result;
}

export function filterMapArray<T, O>(arr: T[], transform: (value: T) => O | undefined): O[] {
  const results: O[] = [];
  arr.forEach(value => {
    const mappedValue = transform(value);
    if (mappedValue !== undefined) {
      results.push(mappedValue);
    }
  });
  return results;
}