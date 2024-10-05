export function toBRLNumber(value: number, fractionDigits?: number) {
    return value.toFixed(fractionDigits ?? 2).replace('.', ',');
}
