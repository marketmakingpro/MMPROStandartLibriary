import styled, {css} from 'styled-components';

export const Row = styled.div<{gap?: number}>`
  display: flex;

  ${({ gap }) => gap && css`
    gap: ${gap}px;
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

export const Column = styled.div<{gap?: number}>`
  display: flex;
  flex-direction: column;

  ${({ gap }) => gap && css`
    gap: ${gap}px;
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
