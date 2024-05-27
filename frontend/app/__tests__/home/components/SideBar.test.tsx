import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "@/app/features/home/components/sideNav/Sidebar";

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, priority, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} priority={"true"} {...rest} />;
  },
}));

describe("Sidebar", () => {
  const mockHandleComponent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo image correctly", () => {
    render(<Sidebar handleComponent={mockHandleComponent} />);
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");
  });

  it("renders menu items correctly", () => {
    render(<Sidebar handleComponent={mockHandleComponent} />);
    const roomIcon = screen.getByAltText("roomIcon");
    const storeIcon = screen.getByAltText("storeIcon");
    const settingIcon = screen.getByAltText("settingIcon");

    expect(roomIcon).toBeInTheDocument();
    expect(storeIcon).toBeInTheDocument();
    expect(settingIcon).toBeInTheDocument();

    const roomLink = screen.getByText("Room");
    const shopLink = screen.getByText("Shop");
    const settingLink = screen.getByText("Setting");

    expect(roomLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(settingLink).toBeInTheDocument();
  });

  it("calls handleComponent with correct argument when menu items are clicked", () => {
    render(<Sidebar handleComponent={mockHandleComponent} />);

    const roomItem = screen.getByText("Room");
    const shopItem = screen.getByText("Shop");
    const settingItem = screen.getByText("Setting");

    fireEvent.click(roomItem);
    expect(mockHandleComponent).toHaveBeenCalledWith("select");

    fireEvent.click(shopItem);
    expect(mockHandleComponent).toHaveBeenCalledWith("shop");

    fireEvent.click(settingItem);
    expect(mockHandleComponent).toHaveBeenCalledWith("setting");
  });
});
