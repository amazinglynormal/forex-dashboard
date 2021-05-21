import { render } from "@testing-library/react";
import { ConvertResult } from "../converter/ConvertResult";

const testCurrencies = {
  EUR: "Euro",
  USD: "United States Dollar",
  MXN: "Mexican Peso",
  JPY: "Japanese Yen",
};

describe("<ConvertResult>", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <ConvertResult
        currencies={testCurrencies}
        from={"EUR"}
        to={"USD"}
        amount1={0}
        amount2={0}
      />
    );

    expect(
      getByText("0 Euro is equal to 0 United States Dollar")
    ).toBeInTheDocument();
  });

  test("text changes when props change", () => {
    const { getByText, rerender } = render(
      <ConvertResult
        currencies={testCurrencies}
        from={"EUR"}
        to={"USD"}
        amount1={0}
        amount2={0}
      />
    );
    const p = getByText("0 Euro is equal to 0 United States Dollar");
    expect(p).toBeInTheDocument();

    rerender(
      <ConvertResult
        currencies={testCurrencies}
        from={"EUR"}
        to={"JPY"}
        amount1={1}
        amount2={2}
      />
    );
    expect(getByText("1 Euro is equal to 2 Japanese Yen")).toBeInTheDocument();
  });
});
