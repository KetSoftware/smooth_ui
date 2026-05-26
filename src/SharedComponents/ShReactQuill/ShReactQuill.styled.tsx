import ReactQuill from 'react-quill';
import styled from '@emotion/styled';

export const ShReactQuillStyled = styled(ReactQuill)`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  & .ql-container {
    flex: 1;
    & .ql-editor {
      min-height: 130px;
    }
  }

  & .tooltip-button {
    position: relative;

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      font-size: 0.75rem;
      visibility: hidden;
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
    }
  }
`;
