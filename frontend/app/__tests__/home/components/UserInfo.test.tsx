import "@testing-library/jest-dom";
import UserInfo from "@/app/features/home/components/userInfo/UserInfo";
import styles from "@/app/features/home/components/userInfo/UserInfo.module.scss";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('UserInfo', () => {
  const mockName = 'John Doe';
  const mockCoin = 100;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    });

    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
    })
    ) as unknown as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('toggles modal open and close class when userInfoContainer is clicked', () => {
    render(<UserInfo name={mockName} coin={mockCoin} />);
    const userInfoContainer = screen.getByTestId('userInfo');
    const modal = screen.getByTestId('modal');

    // レンダリング時、modalは閉じた状態
    expect(modal).toHaveClass(styles.close);
    expect(modal).not.toHaveClass(styles.open);

    // クリックするとmodalが開く
    fireEvent.click(userInfoContainer);
    expect(modal).toHaveClass(styles.open);
    expect(modal).not.toHaveClass(styles.close);

    // 再びクリックするとmodalが閉じる
    fireEvent.click(userInfoContainer);
    expect(modal).toHaveClass(styles.close);
    expect(modal).not.toHaveClass(styles.open);
  });

  it('renders UserInfo correctly and toggles logOut button on userInfoContainer click', async () => {
    render(<UserInfo name={mockName} coin={mockCoin} />);
    const userInfoContainer = screen.getByTestId('userInfo');
    expect(userInfoContainer).toBeInTheDocument();

    fireEvent.click(userInfoContainer);
    const logoutButton = await screen.findByText('Log out');
    expect(logoutButton).toBeInTheDocument();
  });

  it('signs out the user when logout button is clicked', async () => {
    render(<UserInfo name={mockName} coin={mockCoin} />);
    const userInfoContainer = screen.getByTestId('userInfo');

    fireEvent.click(userInfoContainer);
    const logoutButton = await screen.findByText('Log out');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/logout', { method: 'POST' });
      expect(signOut).toHaveBeenCalled();
      expect(useRouter().replace).toHaveBeenCalledWith('/login');
    });

  });
});
