/** @jsx jsx */

import {
  createPlateEditor,
  normalizeEditor,
  PlateEditor,
} from '@udecode/plate-core';
import { jsx } from '@udecode/plate-test-utils';
import { KEY_SUGGESTION_ID, MARK_SUGGESTION } from './constants';
import { createSuggestionPlugin } from './createSuggestionPlugin';

jsx;

describe('withSuggestion', () => {
  describe('insertText', () => {
    describe('when editor.isSuggesting is not defined', () => {
      it('should not add marks', () => {
        const input = ((
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const output = ((
          <editor>
            <hp>
              testtest
              <cursor />
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const editor = createPlateEditor({
          editor: input,
          plugins: [createSuggestionPlugin()],
        });
        editor.isSuggesting = false;

        editor.insertText('test');

        expect(editor.children).toEqual(output.children);
      });
    });

    describe('when editor.isSuggesting is defined', () => {
      describe('when cursor is not in suggestion mark', () => {
        it('should add marks', () => {
          const input = ((
            <editor>
              <hp>
                test
                <cursor />
              </hp>
            </editor>
          ) as any) as PlateEditor;

          const output = ((
            <editor>
              <hp>
                test<htext suggestion>test</htext>
                <cursor />
              </hp>
            </editor>
          ) as any) as PlateEditor;

          const editor = createPlateEditor({
            editor: input,
            plugins: [createSuggestionPlugin()],
          });
          editor.isSuggesting = true;

          editor.insertText('test');

          expect(editor.children[0].children[1][MARK_SUGGESTION]).toBeTruthy();
          expect(
            editor.children[0].children[1][KEY_SUGGESTION_ID]
          ).toBeTruthy();
        });
      });

      describe('when cursor is in suggestion mark', () => {
        it('should not add a new suggestion id', () => {
          const input = ((
            <editor>
              <hp>
                <htext suggestion suggestionId="1">
                  test
                  <cursor />
                </htext>
              </hp>
            </editor>
          ) as any) as PlateEditor;

          const output = ((
            <editor>
              <hp>
                <htext suggestion suggestionId="1">
                  testtest
                  <cursor />
                </htext>
              </hp>
            </editor>
          ) as any) as PlateEditor;

          const editor = createPlateEditor({
            editor: input,
            plugins: [createSuggestionPlugin()],
          });
          editor.isSuggesting = true;

          editor.insertText('test');

          expect(editor.children).toEqual(output.children);
        });
      });
    });
  });

  describe('deleteBackward', () => {
    describe('when editor.isSuggesting is not defined', () => {
      it('should not add marks', () => {
        const input = ((
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const output = ((
          <editor>
            <hp>
              tes
              <cursor />
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const editor = createPlateEditor({
          editor: input,
          plugins: [createSuggestionPlugin()],
        });
        editor.isSuggesting = false;

        editor.deleteBackward('character');

        expect(editor.children).toEqual(output.children);
      });
    });

    describe('when cursor is in suggestion mark', () => {
      it('should not add a new suggestion id', () => {
        const input = ((
          <editor>
            <hp>
              <htext suggestion suggestionId="1">
                test
                <cursor />
              </htext>
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const output = ((
          <editor>
            <hp>
              <htext suggestion suggestionId="1">
                testtest
                <cursor />
              </htext>
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const editor = createPlateEditor({
          editor: input,
          plugins: [createSuggestionPlugin()],
        });
        editor.isSuggesting = true;

        editor.insertText('test');

        expect(editor.children).toEqual(output.children);
      });
    });
  });

  describe('normalizeNode', () => {
    describe('when there is a suggestion mark without id', () => {
      it('should remove mark', () => {
        const input = ((
          <editor>
            <hp>
              <htext suggestion>
                test
                <cursor />
              </htext>
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const output = ((
          <editor>
            <hp>
              test
              <cursor />
            </hp>
          </editor>
        ) as any) as PlateEditor;

        const editor = createPlateEditor({
          editor: input,
          plugins: [createSuggestionPlugin()],
        });

        normalizeEditor(editor, {
          force: true,
        });

        expect(editor.children).toEqual(output.children);
      });
    });
  });
});
