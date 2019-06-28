import { ReactWrapper, ShallowWrapper } from "enzyme";
import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ComponentTester from "./ComponentTester";

import * as actions from "../actions/root.actions";
import { IStoreState } from "../reducers/root.reducers";
import * as selectors from "../selectors/root.selectors";

interface IProps {
  children: React.ReactNode;
  initApp?: typeof actions.initApp.started;
  test1: string | undefined;
  test2: number;
}

class TestComponent extends React.Component<IProps> {
  public componentDidMount() {
    if (this.props.initApp) {
      this.props.initApp({});
    }
  }

  public render() {
    return (
      <div>
        <span id="Test--test1">{this.props.test1}</span>
        <span id="Test--test2">{this.props.test2}</span>
        {!!this.props.children ? (
          <span id="Test--children">{this.props.children}</span>
        ) : null}
      </div>
    );
  }
}

const TestConnectedComponent = connect(
  (state: IStoreState) => ({
    test1: selectors.getCurrentRoute(state)
  }),
  dispatch =>
    bindActionCreators(
      {
        initApp: actions.initApp.started
      },
      dispatch
    )
)(TestComponent);

describe("[utilities] ComponentTester", () => {
  const default1 = "Default state";
  const default2 = 1;

  const test1 = "Test state";
  const test2 = 2;

  describe("when testing any component", () => {
    const component = new ComponentTester(TestComponent);

    it("returns ShallowWrapper for shallow method", () => {
      const { wrapper } = component.shallow();

      expect(wrapper).toBeInstanceOf(ShallowWrapper);
    });

    it("returns ReactWrapper for mount method", () => {
      const { wrapper } = component.mount();

      expect(wrapper).toBeInstanceOf(ReactWrapper);
    });

    it("returns Cheerio wrapper for render method", () => {
      const { wrapper } = component.render();

      expect(wrapper).not.toHaveProperty("render");
    });

    it("renders correctly without children", () => {
      const { wrapper } = component.render();

      expect(wrapper.find("#Test--children")).toHaveLength(0);
    });

    it("renders correctly with children", () => {
      const { wrapper } = component.render();
      expect(wrapper.find("#Test--children")).toHaveLength(0);
    });
  });

  describe("when testing a component with children", () => {
    const component = new ComponentTester(TestComponent).withDefaultChildren(
      <div>Default children</div>
    );

    it("renders default children correctly", () => {
      const { wrapper } = component.render();

      expect(wrapper.find("#Test--children").html()).toBe(
        "<div>Default children</div>"
      );
    });

    it("renders default children correctly", () => {
      const { wrapper } = component
        .withChildren(<span>Test children</span>)
        .render();

      expect(wrapper.find("#Test--children").html()).toBe(
        "<span>Test children</span>"
      );
    });

    it("clears children after previous test and renders default children again", () => {
      const { wrapper } = component.render();

      expect(wrapper.find("#Test--children").html()).toBe(
        "<div>Default children</div>"
      );
    });
  });

  describe("when testing a presentation component", () => {
    const component = new ComponentTester(TestComponent).withDefaultProps({
      test1: default1,
      test2: default2
    });

    it("returns the correct result shape", () => {
      expect(Object.keys(component.shallow())).toEqual(["props", "wrapper"]);
    });

    it("renders correctly with default values", () => {
      const { wrapper, props } = component.render();

      expect(props.test1).toBe(default1);
      expect(props.test2).toBe(default2);

      expect(wrapper.find("#Test--test1").html()).toBe(default1);
      expect(wrapper.find("#Test--test2").html()).toBe(`${default2}`);
    });

    it("renders correctly with values from test", () => {
      const { wrapper, props } = component
        .withProps({
          test1,
          test2
        })
        .render();

      expect(props.test1).toBe(test1);
      expect(props.test2).toBe(test2);

      expect(wrapper.find("#Test--test1").html()).toBe(test1);
      expect(wrapper.find("#Test--test2").html()).toBe(`${test2}`);
    });

    it("clears test values after previous test and renders with defaults again", () => {
      const { wrapper, props } = component.render();

      expect(props.test1).toBe(default1);
      expect(props.test2).toBe(default2);

      expect(wrapper.find("#Test--test1").html()).toBe(default1);
      expect(wrapper.find("#Test--test2").html()).toBe(`${default2}`);
    });
  });

  describe("when testing a connected component", () => {
    const component = new ComponentTester(TestConnectedComponent, true)
      .withDefaultReduxState({
        app: {
          currentRoute: default1
        }
      })
      .withDefaultPorts({
        features: [default1]
      })
      .withDefaultProps({
        test2: default2
      });

    it("returns the correct result shape", () => {
      expect(Object.keys(component.shallow())).toEqual([
        "dispatch",
        "ports",
        "props",
        "store",
        "wrapper"
      ]);
    });

    it("mounts correctly with default values", () => {
      const { wrapper, ports, props, store } = component.mount();

      expect(ports.features).toEqual([default1]);
      expect(props.test2).toBe(default2);
      expect(selectors.getCurrentRoute(store())).toBe(default1);

      expect(
        wrapper
          .find("#Test--test1")
          .render()
          .html()
      ).toBe(default1);
      expect(
        wrapper
          .find("#Test--test2")
          .render()
          .html()
      ).toBe(`${default2}`);

      expect(
        component.getReduxHistory().filter(actions.initApp.started.match)
      ).toHaveLength(1);
    });

    it("mounts correctly with values from test", () => {
      const { wrapper, ports, props, store } = component
        .withReduxState({
          app: {
            currentRoute: test1
          }
        })
        .withPorts({
          features: [test1]
        })
        .withProps({
          test2
        })
        .mount();

      expect(ports.features).toEqual([test1]);
      expect(props.test2).toBe(test2);
      expect(selectors.getCurrentRoute(store())).toBe(test1);

      expect(
        wrapper
          .find("#Test--test1")
          .render()
          .html()
      ).toBe(test1);
      expect(
        wrapper
          .find("#Test--test2")
          .render()
          .html()
      ).toBe(`${test2}`);

      expect(
        component.getReduxHistory().filter(actions.initApp.started.match)
      ).toHaveLength(1);
    });

    it("clears test values after previous test and mounts with defaults again", () => {
      const { wrapper, ports, props, store } = component.mount();

      expect(ports.features).toEqual([default1]);
      expect(props.test2).toBe(default2);
      expect(selectors.getCurrentRoute(store())).toBe(default1);

      expect(
        wrapper
          .find("#Test--test1")
          .render()
          .html()
      ).toBe(default1);
      expect(
        wrapper
          .find("#Test--test2")
          .render()
          .html()
      ).toBe(`${default2}`);

      expect(
        component.getReduxHistory().filter(actions.initApp.started.match)
      ).toHaveLength(1);
    });

    it("resets the redux history correctly", () => {
      component.mount();

      expect(
        component.getReduxHistory().filter(actions.initApp.started.match)
      ).toHaveLength(1);

      component.resetReduxHistory();

      expect(
        component.getReduxHistory().filter(actions.initApp.started.match)
      ).toHaveLength(0);
    });

    describe("when testing redux history across several tests", () => {
      it("has the expected actions from the first mount", () => {
        component.mount();

        expect(component.getReduxHistory()).toHaveLength(1);
      });

      it("resets the actions history and has the expected actions from the second mount", () => {
        component.mount();

        expect(component.getReduxHistory()).toHaveLength(1);
      });
    });
  });
});
