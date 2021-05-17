import { render } from "@testing-library/react";
import { Header } from "../components/Header";

describe("<Header>", () => {
  test("renders correctly", () => {
    const { getByRole, getByText } = render(
      <Header headingSize="h1" headingText="header" />
    );
    expect(getByRole("heading")).toBeInTheDocument();
    expect(getByText("header")).toBeInTheDocument();
  });
});
