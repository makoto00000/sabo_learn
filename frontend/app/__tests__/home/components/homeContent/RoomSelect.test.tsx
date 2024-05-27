import { render, screen } from '@testing-library/react';
import RoomSelect from '@/app/features/home/components/homeContent/roomSelect/RoomSelect';

describe('RoomSelect', () => {
  it('renders Solo Room and Multi Room correctly', () => {
    render(<RoomSelect />);
    
    // Solo Room
    const soloImage = screen.getByAltText('solo');
    const soloLink = soloImage.closest('a');
    const soloRoomText = screen.getByText('Solo Room');
    
    expect(soloImage).toBeInTheDocument();
    expect(soloLink).toHaveAttribute('href', '/soloroom');
    expect(soloRoomText).toBeInTheDocument();

    // Multi Room
    const multiImage = screen.getByAltText('multi');
    const multiLink = multiImage.closest('a');
    const multiRoomText = screen.getByText('Multi Room');
    
    expect(multiImage).toBeInTheDocument();
    expect(multiLink).toHaveAttribute('href', '/multiroom');
    expect(multiRoomText).toBeInTheDocument();
  });
});
