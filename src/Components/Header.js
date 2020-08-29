import React from "react"
import styled from "dtyled-components"

const Header = styled.header`

`;
const HeaderWrapper = styled.div`
width:100%;
max-width: ${props => props.theme.maxWidth}
`
export default () => (
    <Header>
    <HeaderWrapper>Hello Baby!</HeaderWrapper>
    </Header>
)