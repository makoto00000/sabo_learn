import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/layouts/footer/Footer";

describe("Footer", () => {
  it("renders links to terms and privacy pages", () => {
    render(<Footer />);

    const termsLink = screen.getByRole("link", { name: /利用規約/i });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute("href", "/terms");

    const privacyLink = screen.getByRole("link", {
      name: /プライバシーポリシー/i,
    });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("renders copyright information", () => {
    render(<Footer />);
    const copyright = screen.getByText(/copyright © sabolearn/i);
    expect(copyright).toBeInTheDocument();
  });
});
