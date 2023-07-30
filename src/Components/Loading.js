import React from "react";
import styled from "styled-components";

//images
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Loading() {
  return (
    <Container>
      <FiberManualRecordIcon className="dot dot1" />
      <FiberManualRecordIcon className="dot dot2" />
      <FiberManualRecordIcon className="dot dot3" />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  background-color: var(--panel-color);
  width: max-content;
  height: max-content;
  padding-inline: 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;

  .dot {
    width: 10px;
    animation: loadingDots 0.6s ease-in-out alternate infinite;

    &.dot1 {
      animation-delay: 0s;
    }

    &.dot2 {
      animation-delay: 0.3s;
    }

    &.dot3 {
      animation-delay: 0.6s;
    }
  }

  @keyframes loadingDots {
    0% {
      transform: scale(0.8);
    }

    100% {
      transform: scale(1.2);
    }
  }
`;
