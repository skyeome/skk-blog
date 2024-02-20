import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { LangTag } from "../../../../commons/types/tag";
import type { HomeTagsProps } from "./HomeTags.types";
import * as Styled from "./HomeTags.styles";

const TAG_LIST: LangTag[] = [
  "Javascript",
  "Typescript",
  "React",
  "Next.js",
  "Git",
];

function HomeTags({ isMyTag }: HomeTagsProps) {
  return (
    <Styled.HomeTags>
      <Typography variant="h3" mb={2}>
        Tags
      </Typography>
      <Styled.HomeTagList>
        {TAG_LIST.map((link) => (
          <li key={link}>
            <Link
              href={{
                pathname: isMyTag ?? false ? "/mypage" : "/free",
                query: { tag: link },
              }}
            >
              {"#" + link}
            </Link>
          </li>
        ))}
      </Styled.HomeTagList>
    </Styled.HomeTags>
  );
}

export default HomeTags;
