import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as Styled from "./HomeTags.styles";

function HomeTags() {
  return (
    <Styled.HomeTags>
      <Typography variant="h3" mb={2}>
        Tags
      </Typography>
      <Styled.HomeTagList>
        <li>
          <Link href="/free?tag=javascript">#Javascript</Link>
        </li>
        <li>
          <Link href="/free?tag=typescript">#Typescript</Link>
        </li>
        <li>
          <Link href="/free?tag=react">#React.js</Link>
        </li>
        <li>
          <Link href="/free?tag=next">#Next.js</Link>
        </li>
      </Styled.HomeTagList>
    </Styled.HomeTags>
  );
}

export default HomeTags;
