import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";


describe("Paginator component tests", () => {
  test("pages count is 11 but should be showing only 10", () => {
    const component = create(<Paginator totalUsersCount={11} pageSize={1} portionSize={10} />);
    expect(component.root.findAllByType('span').length).toBe(10);
  });
});