import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "testing testing",
    author: "testi cles",
    url: "testingtesting.ax",
    likes: 0,
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("testing testing testi cles");
  expect(element).toBeDefined();
});

test("rendered content should not have likes", () => {
  const blog = {
    title: "testing testing",
    author: "testi cles",
    url: "testingtesting.ax",
    likes: 0,
  };

  render(<Blog blog={blog} />);

  const element = screen.queryByText("Likes: 0");
  const element2 = screen.queryByText("URL: testingtesting.ax");

  expect(element).toBeNull();
  expect(element2).toBeNull();
});

test('after pressing "show" numbers of like sshouold be visible', async () => {
  const blog = {
    title: "testing testing",
    author: "testi cles",
    url: "testingtesting.ax",
    likes: 0,
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const element = screen.queryByText("Likes: 0");

  expect(element).toBeDefined();
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "testing testing",
    author: "testi cles",
    url: "testingtesting.ax",
    likes: 0,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  const button2 = screen.getByText("like");
  await user.click(button2);
  await user.click(button2);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

/* 5.16: Blog List Tests, step 4

Make a test for the new blog form. The test should check,
 that the form calls the event handler it received
 as props with the right details when a new blog is created. */
