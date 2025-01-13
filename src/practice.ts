
export type ArithmeticOperator = '+' | '-';
export type ComparisonOperator = '=' | '>' | '<';
export type PracticeItem = [number, ArithmeticOperator, number, ComparisonOperator, number];
export const ARITHMETIC_OPERATORS: ArithmeticOperator[] = ['+', '-'];
export const COMPARISON_OPERATORS: ComparisonOperator[] = ['=', '<', '>'];
export function random(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min));
}

export function buildPracticeItem(options: {
    min: number;
    max: number;
    arithmetics: ArithmeticOperator[];
    comparisons: ComparisonOperator[];
}): PracticeItem {
    const { min, max, arithmetics, comparisons } = options;
    const arithmetic = arithmetics[random(0, arithmetics.length)];
    let c = random(min, max);
    let a: number;
    let b: number;

    switch (arithmetic) {
        case '+':
            a = c - random(min, c);
            b = c - a;
            break;
        case '-':
            a = random(c, max);
            b = a - c;
            break;
        default: {
            throw new Error(`Unsupported operator "${arithmetic}"`);
        }
    }

    const comparison = comparisons[random(0, comparisons.length)];

    switch (comparison) {
        case '<':
            c = random(c, max);
            break;
        case '>':
            c = random(min, c);
            break;
    }

    return [a, arithmetic, b, comparison, c];
}

export type PracticeOptions = Parameters<typeof buildPracticeItem>[0] & {
    itemCount: number;
    skipRepeat: boolean;
}

export const DEFAULT_PRACTICE_OPTIONS: PracticeOptions = {
    min: 1,
    max: 10,
    itemCount: 100,
    arithmetics: ['+', '-'],
    comparisons: ['=', '<', '>'],
    skipRepeat: true
};

export function buildPractice(
    options: PracticeOptions = DEFAULT_PRACTICE_OPTIONS,
    progress?: (item: PracticeItem, list: PracticeItem[]) => void
): PracticeItem[] {
    let num = options.itemCount;
    const list = new Array<PracticeItem>();
    while (num > 0) {
        const newItem = buildPracticeItem(options);
        if (options.skipRepeat && list.some(item => item.join('') === newItem.join(''))) {
            continue;
        }
        num -= 1;
        list.push(newItem);
        if (progress) {
            progress(newItem, list);
        }
    }
    return list;
}

