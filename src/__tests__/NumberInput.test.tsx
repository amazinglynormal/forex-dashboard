import { render, fireEvent } from "@testing-library/react";
import { NumberInput } from "../converter/NumberInput";

describe("<NumberInput>", () => {
  test("renders correctly", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <NumberInput
        id="test"
        value={1}
        direction="from"
        onChangeHandler={onChange}
      />
    );

    const input = getByRole("spinbutton");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(1);
  });

  test("onChange works correctly", () => {
    const onChange = jest.fn();
    const { getByRole } = render(
      <NumberInput
        id="test"
        value={1}
        direction="from"
        onChangeHandler={onChange}
      />
    );

    const input = getByRole("spinbutton");

    fireEvent.change(input, { target: { value: 2 } });
    expect(onChange).toHaveBeenCalled();
  });

  test("value changes when props are updated", () => {
    const onChange = jest.fn();
    const { getByRole, rerender } = render(
      <NumberInput
        id="test"
        value={1}
        direction="from"
        onChangeHandler={onChange}
      />
    );

    const input = getByRole("spinbutton");
    expect(input).toHaveValue(1);

    rerender(
      <NumberInput
        id="test"
        value={2}
        direction="from"
        onChangeHandler={onChange}
      />
    );

    expect(input).toHaveValue(2);
  });
});
