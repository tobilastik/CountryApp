import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ReactTestRenderer from 'react-test-renderer';
import { SortModal } from '../SortModal';

describe('SortModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot when visible', () => {
    const tree = ReactTestRenderer.create(
      <SortModal
        visible={true}
        onClose={mockOnClose}
        selectedSort={null}
        onSortChange={mockOnSortChange}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with selected sort', () => {
    const tree = ReactTestRenderer.create(
      <SortModal
        visible={true}
        onClose={mockOnClose}
        selectedSort="ascending"
        onSortChange={mockOnSortChange}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should not render when not visible', () => {
    const { queryByText } = render(
      <SortModal
        visible={false}
        onClose={mockOnClose}
        selectedSort={null}
        onSortChange={mockOnSortChange}
      />,
    );
    expect(queryByText('Sort By')).toBeNull();
  });

  it('should call onClose when close button is pressed', () => {
    const { getByTestId } = render(
      <SortModal
        visible={true}
        onClose={mockOnClose}
        selectedSort={null}
        onSortChange={mockOnSortChange}
      />,
    );


    fireEvent.press(getByTestId('sort-ascending'));
    expect(mockOnSortChange).toHaveBeenCalledWith('ascending');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onSortChange when sort option is selected', () => {
    const { getByTestId } = render(
      <SortModal
        visible={true}
        onClose={mockOnClose}
        selectedSort={null}
        onSortChange={mockOnSortChange}
      />,
    );

    fireEvent.press(getByTestId('sort-population'));
    expect(mockOnSortChange).toHaveBeenCalledWith('population');
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should show reset button when sort is selected', () => {
    const { getByText } = render(
      <SortModal
        visible={true}
        onClose={mockOnClose}
        selectedSort="ascending"
        onSortChange={mockOnSortChange}
      />,
    );

    expect(getByText('Reset')).toBeTruthy();
  });

  it('should call onSortChange with null when reset is pressed', () => {
    const { getByTestId } = render(
      <SortModal
        visible={true}
        onClose={mockOnClose}
        selectedSort="ascending"
        onSortChange={mockOnSortChange}
      />,
    );

    fireEvent.press(getByTestId('sort-reset'));
    expect(mockOnSortChange).toHaveBeenCalledWith(null);
  });
});

