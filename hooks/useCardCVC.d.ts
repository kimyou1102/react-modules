declare function useCardCVC(): {
    value: string;
    isError: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string;
};
export default useCardCVC;
