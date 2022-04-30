import { render } from '@testing-library/react';

import ExplorePage from './explore-page';

describe('ExplorePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExplorePage />);
    expect(baseElement).toBeTruthy();
  });
});
