import { useState as d } from "react";
const M = (e, r) => e.length === 0 ? !0 : e.length === r, m = (e) => e.replace(/[^0-9]/g, "");
function p() {
  const [e, r] = d(""), s = (n) => {
    const a = n.target.value, u = m(a);
    u.length > 3 || r(u);
  }, t = !M(e, 3);
  return {
    value: e,
    isError: t,
    onChange: s,
    errorMessage: t ? "한 칸은 3자리 숫자를 입력해야합니다." : ""
  };
}
const h = (e, r) => Array.from({ length: r - e + 1 }, (s, t) => e + t).map(
  String
);
function A(e, r) {
  const s = [];
  let t = 0;
  const o = r.length - 1;
  for (let n = 0; n < r.length; n++) {
    let a;
    if (n < o) {
      if (a = e.slice(t, t + r[n]), t += r[n], !a) break;
      s.push(a);
    } else
      a = e.slice(t), a && s.push(a);
  }
  return s;
}
const N = [
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
      ...h(622126, 622925),
      ...h(624, 626),
      ...h(6282, 6288)
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
], E = (e, r = []) => {
  const s = e.replace(/' '/g, ""), t = N.concat(r).find(({ startNumbers: c }) => c.find((l) => {
    const f = l.length;
    return s.slice(0, f) === l;
  }));
  if (!t)
    return {
      isError: !1,
      message: ""
    };
  const { lengthArray: o } = t, n = o.reduce((c, l) => c + l, 0);
  let a = !1, u = "";
  n !== s.length && (a = !0, u = t.message);
  const i = A(s, o);
  return {
    isError: a,
    message: u,
    cardBrand: t.cardBrand,
    formatted: i,
    lengthArray: o
  };
};
function y(e) {
  const [r, s] = d(""), t = (i) => {
    const c = i.target.value, l = m(c);
    s(l);
  }, { isError: o, message: n, cardBrand: a, formatted: u } = E(
    r,
    e
  );
  return {
    cardBrand: a,
    formatted: u,
    isError: o,
    errorMessage: n,
    onChange: t
  };
}
function G() {
  const [e, r] = d(""), s = (n) => {
    const a = n.target.value, u = m(a);
    u.length > 2 || r(u);
  }, t = !M(e, 2);
  return {
    value: e,
    isError: t,
    onChange: s,
    errorMessage: t ? "한 칸은 2자리 숫자를 입력해야합니다." : ""
  };
}
const g = {
  INVALID_DATE_MSG: "현재보다 이전값을 유효기간으로 선택할 수 없습니다.",
  FORMAT_MONTH_MSG: "MM형식으로 입력해주세요. (ex. 01)",
  FORMAT_YEAR_MSG: "YY형식으로 입력해주세요. (ex. 01)",
  MONTH_RANGE_MSG: "1~12사이의 올바른 월을 입력해 주세요."
}, _ = [
  {
    test: ({ monthString: e }) => e ? e.length === 2 : !1,
    field: "month",
    message: g.FORMAT_MONTH_MSG
  },
  {
    test: ({ yearString: e }) => e ? e.length === 2 : !1,
    field: "year",
    message: g.FORMAT_YEAR_MSG
  },
  {
    test: ({ month: e }) => e >= 1 && e <= 12,
    field: "month",
    message: g.MONTH_RANGE_MSG
  },
  {
    test: ({ year: e }) => {
      const r = Number((/* @__PURE__ */ new Date()).getFullYear().toString().slice(2));
      return e >= r;
    },
    field: "year",
    message: g.INVALID_DATE_MSG
  },
  {
    test: ({ month: e, year: r }) => {
      const s = /* @__PURE__ */ new Date(), t = Number.parseInt(
        (/* @__PURE__ */ new Date()).getFullYear().toString().slice(2),
        10
      ), o = s.getMonth() + 1;
      return t < r ? !0 : t === r && e >= o;
    },
    field: "month",
    message: g.INVALID_DATE_MSG
  }
], b = (e, r, s = []) => {
  if (e === "" && r === "")
    return { message: "", field: null };
  const t = Number(e), o = Number(r), n = _.concat(s).find((a) => !a.test({ monthString: e, yearString: r, month: t, year: o }));
  return n ? { message: n.message, field: n.field } : { message: "", field: null };
};
function C(e) {
  const [r, s] = d({
    month: "",
    year: ""
  }), t = (u, i) => {
    const c = u.target.value, l = m(c);
    l.length > 2 || s((f) => ({
      ...f,
      [i]: l
    }));
  }, { message: o, field: n } = b(
    r.month,
    r.year,
    e
  );
  return {
    value: r,
    isError: {
      month: n === "month",
      year: n === "year"
    },
    onChange: t,
    errorMessage: o
  };
}
export {
  p as useCardCVC,
  y as useCardNumber,
  G as useCardPassword,
  C as useExpirationPeriod
};
