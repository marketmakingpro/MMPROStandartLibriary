import styled, {css} from 'styled-components';

export const Row = styled.div<{gap?: number, wrap?: boolean}>`
  display: flex;

  ${({ gap }) => gap && css`
    gap: ${gap}px;
  `};

  ${({ wrap }) => wrap && css`
    flex-wrap: wrap;
  `};
`

export const StartRow = styled(Row)`
  justify-content: flex-start;
  flex-wrap: wrap;
`

export const StartRowNowWrap = styled(StartRow)`
  flex-wrap: nowrap;
`

export const EndRow = styled(Row)`
  justify-content: flex-end;
`

export const AlignStartRow = styled(Row)`
  align-items: flex-start;
`

export const RowCentered = styled(Row)`
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const AlignCenterRow = styled(Row)`
  align-items: center;
`

export const JustifyCenterRow = styled(Row)`
  justify-content: center;
`

export const SpaceBetweenRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
`

export const Column = styled.div<{gap?: number, wrap?: boolean}>`
  display: flex;
  flex-direction: column;

  ${({ gap }) => gap && css`
    gap: ${gap}px;
  `};

  ${({ wrap }) => wrap && css`
    flex-wrap: wrap;
  `};
`

export const JustifyStartColumn = styled(Column)`
  justify-content: flex-start;
`

export const JustifyCenterColumn = styled(Column)`
  justify-content: center;
  align-items: center;
`

export const SpaceBetweenCenterColumn = styled(Column)`
  justify-content: space-between;
  align-items: center;
`

export const JustifyEndColumn = styled(Column)`
  justify-content: flex-end;
  align-items: center;
`
