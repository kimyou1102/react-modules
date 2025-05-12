export type ExpirationPeriod = {
    month: string;
    year: string;
};
type ExpiryField = 'month' | 'year';
type TestType = {
    monthString?: string;
    yearString?: string;
    month?: number;
    year?: number;
};
type Rule = {
    test: ({ monthString, yearString, month, year }: TestType) => boolean;
    field: 'month' | 'year';
    message: string;
};
declare function useExpirationPeriod(rules?: Rule[]): {
    value: ExpirationPeriod;
    isError: {
        month: boolean;
        year: boolean;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>, type: ExpiryField) => void;
    errorMessage: string;
};
export default useExpirationPeriod;
