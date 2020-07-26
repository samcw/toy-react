import { ToyReact, Component } from './ToyReact';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <span>Hello</span>
        <span>{this.children}</span>
      </div>
    )
  }
}

let a = (
  <MyComponent name="a">
    <span>Hello</span>
  </MyComponent>
);

ToyReact.render(
  a,
  document.body
)