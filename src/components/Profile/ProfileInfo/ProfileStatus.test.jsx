import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="test status" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("test status");
  });
});

  test("after creation span should be exist", () => {
    const component = create(<ProfileStatus status="test status" />);
    const instance = component.root;
    let span = instance.findAllByType('span');
    expect(span.length).toBe(1);
  });


  test("after creation input shouldn't be exist", () => {
    const component = create(<ProfileStatus status="test status" />);
    const instance = component.root;
    expect(() => {
       let input = instance.findByType('input')
    }).toThrow();
  });



  test("after creation span should be displayed with correct status", () => {
    const component = create(<ProfileStatus status="test status" />);
    const instance = component.root;
    let span = instance.findByType('span');
    expect(span.children[0]).toBe("test status");
  });

  test("callback 'updateStatus' should be called", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status="test status"  updateStatus={mockCallback}/>);
    const instance = component.getInstance();
    instance.activateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });

