import { releaseNotesPlugin } from './plugin';

describe('release-notes', () => {
  it('should export plugin', () => {
    expect(releaseNotesPlugin).toBeDefined();
  });
});
