import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as Styled from "./HomeTags.styles";
import type { LangTag } from "../../../../commons/types/tag";

const preUrl = "/free?tag=";

const TAG_LIST: LangTag[] = [
  "Javascript",
  "Typescript",
  "React",
  "Next.js",
  "Git",
];

function HomeTags() {
  return (
    <Styled.HomeTags>
      <Typography variant="h3" mb={2}>
        Tags
      </Typography>
      <Styled.HomeTagList>
        {TAG_LIST.map((link) => (
          <li key={link}>
            <Link href={`${preUrl}${link}`}>{"#" + link}</Link>
          </li>
        ))}
      </Styled.HomeTagList>
    </Styled.HomeTags>
  );
}

export default HomeTags;
