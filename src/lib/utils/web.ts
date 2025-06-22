export function joinClasses(...classNames: (string | null | undefined | false)[]): string | undefined {
  const filteredClasses = classNames.filter(className => className);
  return filteredClasses.length > 0 ? filteredClasses.join(" ") : undefined;
}