(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("react")) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.index = {}, global.React));
})(this, function(exports2, react) {
  "use strict";
  const getValidLength = (value, maxLength) => {
    if (value.length === 0) return true;
    return value.length === maxLength;
  };
  const parseNumber = (value) => {
    return value.replace(/[^0-9]/g, "");
  };
  function useCardCVC() {
    const [value, setValue] = react.useState("");
    const onChange = (e) => {
      const originValue = e.target.value;
      const parsedValue = parseNumber(originValue);
      if (parsedValue.length > 3) return;
      setValue(parsedValue);
    };
    const isError = !getValidLength(value, 3);
    const errorMessage = isError ? "한 칸은 3자리 숫자를 입력해야합니다." : "";
    return {
      value,
      isError,
      onChange,
      errorMessage
    };
  }
  function formatByGroups(value, groups) {
    const result = [];
    let cursor = 0;
    const lastIdx = groups.length - 1;
    for (let i = 0; i < groups.length; i++) {
      let part;
      if (i < lastIdx) {
        part = value.slice(cursor, cursor + groups[i]);
        cursor += groups[i];
        if (!part) break;
        result.push(part);
      } else {
        part = value.slice(cursor);
        if (part) result.push(part);
      }
    }
    return result;
  }
  const makeNumbers = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
      String
    );
  };
  const rules = [
    // Visa
    {
      cardBrand: "Visa",
      startNumbers: ["4"],
      lengthArray: [4, 4, 4, 4],
      message: "4-4-4-4 형태의 16자리로 입력해주세요"
    },
    // MasterCard
    {
      cardBrand: "MasterCard",
      startNumbers: ["51", "52", "53", "54", "55"],
      lengthArray: [4, 4, 4, 4],
      message: "4-4-4-4 형태의 16자리로 입력해주세요"
    },
    // Diners
    {
      cardBrand: "Diners",
      startNumbers: ["36"],
      lengthArray: [4, 6, 4],
      message: "4-6-4 형태의 14자리로 입력해주세요"
    },
    // AMEX
    {
      cardBrand: "AMEX",
      startNumbers: ["34", "37"],
      lengthArray: [4, 6, 5],
      message: "4-6-5 형태의 15자리로 입력해주세요"
    },
    // UnionPay
    {
      cardBrand: "UnionPay",
      startNumbers: [
        ...makeNumbers(622126, 622925),
        ...makeNumbers(624, 626),
        ...makeNumbers(6282, 6288)
      ],
      lengthArray: [4, 4, 4, 4],
      message: "4-4-4-4 형태의 16자리로 입력해주세요"
    },
    // 기본 16글자
    {
      startNumbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      lengthArray: [4, 4, 4, 4],
      message: "4-4-4-4 형태의 16자리로 16자리로 입력해주세요"
    }
  ];
  const validate = (cardNumbersValue, addedRules = []) => {
    const cardNumbers = cardNumbersValue.replace(/' '/g, "");
    const rule = rules.concat(addedRules).find(({ startNumbers }) => {
      return startNumbers.find((startNumber) => {
        const startNummberLength = startNumber.length;
        return cardNumbers.slice(0, startNummberLength) === startNumber;
      });
    });
    if (!rule)
      return {
        isError: false,
        message: ""
      };
    const { lengthArray } = rule;
    const totalLength = lengthArray.reduce((a, b) => a + b, 0);
    let isError = false;
    let message = "";
    if (totalLength !== cardNumbers.length) {
      isError = true;
      message = rule.message;
    }
    const formatted = formatByGroups(cardNumbers, lengthArray);
    return {
      isError,
      message,
      cardBrand: rule.cardBrand,
      formatted,
      lengthArray
    };
  };
  function useCardNumber(addedRules) {
    const [value, setCardNumber] = react.useState("");
    const onChange = (e) => {
      const originValue = e.target.value;
      const parsedvalue = parseNumber(originValue);
      setCardNumber(parsedvalue);
    };
    const { isError, message, cardBrand, formatted } = validate(
      value,
      addedRules
    );
    return {
      cardBrand,
      formatted,
      isError,
      errorMessage: message,
      onChange
    };
  }
  function useCardPassword() {
    const [value, setValue] = react.useState("");
    const onChange = (e) => {
      const originValue = e.target.value;
      const parsedValue = parseNumber(originValue);
      if (parsedValue.length > 2) return;
      setValue(parsedValue);
    };
    const isError = !getValidLength(value, 2);
    const errorMessage = isError ? "한 칸은 2자리 숫자를 입력해야합니다." : "";
    return {
      value,
      isError,
      onChange,
      errorMessage
    };
  }
  const MESSAGE = {
    INVALID_DATE_MSG: "현재보다 이전값을 유효기간으로 선택할 수 없습니다.",
    FORMAT_MONTH_MSG: "MM형식으로 입력해주세요. (ex. 01)",
    FORMAT_YEAR_MSG: "YY형식으로 입력해주세요. (ex. 01)",
    MONTH_RANGE_MSG: "1~12사이의 올바른 월을 입력해 주세요."
  };
  const expiryRules = [
    {
      test: ({ monthString }) => {
        if (!monthString) return false;
        return monthString.length === 2;
      },
      field: "month",
      message: MESSAGE.FORMAT_MONTH_MSG
    },
    {
      test: ({ yearString }) => {
        if (!yearString) return false;
        return yearString.length === 2;
      },
      field: "year",
      message: MESSAGE.FORMAT_YEAR_MSG
    },
    {
      test: ({ month }) => {
        return month >= 1 && month <= 12;
      },
      field: "month",
      message: MESSAGE.MONTH_RANGE_MSG
    },
    {
      test: ({ year }) => {
        const currentYear = Number((/* @__PURE__ */ new Date()).getFullYear().toString().slice(2));
        return year >= currentYear;
      },
      field: "year",
      message: MESSAGE.INVALID_DATE_MSG
    },
    {
      test: ({ month, year }) => {
        const now = /* @__PURE__ */ new Date();
        const currentYear = Number.parseInt(
          (/* @__PURE__ */ new Date()).getFullYear().toString().slice(2),
          10
        );
        const currentMonth = now.getMonth() + 1;
        if (currentYear < year) return true;
        return currentYear === year && month >= currentMonth;
      },
      field: "month",
      message: MESSAGE.INVALID_DATE_MSG
    }
  ];
  const validateExpiry = (monthString, yearString, rules2 = []) => {
    if (monthString === "" && yearString === "")
      return { message: "", field: null };
    const month = Number(monthString);
    const year = Number(yearString);
    const invalid = expiryRules.concat(rules2).find((rule) => !rule.test({ monthString, yearString, month, year }));
    if (invalid) {
      return { message: invalid.message, field: invalid.field };
    }
    return { message: "", field: null };
  };
  function useExpirationPeriod(rules2) {
    const [value, setValue] = react.useState({
      month: "",
      year: ""
    });
    const onChange = (e, type) => {
      const originValue = e.target.value;
      const parsedValue = parseNumber(originValue);
      if (parsedValue.length > 2) {
        return;
      }
      setValue((prev) => ({
        ...prev,
        [type]: parsedValue
      }));
    };
    const { message: errorMessage, field } = validateExpiry(
      value.month,
      value.year,
      rules2
    );
    const isError = {
      month: field === "month",
      year: field === "year"
    };
    return {
      value,
      isError,
      onChange,
      errorMessage
    };
  }
  exports2.useCardCVC = useCardCVC;
  exports2.useCardNumber = useCardNumber;
  exports2.useCardPassword = useCardPassword;
  exports2.useExpirationPeriod = useExpirationPeriod;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
