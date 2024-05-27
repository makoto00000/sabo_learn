import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import Loading from "@/app/components/elements/loading/Loading";

describe('Loading', ()=> {
  it('render Loading', ()=> {
    render(<Loading />)
    const text = screen.getByText("LOADING")
    expect(text).toBeInTheDocument();
  })
})