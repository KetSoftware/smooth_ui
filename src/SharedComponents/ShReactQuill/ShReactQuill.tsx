import { Dispatch, SetStateAction, useEffect, forwardRef, useRef, useState } from 'react';
import type ReactQuillClass from 'react-quill';
import type QuillType from 'quill';
import Box from '@mui/material/Box';
import { ShReactQuillStyled } from './ShReactQuill.styled';
import { ShQuillToolbarOptions } from './ShReactQuillConstants';

interface IShReactQuill {
  quillEditorValue: string;
  setQuillEditorValue: Dispatch<SetStateAction<string>>;
  isDisabled?: boolean;
  error?: boolean;
}

const getShQuillTooltipText = (className: string) => {
  switch (true) {
    case /ql-font/.test(className):
      return 'Font';
    case /ql-header/.test(className):
      return 'Header';
    case /ql-bold/.test(className):
      return 'Bold (Ctrl+B)';
    case /ql-italic/.test(className):
      return 'Italic (Ctrl+I)';
    case /ql-underline/.test(className):
      return 'Underline (Ctrl+U)';
    case /ql-strike/.test(className):
      return 'Strikethrough';
    case /ql-color/.test(className):
      return 'Text Color';
    case /ql-background/.test(className):
      return 'Background Color';
    case /ql-script.ql-sub/.test(className):
      return 'Subscript';
    case /ql-script.ql-super/.test(className):
      return 'Superscript';
    case /ql-blockquote/.test(className):
      return 'Blockquote';
    case /ql-code-block/.test(className):
      return 'Code Block';
    case /ql-list.ql-ordered/.test(className):
      return 'Ordered List';
    case /ql-list.ql-bullet/.test(className):
      return 'Bullet List';
    case /ql-indent.ql-minus/.test(className):
      return 'Decrease Indent';
    case /ql-indent.ql-plus/.test(className):
      return 'Increase Indent';
    case /ql-direction/.test(className):
      return 'Text Direction (RTL)';
    case /ql-align/.test(className):
      return 'Align';
    case /ql-link/.test(className):
      return 'Insert Link';
    case /ql-image/.test(className):
      return 'Insert Image';
    case /ql-video/.test(className):
      return 'Insert Video';
    case /ql-clean/.test(className):
      return 'Remove Formatting';
    default:
      return '';
  }
};

export const ShReactQuill = forwardRef<ReactQuillClass, IShReactQuill>(
  ({ quillEditorValue, setQuillEditorValue, isDisabled, error }, ref) => {
    const [ReactQuill, setReactQuill] = useState<typeof ReactQuillClass | null>(null);
    const [Quill, setQuill] = useState<typeof QuillType | null>(null);
    const editorRef = useRef<ReactQuillClass | null>(null);

    useEffect(() => {
      let cancelled = false;
      void (async () => {
        await import('react-quill/dist/quill.snow.css' as string);
        const mod = await import('react-quill');
        if (cancelled) return;
        setReactQuill(() => mod.default);
        setQuill(mod.default.Quill);
      })();
      return () => {
        cancelled = true;
      };
    }, []);

    useEffect(() => {
      if (!Quill) return;
      const Size = Quill.import('attributors/style/size') as { whitelist?: string[] };
      Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '24px', '32px', '48px'];
      Quill.register(Size, true);
    }, [Quill]);

    useEffect(() => {
      if (!ReactQuill) return;
      const toolbarElements = document.querySelectorAll('.ql-toolbar button, .ql-toolbar span');
      toolbarElements.forEach(element => {
        const tooltipText = getShQuillTooltipText(element.className);
        if (tooltipText) {
          element.setAttribute('data-tooltip', tooltipText);
          element.classList.add('tooltip-button');
        }
      });
    }, [ReactQuill]);

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(editorRef.current);
      } else if (ref) {
        ref.current = editorRef.current;
      }
    });

    const onEditorValueChange = (content: SetStateAction<string>) => {
      if (content === '<p><br></p>') {
        setQuillEditorValue('');
      } else {
        setQuillEditorValue(content);
      }
    };

    return (
      <Box style={{ border: error ? '1px solid red' : 'none' }}>
        <ShReactQuillStyled>
          {ReactQuill ? (
            <ReactQuill
              theme="snow"
              value={quillEditorValue}
              onChange={onEditorValueChange}
              modules={{
                toolbar: ShQuillToolbarOptions,
                clipboard: {
                  matchVisual: false,
                },
              }}
              readOnly={isDisabled}
              ref={(instance: ReactQuillClass | null) => {
                editorRef.current = instance;
                if (typeof ref === 'function') {
                  ref(instance);
                } else if (ref) {
                  ref.current = instance;
                }
              }}
            />
          ) : null}
        </ShReactQuillStyled>
      </Box>
    );
  },
);

export default ShReactQuill;
