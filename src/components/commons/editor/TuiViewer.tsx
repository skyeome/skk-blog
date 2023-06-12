import { Viewer } from "@toast-ui/react-editor";

interface IViewerProps {
  contents: string;
}

export default function TuiViewer(props: IViewerProps): JSX.Element {
  return <Viewer initialValue={props.contents} />;
}
