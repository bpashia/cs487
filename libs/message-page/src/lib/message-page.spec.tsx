import { render } from '@testing-library/react';

import MessagePage from './message-page';

describe('MessagePage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessagePage />);
    expect(baseElement).toBeTruthy();
  });
});
