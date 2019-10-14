import { BorrowedOrLentPipe } from './borrowed-or-lent.pipe';

describe('BorrowedOrLentPipe', () => {
  it('create an instance', () => {
    const pipe = new BorrowedOrLentPipe();
    expect(pipe).toBeTruthy();
  });
});
