/** @jsx jsx */

import { PlatePlugin } from '@udecode/plate-core';
import { getHtmlDocument } from '@udecode/plate-test-utils';
import { createPlateUIEditor } from '../../../../../../plate/src/utils/createPlateUIEditor';
import { deserializeHTMLToDocumentFragment } from '../../utils/deserializeHTMLToDocumentFragment';

const html = `<blockquote>test \n code</blockquote>`;
const input1: PlatePlugin[] = [];
const input2 = getHtmlDocument(html).body.innerHTML;

const expectedOutput = [{ text: 'test \n code' }];

it('should have the break line', () => {
  const convertedDocumentFragment = deserializeHTMLToDocumentFragment(
    createPlateUIEditor({
      plugins: input1,
    }),
    {
      element: input2,
      stripWhitespace: false,
    }
  );

  expect(convertedDocumentFragment).toEqual(expectedOutput);
});