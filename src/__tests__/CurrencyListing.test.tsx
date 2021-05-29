import { render } from "@testing-library/react";

import { CurrencyListing } from "../rates-list/CurrencyListing";

describe("<CurrencyListing>", () => {
  test("renders correctly", () => {
    const { getByRole } = render(
      <ul>
        <CurrencyListing
          symbol="EUR"
          fullName="Euro"
          trend="equal"
          latestRate={1.0}
        />
      </ul>
    );
    const listing = getByRole("listitem");

    expect(listing).toBeInTheDocument();
  });
});
