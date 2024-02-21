import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import WindowIcon from "@mui/icons-material/Window";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewListIcon from "@mui/icons-material/ViewList";
import type {
  BoardListTopProps,
  ChangeLayoutButton,
  ViewLayoutType,
} from "./BoardListTop.types";

const LAYOUT_BUTTONS: ChangeLayoutButton[] = [
  {
    layout: "card",
    startIcon: <WindowIcon />,
    text: "크게",
  },
  {
    layout: "list-card",
    startIcon: <ViewListIcon />,
    text: "작게",
  },
  {
    layout: "list",
    startIcon: <TableRowsIcon />,
    text: "리스트",
  },
];

function BoardListTop({ tag, layout, setLayout }: BoardListTopProps) {
  const onClickChangeLayout = (text: ViewLayoutType) => {
    setLayout(text);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
      spacing={3}
      py={6}
    >
      <Typography variant="h2">
        {tag === "" ? "✍️전체 글 보기" : "#️⃣" + tag}
      </Typography>
      <ButtonGroup variant="outlined" size="small" aria-label="레이아웃 변경">
        {LAYOUT_BUTTONS.map(({ layout: buttonLayout, startIcon, text }) => (
          <Button
            key={buttonLayout}
            variant={layout === buttonLayout ? "contained" : undefined}
            startIcon={startIcon}
            onClick={() => {
              onClickChangeLayout(buttonLayout);
            }}
          >
            {text}
          </Button>
        ))}
      </ButtonGroup>
    </Stack>
  );
}

export default BoardListTop;
