type Rule = {
    cardBrand?: 'Visa' | 'MasterCard' | 'Diners' | 'AMEX' | 'UnionPay' | string;
    startNumbers: string[];
    lengthArray: number[];
    message: string;
};
declare function useCardNumber(addedRules?: Rule[]): {
    cardBrand: string | undefined;
    formatted: string[] | undefined;
    isError: boolean;
    errorMessage: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default useCardNumber;
