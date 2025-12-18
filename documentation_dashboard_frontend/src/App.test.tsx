import { render } from "@testing-library/react";
import App from "./App";

test("renders dashboard header", () => {
  const { container } = render(<App />);
  expect(container.textContent).toMatch(/Documentation Quality/i);
});
