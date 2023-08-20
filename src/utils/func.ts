/* eslint-disable @typescript-eslint/no-explicit-any */
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  const debounced = (...args: Parameters<F>) => {
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout);
      debounceTimeout = null;
    }
    debounceTimeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};

export const objToQuery = (obj) => {
  const hasValue = [];
  for (const key in obj) {
    if (obj[key]) {
      hasValue.push([key, obj[key]]);
    }
  }
  const query = new URLSearchParams(hasValue).toString();
  return query;
};
