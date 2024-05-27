import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Header from '@/app/components/layouts/header/Header';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...rest} />;
  },
}));

describe('Header', () => {
  it('renders the logo with the correct attributes', () => {
    render(<Header />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');

    const imgElement = screen.getByAltText('logo');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/logo.png');
    expect(imgElement).toHaveAttribute('width', '148');
    expect(imgElement).toHaveAttribute('height', '35');
  });
});
