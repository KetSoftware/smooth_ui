import { Dispatch, SetStateAction, useEffect, forwardRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ShReactQuillStyled } from './ShReactQuill.styled';
import { ShQuillToolbarOptions } from './ShReactQuillConstants';
import Box from '@mui/material/Box';

interface IShReactQuill {
  quillEditorValue: string;
  setQuillEditorValue: Dispatch<SetStateAction<string>>;
  isDisabled?: boolean;
  error?: boolean;
}

export const ShReactQuill = forwardRef<ReactQuill | null, IShReactQuill>(({ quillEditorValue, setQuillEditorValue, isDisabled, error }, ref) => {
  const Size = Quill.import('attributors/style/size') as any;
  Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '24px', '32px', '48px'];
  Quill.register(Size, true);

  // Set data-tooltip attr for tools
  useEffect(() => {
    const toolbarElements = document.querySelectorAll('.ql-toolbar button, .ql-toolbar span');

    toolbarElements.forEach(element => {
      const tooltipText = getShQuillTooltipText(element.className);
      if (tooltipText) {
        element.setAttribute('data-tooltip', tooltipText);
        element.classList.add('tooltip-button');
      }
    });
  }, []);

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

  const onEditorValueChange = (content: SetStateAction<string>) => {
    if (content === '<p><br></p>') {
      setQuillEditorValue('');
    } else {
      setQuillEditorValue(content);
    }
  };

  return (
    <Box style={{ border: error ? '1px solid red' : 'none' }}>
      <ShReactQuillStyled
        theme='snow'
        value={quillEditorValue}
        onChange={onEditorValueChange}
        modules={{
          toolbar: ShQuillToolbarOptions,
          clipboard: {
            matchVisual: false,
          },
        }}
        readOnly={isDisabled}
        ref={ref}
      />
    </Box>
  );
});

export default ShReactQuill;
